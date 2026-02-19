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

      setTimeout(typeInterest, typingSpeed)
    }

    const timer = setTimeout(typeInterest, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="about" className="py-1">
      <h2 className="text-2xl font-bold text-[#00ff41]">About</h2>
      <div className="mt-8 flex justify-center">
        <img
          src={portraitImage}
          alt="Portrait of Daniel Guo"
          className="animate-float-y h-55 w-[320px] rounded-full border-2 border-[#00ff41] object-cover shadow-[0_0_40px_rgba(0,255,65,0.75),inset_0_0_0_2px_#000000]"
          loading="lazy"
        />
      </div>
      <p className="mx-auto mt-10 max-w-3xl text-[#e0e0e0]">
        Whats up, I'm Daniel, a cybersecurity specialist with a passion about defending and strengthening the digital world.
        I also have additional interests in exploring <span className="text-[#00ff41]">{displayedInterest}</span>.
      </p>
      <p>
        <br />
        While I have additional interests, I am currently exploring on applying Artificial Intelligence and Machine Learning in the cybersecurity field, and am open to any opportunities in this area.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-[#888888]">
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
