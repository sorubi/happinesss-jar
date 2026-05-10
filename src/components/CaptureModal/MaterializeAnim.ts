import { gsap } from 'gsap'
import { hexToRgb } from '../JarCanvas/jarRenderer'

export function playMaterializeAnim(
  canvas: HTMLCanvasElement,
  color: string,
  color2: string,
  onComplete: () => void,
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) { onComplete(); return }

  const W = canvas.width, H = canvas.height
  const cx = W / 2, cy = H / 2

  const particles = Array.from({ length: 40 }, () => ({
    x: cx + (Math.random() - 0.5) * W * 0.6,
    y: cy + (Math.random() - 0.5) * H * 0.3,
    alpha: 1,
    size: 2 + Math.random() * 3,
  }))

  const state = { progress: 0 }
  const c1 = hexToRgb(color)
  const c2 = hexToRgb(color2)

  gsap.to(state, {
    progress: 1,
    duration: 1.4,
    ease: 'power2.inOut',
    onUpdate() {
      ctx.clearRect(0, 0, W, H)
      const p = state.progress

      particles.forEach(pt => {
        const x = pt.x + (cx - pt.x) * p
        const y = pt.y + (cy - pt.y) * p
        ctx.save()
        ctx.globalAlpha = pt.alpha * (1 - p * 0.5)
        ctx.fillStyle = color
        ctx.shadowBlur = 6
        ctx.shadowColor = color
        ctx.beginPath()
        ctx.arc(x, y, pt.size * (1 - p * 0.3), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      if (p > 0.6) {
        const orbProgress = (p - 0.6) / 0.4
        const radius = 30 * orbProgress

        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 3)
        glowGrad.addColorStop(0, `rgba(${c1.r},${c1.g},${c1.b},${0.3 * orbProgress})`)
        glowGrad.addColorStop(0.5, `rgba(${c2.r},${c2.g},${c2.b},${0.15 * orbProgress})`)
        glowGrad.addColorStop(1, `rgba(${c1.r},${c1.g},${c1.b},0)`)
        ctx.beginPath()
        ctx.arc(cx, cy, radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = glowGrad
        ctx.fill()
        ctx.restore()

        const bodyGrad = ctx.createRadialGradient(cx - radius * 0.15, cy - radius * 0.2, 0, cx, cy, radius * 1.1)
        bodyGrad.addColorStop(0, 'rgba(255,255,255,0.9)')
        bodyGrad.addColorStop(0.2, `rgba(${c1.r},${c1.g},${c1.b},0.95)`)
        bodyGrad.addColorStop(0.6, `rgba(${c2.r},${c2.g},${c2.b},0.82)`)
        bodyGrad.addColorStop(1, `rgba(${c2.r},${c2.g},${c2.b},0)`)
        ctx.beginPath()
        ctx.arc(cx, cy, radius * 1.1, 0, Math.PI * 2)
        ctx.fillStyle = bodyGrad
        ctx.fill()
      }
    },
    onComplete,
  })
}
