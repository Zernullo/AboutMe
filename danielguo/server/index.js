import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import nodemailer from 'nodemailer'
import { Pool } from 'pg'
import { z } from 'zod'

const app = express()
const port = Number(process.env.PORT) || 3001

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(helmet())
app.use(express.json({ limit: '50kb' }))
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0) {
        callback(null, true)
        return
      }
      callback(null, allowedOrigins.includes(origin))
    }
  })
)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(254),
  message: z.string().min(10).max(2000),
  honeypot: z.string().optional(),
  recaptchaToken: z.string().optional()
})

const DISPOSABLE_DOMAINS = [
  '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'temp-mail.org',
  'throwaway.email', 'tempmail.com', 'maildrop.cc', 'yopmail.com',
  'getnada.com', 'trashmail.com', 'fakeinbox.com', 'dispostable.com'
]

function isDisposableEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase()
  return DISPOSABLE_DOMAINS.some(disposable => domain === disposable || domain?.endsWith(`.${disposable}`))
}

function isSuspiciousEmail(email) {
  const localPart = email.split('@')[0]?.toLowerCase()
  
  // Too short (less than 3 characters)
  if (localPart.length < 3) return true
  
  // Common fake/test patterns
  const fakePatterns = /^(test|fake|spam|asdf|qwer|admin|temp|dummy|sample|example|user\d+|aaa+|zzz+)$/i
  if (fakePatterns.test(localPart)) return true
  
  // No vowels (likely random mashing)
  if (!/[aeiou]/i.test(localPart)) return true
  
  // Too many consecutive consonants (likely random)
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(localPart)) return true
  
  // All same character repeated
  if (/^(.)\1+$/.test(localPart)) return true
  
  return false
}

async function verifyRecaptcha(token) {
  if (!token || !process.env.RECAPTCHA_SECRET_KEY) return false
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    })
    
    const data = await response.json()
    return data.success && data.score > 0.5
  } catch {
    return false
  }
}

const lastRequestByIp = new Map()

app.post('/api/contact', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress
    const lastRequest = lastRequestByIp.get(ip)
    
    if (lastRequest && Date.now() - lastRequest < 10000) {
      res.status(429).json({ ok: false, error: 'Please wait before sending another message.' })
      return
    }

    const { name, email, message, honeypot, recaptchaToken } = contactSchema.parse(req.body)

    // Honeypot check (catches bots that fill invisible fields)
    if (honeypot) {
      res.status(400).json({ ok: false, error: 'Invalid submission.' })
      return
    }

    // reCAPTCHA v3 verification
    if (recaptchaToken) {
      const isValidCaptcha = await verifyRecaptcha(recaptchaToken)
      if (!isValidCaptcha) {
        res.status(400).json({ ok: false, error: 'Security check failed. Please try again.' })
        return
      }
    }

    // Check for disposable email domains
    if (isDisposableEmail(email)) {
      res.status(400).json({ ok: false, error: 'Please use a valid email address.' })
      return
    }

    // Check for suspicious email patterns
    if (isSuspiciousEmail(email)) {
      res.status(400).json({ ok: false, error: 'Please use a valid email address.' })
      return
    }
    
    // Save to database
    await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    )

    // Send email notification
    const to = process.env.CONTACT_TO
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER

    await transporter.sendMail({
      from,
      to,
      subject: `New contact message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })

    lastRequestByIp.set(ip, Date.now())
    res.json({ ok: true, message: 'Message sent. Thank you!' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ ok: false, error: error.errors.map((e) => e.message).join(' ') })
      return
    }
    console.error('Contact form error:', error)
    res.status(500).json({ ok: false, error: 'Failed to send message.' })
  }
})

// Cybernews endpoint with database storage
let lastFetchTimestamp = 0
const FETCH_INTERVAL = 30 * 60 * 1000 // Fetch new articles every 30 minutes

async function fetchAndStoreNews() {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) {
    console.error('NEWS_API_KEY not configured')
    return
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=cybersecurity OR hacking OR data breach OR cyber attack&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
    )

    if (!response.ok) {
      throw new Error(`NewsAPI returned ${response.status}`)
    }

    const data = await response.json()
    let newCount = 0

    for (const article of data.articles || []) {
      if (!article.url || !article.title) continue

      const summary = article.description || article.content?.substring(0, 200) + '...' || 'No summary available'
      const source = article.source?.name || 'Unknown'
      const publishedAt = article.publishedAt

      try {
        // Insert only if URL doesn't exist (ON CONFLICT DO NOTHING)
        const result = await pool.query(
          `INSERT INTO cybernews_articles (title, summary, url, source, published_at)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (url) DO NOTHING
           RETURNING id`,
          [article.title, summary, article.url, source, publishedAt]
        )
        
        if (result.rowCount > 0) newCount++
      } catch (err) {
        console.error('Failed to insert article:', err.message)
      }
    }

    console.log(`Stored ${newCount} new articles`)
    lastFetchTimestamp = Date.now()
  } catch (error) {
    console.error('Failed to fetch from NewsAPI:', error.message)
  }
}

app.get('/api/cybernews', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50)
    const now = Date.now()

    // Fetch new articles if interval has passed
    if (now - lastFetchTimestamp > FETCH_INTERVAL) {
      // Don't await - fetch in background
      fetchAndStoreNews().catch(err => console.error('Background fetch failed:', err))
    }

    // Return articles from database
    const result = await pool.query(
      `SELECT title, summary, url, source, published_at as "publishedAt"
       FROM cybernews_articles
       ORDER BY published_at DESC
       LIMIT $1`,
      [limit]
    )

    const articles = result.rows.map(row => ({
      title: row.title,
      summary: row.summary,
      url: row.url,
      source: row.source,
      publishedAt: row.publishedAt,
      date: new Date(row.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }))

    res.json({ ok: true, articles, total: result.rowCount })
  } catch (error) {
    console.error('Cybernews query error:', error)
    res.status(500).json({ ok: false, error: 'Failed to fetch cybernews' })
  }
})

// Fetch initial news on server start
fetchAndStoreNews().catch(err => console.error('Initial news fetch failed:', err))

// Automatic cleanup of old articles
async function cleanupOldArticles() {
  try {
    const result = await pool.query(
      `DELETE FROM cybernews_articles 
       WHERE published_at < NOW() - INTERVAL '6 months'
       RETURNING id`
    )
    if (result.rowCount > 0) {
      console.log(`Cleaned up ${result.rowCount} old articles`)
    }
  } catch (error) {
    console.error('Failed to cleanup old articles:', error.message)
  }
}

// Run cleanup once a day (24 hours)
setInterval(() => {
  cleanupOldArticles().catch(err => console.error('Cleanup failed:', err))
}, 24 * 60 * 60 * 1000)

// Initial cleanup on server start
cleanupOldArticles().catch(err => console.error('Initial cleanup failed:', err))

app.listen(port, () => {
  console.log(`Contact API running on port ${port}`)
})
