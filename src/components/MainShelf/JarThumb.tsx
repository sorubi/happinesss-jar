import { useEffect, useRef } from 'react'
import type { Orb } from '../../types'
import { hexToRgb } from '../JarCanvas/jarRenderer'

interface JarThumbProps {
  orbs: Orb[]
  isActive: boolean
  isFuture: boolean
}

const W = 140, H = 200

export default function JarThumb({ orbs, isActive, isFuture }: JarThumbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, W, H)

    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, '#0F172A')
    bg.addColorStop(1, '#1E1B4B')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    const cx = W / 2, bodyW = 90, bodyH = 120, neckW = 36, neckH = 22

    ctx.beginPath()
    ctx.roundRect(cx - bodyW / 2, H * 0.3, bodyW, bodyH, [0, 0, 16, 16])
    ctx.fillStyle = 'rgba(80,100,180,0.04)'
    ctx.fill()

    if (orbs.length > 0) {
      const clampedOrbs = orbs.slice(0, 12)
      const positions = clampedOrbs.map((_, i) => ({
        x: cx + (Math.cos(i * 2.3) * bodyW * 0.3),
        y: H * 0.3 + bodyH - 20 - Math.floor(i / 3) * 22,
      }))

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      clampedOrbs.forEach((orb, i) => {
        const c1 = hexToRgb(orb.color)
        const { x, y } = positions[i]
        const gr = ctx.createRadialGradient(x, y, 0, x, y, 18)
        gr.addColorStop(0, `rgba(${c1.r},${c1.g},${c1.b},0.18)`)
        gr.addColorStop(1, `rgba(${c1.r},${c1.g},${c1.b},0)`)
        ctx.beginPath()
        ctx.arc(x, y, 18, 0, Math.PI * 2)
        ctx.fillStyle = gr
        ctx.fill()
      })
      ctx.restore()

      clampedOrbs.forEach((orb, i) => {
        const c1 = hexToRgb(orb.color)
        const c2 = hexToRgb(orb.color2)
        const { x, y } = positions[i]
        const gr = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, 9)
        gr.addColorStop(0, 'rgba(255,255,255,0.9)')
        gr.addColorStop(0.2, `rgba(${c1.r},${c1.g},${c1.b},0.9)`)
        gr.addColorStop(0.7, `rgba(${c2.r},${c2.g},${c2.b},0.8)`)
        gr.addColorStop(1, `rgba(${c2.r},${c2.g},${c2.b},0)`)
        ctx.beginPath()
        ctx.arc(x, y, 9, 0, Math.PI * 2)
        ctx.fillStyle = gr
        ctx.fill()
      })
    }

    ctx.beginPath()
    ctx.roundRect(cx - bodyW / 2, H * 0.3, bodyW, bodyH, [0, 0, 16, 16])
    ctx.strokeStyle = isActive
      ? 'rgba(162,89,255,0.5)'
      : 'rgba(148,163,184,0.22)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.beginPath()
    ctx.roundRect(cx - neckW / 2, H * 0.3 - neckH, neckW, neckH, [4, 4, 0, 0])
    ctx.strokeStyle = isActive ? 'rgba(162,89,255,0.5)' : 'rgba(148,163,184,0.22)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    if (isFuture) {
      ctx.fillStyle = 'rgba(148,163,184,0.3)'
      ctx.font = '18px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('🔒', cx, H * 0.3 + bodyH / 2)
    }

    if (isActive) {
      const glow = ctx.createRadialGradient(cx, H * 0.3 + bodyH / 2, 0, cx, H * 0.3 + bodyH / 2, bodyW * 0.8)
      glow.addColorStop(0, 'rgba(162,89,255,0.08)')
      glow.addColorStop(1, 'rgba(162,89,255,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)
    }
  }, [orbs, isActive, isFuture])

  return <canvas ref={canvasRef} width={W} height={H} />
}
