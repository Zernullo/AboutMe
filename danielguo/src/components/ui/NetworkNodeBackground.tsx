import { useEffect, useRef } from 'react'

const NODE_COUNT = 30
const LINK_DISTANCE = 120
function getProtectedArea() {
  const width = window.innerWidth * 0.7;  // 70% of viewport width
  const height = window.innerHeight * 0.3; // 30% of viewport height
  return {
    width,
    height,
    x: window.innerWidth / 2 - width / 2,
    y: window.innerHeight / 2 - height / 2,
  };
}

let PROTECTED_AREA = getProtectedArea()

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
    canvas.width = width
    canvas.height = height

    // Initialize nodes
    nodes.current = Array.from({ length: NODE_COUNT }, () => ({
      x: random(0, width),
      y: random(0, height),
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5),
    }))

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw protected area for debugging
      // ctx.save()
      // ctx.globalAlpha = 0.3
      // ctx.fillStyle = '#ff00ff' // Magenta, change to any color you like
      // ctx.fillRect(
      //   PROTECTED_AREA.x,
      //   PROTECTED_AREA.y,
      //   PROTECTED_AREA.width,
      //   PROTECTED_AREA.height
      // )
      // ctx.restore()

      // Draw links
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
            ctx.save()
            ctx.globalAlpha = 1 // Increased for more visible lines
            ctx.strokeStyle = '#00ff41' // Neon green color
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Draw nodes
      for (const node of nodes.current) {
        ctx.save()
        ctx.shadowColor = '#00ff41' // Neon green shadow
        ctx.shadowBlur = 12
        ctx.fillStyle = '#00ff41' // Neon green color
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Bounce off protected area
        if (isInProtectedArea(node.x, node.y)) {
          if (node.x < PROTECTED_AREA.x + PROTECTED_AREA.width / 2) node.vx = -Math.abs(node.vx)
          else node.vx = Math.abs(node.vx)
          if (node.y < PROTECTED_AREA.y + PROTECTED_AREA.height / 2) node.vy = -Math.abs(node.vy)
          else node.vy = Math.abs(node.vy)
        }

        // Move node
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      PROTECTED_AREA = getProtectedArea()
    }
    window.addEventListener('resize', handleResize)

    return () => {
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
        opacity: 0.8, // Increased for better visibility
        mixBlendMode: 'normal', // Change to normal for more contrast
      }}
    />
  )
}

const isInProtectedArea = (x: number, y: number) =>
  x > PROTECTED_AREA.x &&
  x < PROTECTED_AREA.x + PROTECTED_AREA.width &&
  y > PROTECTED_AREA.y &&
  y < PROTECTED_AREA.y + PROTECTED_AREA.height

export default NetworkNodesBackground