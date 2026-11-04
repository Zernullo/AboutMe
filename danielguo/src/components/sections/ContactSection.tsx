import { useState } from 'react'
import { Mail, Check, Copy, ExternalLink, Send } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE ?? ''
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''
const DIRECT_EMAIL = 'dguo83212@gmail.com'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const loadRecaptchaScript = (siteKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || window.grecaptcha) {
      resolve()
      return
    }
    const scriptId = 'google-recaptcha-script'
    if (document.getElementById(scriptId)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
    document.head.appendChild(script)
  })
}

function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('')
  const [statusTone, setStatusTone] = useState<'success' | 'error' | 'info'>('info')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMailtoFallback, setShowMailtoFallback] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(DIRECT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name.trim() || 'Colleague / Recruiter'}`)
    const bodyText = message.trim()
      ? `${message.trim()}\n\n---\nSent by: ${name.trim() || 'Anonymous'}\nContact Email: ${email.trim() || 'Not specified'}`
      : `Hi Daniel,\n\nI reviewed your portfolio and would like to connect with you regarding...\n\nBest regards,\n${name.trim() || '[Your Name]'}\n${email.trim() || '[Your Email]'}`
    return `mailto:${DIRECT_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyText)}`
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('')
    setStatusTone('info')
    setShowMailtoFallback(false)

    if (name.trim().length < 2 || message.trim().length < 10) {
      setStatus('Please provide your name and a message with at least 10 characters.')
      setStatusTone('error')
      return
    }

    setIsSubmitting(true)
    try {
      let recaptchaToken = ''

      if (RECAPTCHA_SITE_KEY) {
        try {
          await loadRecaptchaScript(RECAPTCHA_SITE_KEY)
          if (window.grecaptcha) {
            recaptchaToken = await new Promise<string>((resolve) => {
              window.grecaptcha?.ready(async () => {
                const token = await window.grecaptcha?.execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
                resolve(token || '')
              })
            })
          }
        } catch {
          console.warn('reCAPTCHA failed, proceeding without token')
        }
      }

      const endpoint = API_BASE ? `${API_BASE}/api/contact` : '/api/contact'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot, recaptchaToken })
      })

      const data = await response.json()
      if (!response.ok) {
        setStatus(data?.error || 'Message delivery failed.')
        setStatusTone('error')
        setShowMailtoFallback(true)
        return
      }

      setStatus(data?.message || 'Message sent successfully. Thank you!')
      setStatusTone('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('Could not connect to the backend mail service.')
      setStatusTone('error')
      setShowMailtoFallback(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-4 h-40 w-72 -translate-x-1/2 rounded-full bg-[#00ff41]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-56 rounded-full bg-[#00ff41]/5 blur-2xl" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-[28px] border border-[#2a382c] bg-[linear-gradient(135deg,#0b0f0b_0%,#0e1410_45%,#0a0d0a_100%)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)] md:p-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2b4d2e] bg-[#0c160e] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#00ff41]">
            TRANSMISSION TERMINAL
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">Contact</h2>
            <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-[#a3a3a3]">Get In Touch</p>
            <p className="max-w-2xl text-base leading-relaxed text-[#d1d5db]">
              Have an opportunity, question, or project inquiry? Send a message directly through the terminal below.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          {/* Left card: info & fallback options */}
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#263528] bg-[#0a0f0a] p-6 text-left">
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-[#ffffff] flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#00ff41]" /> Direct Channel
              </h3>

              <div className="rounded-xl border border-[#2a3e2d] bg-[#0c160e] p-4 space-y-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#9ca3af] mb-1 font-semibold">Primary Email</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm text-[#00ff41] font-bold">{DIRECT_EMAIL}</span>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="flex items-center gap-1.5 rounded-lg border border-[#00ff41]/40 bg-[#162719] px-3 py-1.5 text-xs font-mono font-semibold text-[#00ff41] hover:bg-[#00ff41] hover:!text-black transition-all cursor-pointer"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-[#00ff41]" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1f2d21] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9ca3af]">Phone</span>
                  <span className="text-[#f3f4f6] font-semibold">(929) 317-1863</span>
                </div>

                <div className="pt-2 border-t border-[#1f2d21] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9ca3af]">Location</span>
                  <span className="text-[#f3f4f6] font-semibold">Baton Rouge, LA</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#00ff41] font-bold">What to include</h4>
                <ul className="space-y-2.5 text-sm text-[#d1d5db]">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#00ff41] shrink-0" />
                    <span>Brief summary of the role, project, or question.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#00ff41] shrink-0" />
                    <span>Relevant links, repositories, or documentation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#00ff41] shrink-0" />
                    <span>Your timeline and preferred follow-up method.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-[#1f2d21]">
              <p className="text-xs font-medium text-[#9ca3af]">Prefer using your desktop email client?</p>
              <a
                href={getMailtoUrl()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00ff41] bg-transparent px-4 py-2.5 text-xs font-mono font-bold text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all"
              >
                <ExternalLink className="h-4 w-4" />
                Launch Default Mail Client
              </a>
            </div>
          </div>

          {/* Right card: Form */}
          <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <label className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#e0e0e0]">
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Jane Doe"
                className="mt-2 w-full rounded-xl border border-[#2f4233] bg-[#0c120c] px-4 py-3 text-sm text-[#ffffff] placeholder-[#6b7280] outline-none transition-all focus:border-[#00ff41] focus:shadow-[0_0_0_1px_#00ff41,0_0_16px_rgba(0,255,65,0.35)]"
                required
              />
            </label>

            <label className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#e0e0e0]">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="jane@example.com"
                className="mt-2 w-full rounded-xl border border-[#2f4233] bg-[#0c120c] px-4 py-3 text-sm text-[#ffffff] placeholder-[#6b7280] outline-none transition-all focus:border-[#00ff41] focus:shadow-[0_0_0_1px_#00ff41,0_0_16px_rgba(0,255,65,0.35)]"
                required
              />
            </label>

            <label className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#e0e0e0]">
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Hello Daniel, I'd like to discuss an opportunity..."
                className="mt-2 min-h-35 w-full resize-none rounded-xl border border-[#2f4233] bg-[#0c120c] px-4 py-3 text-sm text-[#ffffff] placeholder-[#6b7280] outline-none transition-all focus:border-[#00ff41] focus:shadow-[0_0_0_1px_#00ff41,0_0_16px_rgba(0,255,65,0.35)]"
                rows={5}
                required
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#9ca3af] font-mono">Minimum 10 characters.</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00ff41] px-7 py-3 text-sm font-bold text-black shadow-[0_0_18px_rgba(0,255,65,0.4)] transition-all hover:bg-[#00ff41]/90 hover:shadow-[0_0_28px_rgba(0,255,65,0.6)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Transmitting...' : 'Send Message'}
              </button>
            </div>

            {status && (
              <div
                className={`rounded-xl border p-4 text-xs font-mono ${
                  statusTone === 'success'
                    ? 'border-[#00ff41] bg-[#0d1c10] text-[#7ef7a3]'
                    : statusTone === 'error'
                      ? 'border-[#ff4444] bg-[#220d0d] text-[#ff8888]'
                      : 'border-[#444] bg-[#141414] text-[#d1d5db]'
                }`}
              >
                <p className="font-bold text-sm mb-1">{status}</p>

                {showMailtoFallback && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                    <p className="text-gray-200">
                      You can instantly dispatch this message through your mail app:
                    </p>
                    <a
                      href={getMailtoUrl()}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00ff41] px-4 py-2 font-mono text-xs font-bold text-black hover:bg-[#00ff41]/90 transition-colors w-fit"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open Mail App With This Message
                    </a>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
