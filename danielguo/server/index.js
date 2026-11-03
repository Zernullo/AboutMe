import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import nodemailer from 'nodemailer'
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
  if (!localPart || localPart.length < 3) return true
  const fakePatterns = /^(test|fake|spam|asdf|qwer|admin|temp|dummy|sample|example|user\d+|aaa+|zzz+)$/i
  if (fakePatterns.test(localPart)) return true
  if (!/[aeiou]/i.test(localPart)) return true
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(localPart)) return true
  if (/^(.)\1+$/.test(localPart)) return true
  return false
}

async function verifyRecaptcha(token) {
  if (!token || !process.env.RECAPTCHA_SECRET_KEY) return false
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(token)}`
    })
    const data = await response.json()
    return data.success && data.score > 0.5
  } catch {
    return false
  }
}

// Rate limiting with automatic garbage collection
const lastRequestByIp = new Map()
const RATE_LIMIT_WINDOW = 10000 // 10 seconds

function cleanOldRateLimits() {
  const now = Date.now()
  for (const [ip, timestamp] of lastRequestByIp.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW) {
      lastRequestByIp.delete(ip)
    }
  }
}
setInterval(cleanOldRateLimits, 60000)

app.post('/api/contact', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress
    const lastRequest = lastRequestByIp.get(ip)

    if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_WINDOW) {
      res.status(429).json({ ok: false, error: 'Please wait before sending another message.' })
      return
    }

    const { name, email, message, honeypot, recaptchaToken } = contactSchema.parse(req.body)

    if (honeypot) {
      res.status(400).json({ ok: false, error: 'Invalid submission.' })
      return
    }

    if (recaptchaToken) {
      const isValidCaptcha = await verifyRecaptcha(recaptchaToken)
      if (!isValidCaptcha) {
        res.status(400).json({ ok: false, error: 'Security check failed. Please try again.' })
        return
      }
    }

    if (isDisposableEmail(email) || isSuspiciousEmail(email)) {
      res.status(400).json({ ok: false, error: 'Please use a valid email address.' })
      return
    }

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
    res.json({ ok: true, message: 'Message sent successfully. Thank you!' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ ok: false, error: error.errors.map((e) => e.message).join(' ') })
      return
    }
    console.error('Contact form error:', error)
    res.status(500).json({ ok: false, error: 'Failed to send message.' })
  }
})

// ── Cybernews — in-memory cache, refreshes every 24 hours ──────────────────
let cachedArticles = []
let lastFetchTimestamp = 0
const FETCH_INTERVAL = 24 * 60 * 60 * 1000

async function fetchNews() {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) {
    console.warn('NEWS_API_KEY not configured, skipping fetch')
    return
  }

  try {
    const response = await fetch('https://eventregistry.org/api/v1/article/getArticles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'getArticles',
        sourceUri: [
          'thehackernews.com',
          'bleepingcomputer.com',
          'krebsonsecurity.com',
          'darkreading.com',
          'securityweek.com',
          'threatpost.com',
          'cyberscoop.com',
          'wired.com'
        ],
        keyword: ['cybersecurity', 'hacking', 'data breach', 'cyber attack', 'malware', 'ransomware'],
        keywordOper: 'OR',
        lang: 'eng',
        sortBy: 'date',
        sortByAsc: false,
        articlesPage: 1,
        articlesCount: 20,
        articlesSortBy: 'date',
        includeArticleSummary: true,
        includeArticleImage: true,
        apiKey
      })
    })

    if (!response.ok) throw new Error(`newsapi.ai returned ${response.status}`)

    const data = await response.json()
    const articles = data.articles?.results || []

    cachedArticles = articles
      .filter(a => a.url && a.title)
      .map(a => {
        const titleStr = typeof a.title === 'object' ? a.title.eng : a.title
        const summaryStr = typeof a.summary === 'object'
          ? a.summary.eng
          : a.summary || (a.body ? a.body.substring(0, 500) + '...' : 'No summary available')
        const rawDate = a.dateTimePub || a.dateTime
        const parsedDate = rawDate ? new Date(rawDate) : null
        const dateStr = parsedDate && !isNaN(parsedDate.getTime())
          ? parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : 'Recent'

        return {
          title: titleStr,
          summary: summaryStr,
          url: a.url,
          source: a.source?.title || 'Unknown',
          image: a.image || null,
          publishedAt: rawDate || new Date().toISOString(),
          date: dateStr
        }
      })

    lastFetchTimestamp = Date.now()
    console.log(`Fetched ${cachedArticles.length} cybersecurity articles`)
  } catch (error) {
    console.error('Failed to fetch news:', error.message)
  }
}

app.get('/api/cybernews', async (req, res) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50)
    const page = Math.max(parseInt(String(req.query.page), 10) || 1, 1)

    // Refresh cache if older than 24 hours
    if (Date.now() - lastFetchTimestamp > FETCH_INTERVAL) {
      await fetchNews()
    }

    const total = cachedArticles.length
    const offset = (page - 1) * limit
    const articles = cachedArticles.slice(offset, offset + limit)

    res.json({ ok: true, articles, total, page, limit, totalPages: Math.ceil(total / limit) || 1 })
  } catch (error) {
    console.error('Cybernews error:', error)
    res.status(500).json({ ok: false, error: 'Failed to fetch cybernews' })
  }
})

// Fetch news on server start
fetchNews().catch(err => console.error('Initial news fetch failed:', err))

// Refresh every 24 hours
setInterval(() => {
  fetchNews().catch(err => console.error('Scheduled fetch failed:', err))
}, FETCH_INTERVAL)

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})
