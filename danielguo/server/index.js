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

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(254),
  message: z.string().min(10).max(2000)
})

const lastRequestByIp = new Map()
const MIN_INTERVAL_MS = 10_000

app.post('/api/contact', async (req, res) => {
  try {
    const ip = req.ip || req.connection?.remoteAddress || 'unknown'
    const lastRequest = lastRequestByIp.get(ip)
    if (lastRequest && Date.now() - lastRequest < MIN_INTERVAL_MS) {
      res.status(429).json({ ok: false, error: 'Please wait before sending another message.' })
      return
    }

    const { name, email, message } = contactSchema.parse(req.body)

    await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    )

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

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
    res.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ ok: false, error: error.errors.map((e) => e.message).join(' ') })
      return
    }
    res.status(500).json({ ok: false, error: 'Failed to send message.' })
  }
})

app.listen(port, () => {
  console.log(`Contact API running on port ${port}`)
})
