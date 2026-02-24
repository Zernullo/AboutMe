import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001'
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('')
  const [statusTone, setStatusTone] = useState<'success' | 'error' | 'info'>('info')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('')
    setStatusTone('info')

    if (name.trim().length < 2 || message.trim().length < 10) {
      setStatus('Please provide your name and a longer message.')
      setStatusTone('error')
      return
    }

    setIsSubmitting(true)
    try {
      let recaptchaToken = ''
      
      if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
        try {
          recaptchaToken = await new Promise<string>((resolve) => {
            window.grecaptcha.ready(async () => {
              const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
              resolve(token)
            })
          })
        } catch {
          setStatus('Security check failed. Please refresh and try again.')
          setStatusTone('error')
          setIsSubmitting(false)
          return
        }
      }

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot, recaptchaToken })
      })

      const data = await response.json()
      if (!response.ok) {
        setStatus(data?.error || 'Message failed to send.')
        setStatusTone('error')
        return
      }

      setStatus(data?.message || 'Please check your email to verify your message.')
      setStatusTone('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('Message failed to send.')
      setStatusTone('error')
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
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-[28px] border border-[#1f2a1f] bg-[linear-gradient(135deg,#0b0f0b_0%,#0e1410_45%,#0a0d0a_100%)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)] md:p-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#234026] bg-[#0a120c] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7dfc9c]">
            Secure intake
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-center">
                <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">Contact</h2>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">Get In Touch</p>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-[#c7c7c7] md:text-base">
                If you have any questions, or just want to connect, feel free to reach out to me.
              </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#1a231c] bg-[#0a0f0a] p-5 text-left">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#d9ffd0]">What to include</h3>
              <ul className="space-y-3 text-sm text-[#9db3a3]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#00ff41]" />
                  Briefly describe your inquiry.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#00ff41]" />
                  Any relevant details, links, or context.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#00ff41]" />
                  Your preferred contact method and availability.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#18301d] bg-[#0b140d] p-4 text-xs text-[#7fb58b]">
              Tip: If you have links, share them in the message field.
            </div>
          </div>
          <form
            className="flex flex-col gap-4 text-left"
            onSubmit={handleSubmit}
          >
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
            <label className="text-xs uppercase tracking-[0.2em] text-[#8aa395]">
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#203124] bg-[#0c120c] px-4 py-3 text-sm text-[#e6ffe6] outline-none transition-all focus:border-[#00ff41] focus:shadow-[0_0_0_1px_#00ff41,0_0_16px_rgba(0,255,65,0.35)]"
                required
              />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-[#8aa395]">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#203124] bg-[#0c120c] px-4 py-3 text-sm text-[#e6ffe6] outline-none transition-all focus:border-[#00ff41] focus:shadow-[0_0_0_1px_#00ff41,0_0_16px_rgba(0,255,65,0.35)]"
                required
              />
            </label>
            <label className="text-xs uppercase tracking-[0.2em] text-[#8aa395]">
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="mt-2 min-h-35 w-full resize-none rounded-xl border border-[#203124] bg-[#0c120c] px-4 py-3 text-sm text-[#e6ffe6] outline-none transition-all focus:border-[#00ff41] focus:shadow-[0_0_0_1px_#00ff41,0_0_16px_rgba(0,255,65,0.35)]"
                rows={5}
                required
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#6e8476]">Minimum 10 characters.</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-[#00ff41] px-5 py-3 text-sm font-semibold text-[#00ff41] transition-all hover:-translate-y-0.5 hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.45)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {status && (
              <p
                className={`rounded-lg border px-3 py-2 text-xs ${
                  statusTone === 'success'
                    ? 'border-[#1f3a24] bg-[#0d1710] text-[#7ef7a3]'
                    : statusTone === 'error'
                      ? 'border-[#3a1f1f] bg-[#170d0d] text-[#f59292]'
                      : 'border-[#2b2f2b] bg-[#0e100e] text-[#8aa395]'
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
