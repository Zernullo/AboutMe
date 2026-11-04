import { useCallback, useEffect, useRef, useState } from 'react'
import { LoadingScreen } from './AnimateRoute'

const alreadyBooted = () => typeof window !== 'undefined' && sessionStorage.getItem('hasBooted') === 'true'

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(alreadyBooted)
  const calledRef = useRef(false)

  const handleFinish = useCallback(() => {
    if (!calledRef.current) {
      calledRef.current = true
      sessionStorage.setItem('hasBooted', 'true')
      onDone()
    }
  }, [onDone])

  useEffect(() => {
    if (alreadyBooted()) {
      handleFinish()
      return
    }

    // Fast 1.1s boot sequence
    const t = setTimeout(() => {
      setFading(true)
    }, 1150)

    return () => clearTimeout(t)
  }, [handleFinish])

  const handleTransitionEnd = () => {
    if (fading) {
      handleFinish()
    }
  }

  const handleSkip = () => {
    setFading(true)
    handleFinish()
  }

  return (
    <div
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease-out',
        minHeight: '100vh',
        position: 'relative'
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <button
        onClick={handleSkip}
        type="button"
        className="fixed top-6 right-6 z-50 inline-flex items-center gap-1.5 rounded-lg border border-[#00ff41]/50 bg-[#111111]/90 px-3.5 py-1.5 text-xs font-mono font-bold text-[#00ff41] hover:bg-[#00ff41] hover:!text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.3)] backdrop-blur-md"
      >
        <span>SKIP INTRO</span>
        <span>→</span>
      </button>

      <LoadingScreen />
    </div>
  )
}
