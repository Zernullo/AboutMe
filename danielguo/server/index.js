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
      // In development or if no origins specified, allow all
      if (!origin || allowedOrigins.length === 0 || process.env.NODE_ENV !== 'production') {
        callback(null, true)
        return
      }
      callback(null, allowedOrigins.includes(origin))
    }
  })
)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(80),
  email: z.string().email('Please enter a valid email address.').max(254),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(2000),
  honeypot: z.string().optional(),
  recaptchaToken: z.string().optional()
})

const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'temp-mail.org',
  'throwaway.email', 'tempmail.com', 'maildrop.cc', 'yopmail.com',
  'getnada.com', 'trashmail.com', 'fakeinbox.com', 'dispostable.com'
])

function isDisposableEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false
}

async function verifyRecaptcha(token) {
  if (!token || !process.env.RECAPTCHA_SECRET_KEY) return true // Allow if not configured
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(token)}`
    })
    const data = await response.json()
    return data.success && data.score > 0.4
  } catch {
    return false
  }
}

// Rate limiting with automatic garbage collection
const lastRequestByIp = new Map()
const RATE_LIMIT_WINDOW = 8000 // 8 seconds

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
      res.status(429).json({ ok: false, error: 'Please wait a moment before sending another message.' })
      return
    }

    const { name, email, message, honeypot, recaptchaToken } = contactSchema.parse(req.body)

    // Honeypot check
    if (honeypot) {
      res.status(400).json({ ok: false, error: 'Invalid submission.' })
      return
    }

    // reCAPTCHA check if token present
    if (recaptchaToken) {
      const isValidCaptcha = await verifyRecaptcha(recaptchaToken)
      if (!isValidCaptcha) {
        res.status(400).json({ ok: false, error: 'Security verification failed. Please try again.' })
        return
      }
    }

    // Disposable email check
    if (isDisposableEmail(email)) {
      res.status(400).json({ ok: false, error: 'Please use a standard email address.' })
      return
    }

    const to = process.env.CONTACT_TO || 'dguo83212@gmail.com'
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER || 'no-reply@danielguo.dev'

    // If SMTP credentials exist, attempt sending email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${from}>`,
          to,
          subject: `New contact message from ${name}`,
          replyTo: email,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: monospace; background: #0d0d0d; color: #e0e0e0; padding: 24px; border-radius: 8px;">
              <h2 style="color: #00ff41; margin-top: 0;">New Portfolio Message</h2>
              <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
              <hr style="border-color: #333;" />
              <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
            </div>
          `
        })
        console.log(`[Contact] Email successfully sent from ${email}`)
      } catch (mailError) {
        console.error('[Contact] SMTP delivery error:', mailError.message)
        res.status(502).json({
          ok: false,
          error: 'Email delivery service temporarily unavailable. Please email directly at dguo83212@gmail.com.'
        })
        return
      }
    } else {
      console.log(`[Contact] (Dev Mode - No SMTP configured) Message received from ${name} <${email}>: ${message}`)
    }

    lastRequestByIp.set(ip, Date.now())
    res.json({ ok: true, message: 'Message sent successfully! I will get back to you soon.' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ ok: false, error: error.errors.map((e) => e.message).join(' ') })
      return
    }
    console.error('[Contact] Error:', error)
    res.status(500).json({ ok: false, error: 'Internal server error while processing message.' })
  }
})

// ── Cybernews — 100% Free Live Threat Intel RSS Feeds (No API Key, $0 Cost) ──
let cachedArticles = []
let lastFetchTimestamp = 0
const FETCH_INTERVAL = 30 * 60 * 1000 // Refresh every 30 minutes

async function fetchRssFeed(url, sourceName) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 7000)
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ThreatRadar/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      }
    })
    clearTimeout(timeout)
    if (!response.ok) return []
    const xml = await response.text()

    const items = []
    const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || []

    for (const itemXml of itemMatches.slice(0, 10)) {
      const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)
      const linkMatch = itemXml.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i)
      const descMatch = itemXml.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i)
      const dateMatch = itemXml.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i)

      let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : ''
      title = title
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')

      const link = linkMatch ? linkMatch[1].trim() : ''
      let summary = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim() : ''
      summary = summary
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
      if (summary.length > 280) summary = summary.substring(0, 280) + '...'

      const pubDate = dateMatch ? new Date(dateMatch[1]) : new Date()
      const dateStr = !isNaN(pubDate.getTime())
        ? pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Recent'

      if (title && link) {
        items.push({
          title,
          summary: summary || 'Click to view full security report and threat advisories.',
          url: link,
          source: sourceName,
          date: dateStr,
          publishedAt: !isNaN(pubDate.getTime()) ? pubDate.toISOString() : new Date().toISOString(),
          image: null
        })
      }
    }
    return items
  } catch (err) {
    console.warn(`[RSS] Failed to fetch ${sourceName}: ${err.message}`)
    return []
  }
}

async function fetchNews() {
  try {
    const [thnItems, bcItems, cisaItems, krebsItems, drItems] = await Promise.all([
      fetchRssFeed('https://feeds.feedburner.com/TheHackersNews', 'The Hacker News'),
      fetchRssFeed('https://www.bleepingcomputer.com/feed/', 'BleepingComputer'),
      fetchRssFeed('https://www.cisa.gov/cybersecurity-advisories/all.xml', 'CISA Advisories'),
      fetchRssFeed('https://krebsonsecurity.com/feed/', 'Krebs on Security'),
      fetchRssFeed('https://www.darkreading.com/rss.xml', 'Dark Reading')
    ])

    const combined = [...thnItems, ...bcItems, ...cisaItems, ...krebsItems, ...drItems]
    combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    if (combined.length > 0) {
      cachedArticles = combined
      lastFetchTimestamp = Date.now()
      console.log(`[Cybernews] Loaded ${cachedArticles.length} live articles from 100% free RSS feeds (THN, BleepingComputer, CISA, Krebs, Dark Reading)`)
    }
  } catch (err) {
    console.error('[Cybernews] Failed to fetch free RSS feeds:', err.message)
  }
}

app.get('/api/cybernews', async (req, res) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50)
    const page = Math.max(parseInt(String(req.query.page), 10) || 1, 1)

    // Refresh cache if older than 30 minutes
    if (Date.now() - lastFetchTimestamp > FETCH_INTERVAL || cachedArticles.length === 0) {
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
