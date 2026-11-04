import { useEffect, useRef } from 'react'

const NODE_COUNT = 32
const LINK_DISTANCE = 130

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const NetworkNodesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodes = useRef<{ x: number; y: number; vx: number; vy: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = window.devicePixelRatio || 1

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resizeCanvas()

    let protectedArea = {
      width: width * 0.65,
      height: height * 0.35,
      x: width * 0.175,
      y: height * 0.325,
    }

    const isInProtectedArea = (x: number, y: number) =>
      x > protectedArea.x &&
      x < protectedArea.x + protectedArea.width &&
      y > protectedArea.y &&
      y < protectedArea.y + protectedArea.height

    // Initialize nodes
    nodes.current = Array.from({ length: NODE_COUNT }, () => ({
      x: random(0, width),
      y: random(0, height),
      vx: random(-0.4, 0.4),
      vy: random(-0.4, 0.4),
    }))

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw links
      ctx.strokeStyle = '#00ff41'
      ctx.globalAlpha = 0.5
      ctx.lineWidth = 1
      ctx.beginPath()

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const a = nodes.current[i]
          const b = nodes.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (
            dist < LINK_DISTANCE &&
            !isInProtectedArea(a.x, a.y) &&
            !isInProtectedArea(b.x, b.y)
          ) {
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
          }
        }
      }
      ctx.stroke()

      // Draw nodes
      ctx.shadowColor = '#00ff41'
      ctx.shadowBlur = 8
      ctx.fillStyle = '#00ff41'
      ctx.globalAlpha = 0.75

      for (const node of nodes.current) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2)
        ctx.fill()

        // Bounce off protected area
        if (isInProtectedArea(node.x, node.y)) {
          if (node.x < protectedArea.x + protectedArea.width / 2) node.vx = -Math.abs(node.vx)
          else node.vx = Math.abs(node.vx)
          if (node.y < protectedArea.y + protectedArea.height / 2) node.vy = -Math.abs(node.vy)
          else node.vy = Math.abs(node.vy)
        }

        // Move node
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }

      ctx.shadowBlur = 0
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
      protectedArea = {
        width: width * 0.65,
        height: height * 0.35,
        x: width * 0.175,
        y: height * 0.325,
      }
      for (const node of nodes.current) {
        if (node.x > width) node.x = width - 10
        if (node.y > height) node.y = height - 10
      }
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
        opacity: 0.85,
        mixBlendMode: 'normal',
      }}
    />
  )
}

export default NetworkNodesBackground
