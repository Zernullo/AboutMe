import { useEffect, useRef, useState } from 'react'
import { LoadingScreen } from './AnimateRoute'

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false)
  const calledRef = useRef(false)           // guard against double calls

  useEffect(() => {
    const t = setTimeout(() => setFading(true), 4400)   // fade starts at 4.4s
    return () => clearTimeout(t)
  }, [])

  const handleTransitionEnd = () => {
    if (fading && !calledRef.current) {
      calledRef.current = true
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