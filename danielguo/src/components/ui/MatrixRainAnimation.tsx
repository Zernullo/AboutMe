import { useEffect, useRef } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const fontSize = 16
    const columns = Math.floor(width / fontSize)
    const drops = Array.from({ length: columns }, () => Math.random() * height / fontSize)

    const draw = () => {
      ctx.fillStyle = 'rgba(17,17,17,0.15)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px monospace`
      ctx.fillStyle = '#00ff41'

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x4E00 + Math.floor(Math.random() * (0x9FFF - 0x4E00)))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 1
      }
    }

    let animationId: number
    const animate = () => {
      draw()
      animationId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.25,
        mixBlendMode: 'lighten',
      }}
    />
  )
}

export default MatrixRain