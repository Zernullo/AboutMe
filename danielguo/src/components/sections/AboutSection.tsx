import { useEffect, useState } from 'react'
import portraitImage from '@/assets/images/portfolio.png'

function AboutSection() {
  const [displayedInterest, setDisplayedInterest] = useState('')

  useEffect(() => {
    const interests = [
      'Artificial Intelligence',
      'Machine Learning',
      'Software Engineering',
      'Game Development'
    ]
    let interestIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100
    
    let timeout: ReturnType<typeof setTimeout>
    const typeInterest = () => {
      const currentInterest = interests[interestIndex]

      if (isDeleting) {
        setDisplayedInterest(currentInterest.substring(0, charIndex - 1))
        charIndex--
        typingSpeed = 50
      } else {
        setDisplayedInterest(currentInterest.substring(0, charIndex + 1))
        charIndex++
        typingSpeed = 100
      }

      if (!isDeleting && charIndex === currentInterest.length) {
        isDeleting = true
        typingSpeed = 1500
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        interestIndex = (interestIndex + 1) % interests.length
        typingSpeed = 500
      }

      timeout = setTimeout(typeInterest, typingSpeed)
    }

    timeout = setTimeout(typeInterest, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section id="about" className="py-1" style={{ scrollMarginTop: '100px' }}>
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
        <div className="text-center">
          <h2 className="text-3xl font-mono font-black tracking-wide text-[#00ff41] uppercase italic">About</h2>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-[#888]">Who I Am & Interests</p>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#00ff41]/40 to-[#00ff41]/10" />
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src={portraitImage}
          alt="Portrait of Daniel Guo"
          className="animate-float-y h-56 w-[320px] rounded-full border-2 border-[#00ff41] object-cover shadow-[0_0_40px_rgba(0,255,65,0.75),inset_0_0_0_2px_#000000]"
          loading="lazy"
        />
      </div>
      <p className="mx-auto mt-10 max-w-3xl text-[#e0e0e0] text-base leading-relaxed">
        What's up, I'm Daniel, a cybersecurity specialist with a passion for defending and strengthening the digital world.
        I also have additional interests in exploring <span className="text-[#00ff41] font-semibold">{displayedInterest}<span className="animate-pulse">|</span></span>.
      </p>
      <p className="mx-auto mt-4 max-w-3xl text-[#888888] text-sm leading-relaxed">
        While I have diverse technical interests, I am currently exploring applying Artificial Intelligence and Machine Learning in the cybersecurity field, and am open to opportunities in this area.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-[#888888]">
        <span className="rounded border border-[#333] px-3 py-1">React (TypeScript & Tailwind CSS)</span>
        <span className="rounded border border-[#333] px-3 py-1">Vite</span>
        <span className="rounded border border-[#333] px-3 py-1">Node.js</span>
        <span className="rounded border border-[#333] px-3 py-1">Express</span>
        <span className="rounded border border-[#333] px-3 py-1">PostgreSQL</span>
        <span className="rounded border border-[#333] px-3 py-1">Python</span>
        <span className="rounded border border-[#333] px-3 py-1">C/C++</span>
        <span className="rounded border border-[#333] px-3 py-1">C#</span>
        <span className="rounded border border-[#333] px-3 py-1">Java</span>
      </div>
    </section>
  )
}

export default AboutSection
