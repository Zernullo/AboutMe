import { useEffect, useRef, useState } from 'react'
import { LoadingScreen } from './AnimateRoute'

const alreadyBooted = () => sessionStorage.getItem('hasBooted') === 'true'

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(alreadyBooted)
  const calledRef = useRef(false)

  useEffect(() => {
    if (alreadyBooted()) {
      onDone()
      return
    }

    const t = setTimeout(() => setFading(true), 4400)
    return () => clearTimeout(t)
  }, [onDone])

  const handleTransitionEnd = () => {
    if (fading && !calledRef.current) {
      calledRef.current = true
      sessionStorage.setItem('hasBooted', 'true')  // persists through refresh
      onDone()
    }
  }

  return (
    <div
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        minHeight: '100vh',
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <LoadingScreen />
    </div>
  )
}