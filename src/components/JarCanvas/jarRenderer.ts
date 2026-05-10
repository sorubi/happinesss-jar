import type { JarGeometry, PhysicsOrb } from '../../types'

// ─── Helpers ────────────────────────────────────────────────────────────────

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function buildJarPath(ctx: CanvasRenderingContext2D, g: JarGeometry, inset = 0): void {
  const { cx, cy, bodyW, bodyH, neckW } = g
  const hw = bodyW / 2 - inset
  const hh = bodyH / 2
  const r = 26 - inset

  ctx.beginPath()
  ctx.moveTo(cx - neckW / 2, cy - hh)
  ctx.lineTo(cx - hw, cy - hh + 10)
  ctx.lineTo(cx - hw, cy + hh - r)
  ctx.quadraticCurveTo(cx - hw, cy + hh, cx - hw + r, cy + hh)
  ctx.lineTo(cx + hw - r, cy + hh)
  ctx.quadraticCurveTo(cx + hw, cy + hh, cx + hw, cy + hh - r)
  ctx.lineTo(cx + hw, cy - hh + 10)
  ctx.lineTo(cx + neckW / 2, cy - hh)
  ctx.closePath()
}

export function buildNeckPath(ctx: CanvasRenderingContext2D, g: JarGeometry): void {
  const { cx, cy, bodyW, bodyH, neckW, neckH } = g
  ctx.beginPath()
  ctx.moveTo(cx - neckW / 2, cy - bodyH / 2)
  ctx.lineTo(cx - neckW / 2, cy - bodyH / 2 - neckH)
  ctx.lineTo(cx + neckW / 2, cy - bodyH / 2 - neckH)
  ctx.lineTo(cx + neckW / 2, cy - bodyH / 2)
  ctx.closePath()
}

// ─── Background ─────────────────────────────────────────────────────────────

export function drawBackground(ctx: CanvasRenderingContext2D, W: number, H: number): void {
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, '#0F172A')
  grad.addColorStop(1, '#1E1B4B')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)
}

// ─── Jar back (drawn behind orbs) ────────────────────────────────────────────

export function drawJarBack(ctx: CanvasRenderingContext2D, g: JarGeometry): void {
  ctx.save()
  buildJarPath(ctx, g)
  ctx.fillStyle = 'rgba(80, 100, 180, 0.04)'
  ctx.fill()
  buildNeckPath(ctx, g)
  ctx.fillStyle = 'rgba(80, 100, 180, 0.04)'
  ctx.fill()
  ctx.restore()
}

// ─── Orb glow (call inside ctx.globalCompositeOperation = 'lighter' block) ──

export function drawOrbGlow(ctx: CanvasRenderingContext2D, orb: PhysicsOrb): void {
  const { x, y, radius, color, color2 } = orb
  const c1 = hexToRgb(color)
  const c2 = hexToRgb(color2)

  // 3-layer glow using both gradient colors
  const layers: Array<{ mult: number; alpha: number; useColor2: boolean }> = [
    { mult: 5.5, alpha: 0.04, useColor2: false },
    { mult: 3.2, alpha: 0.08, useColor2: true },
    { mult: 1.9, alpha: 0.15, useColor2: false },
  ]

  for (const { mult, alpha, useColor2 } of layers) {
    const c = useColor2 ? c2 : c1
    const gr = radius * mult
    const grad = ctx.createRadialGradient(x, y, 0, x, y, gr)
    grad.addColorStop(0,   `rgba(${c.r},${c.g},${c.b},${alpha})`)
    grad.addColorStop(0.4, `rgba(${c.r},${c.g},${c.b},${alpha * 0.5})`)
    grad.addColorStop(1,   `rgba(${c.r},${c.g},${c.b},0)`)
    ctx.beginPath()
    ctx.arc(x, y, gr, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
}

// ─── Orb body (white-hot center, gradient from color to color2, soft edge) ───

export function drawOrbBody(ctx: CanvasRenderingContext2D, orb: PhysicsOrb): void {
  const { x, y, radius, color, color2 } = orb
  const c1 = hexToRgb(color)
  const c2 = hexToRgb(color2)

  // Soft edge: render slightly larger than radius, fade to transparent
  const R = radius * 1.1

  const grad = ctx.createRadialGradient(
    x - radius * 0.12, y - radius * 0.18, 0,
    x, y, R
  )
  grad.addColorStop(0,    'rgba(255,255,255,0.92)')                        // white-hot center
  grad.addColorStop(0.18, `rgba(${c1.r},${c1.g},${c1.b},0.95)`)           // color (start)
  grad.addColorStop(0.55, `rgba(${c2.r},${c2.g},${c2.b},0.82)`)           // color2 (end)
  grad.addColorStop(0.82, `rgba(${c2.r},${c2.g},${c2.b},0.40)`)
  grad.addColorStop(1,    `rgba(${c2.r},${c2.g},${c2.b},0.0)`)            // soft edge

  ctx.beginPath()
  ctx.arc(x, y, R, 0, Math.PI * 2)
  ctx.fillStyle = grad
  ctx.fill()
}

// ─── Ambient interior light from orbs ────────────────────────────────────────

export function drawAmbientInterior(
  ctx: CanvasRenderingContext2D,
  orbs: PhysicsOrb[],
  g: JarGeometry,
): void {
  if (orbs.length === 0) return

  const colorCount: Record<string, number> = {}
  orbs.forEach(o => { colorCount[o.color] = (colorCount[o.color] ?? 0) + 1 })
  const dominant = Object.entries(colorCount).sort((a, b) => b[1] - a[1])[0][0]
  const dc = hexToRgb(dominant)

  const cx = g.cx
  const bottomY = g.cy + g.bodyH / 2

  const ambGrad = ctx.createRadialGradient(cx, bottomY, 0, cx, bottomY, g.bodyW * 0.7)
  ambGrad.addColorStop(0,   `rgba(${dc.r},${dc.g},${dc.b},0.22)`)
  ambGrad.addColorStop(0.5, `rgba(${dc.r},${dc.g},${dc.b},0.08)`)
  ambGrad.addColorStop(1,   `rgba(${dc.r},${dc.g},${dc.b},0)`)
  ctx.fillStyle = ambGrad
  ctx.fillRect(cx - g.bodyW, bottomY - g.bodyH, g.bodyW * 2, g.bodyH)
}

// ─── Jar front (drawn on top of orbs) ─────────────────────────────────────────

export function drawJarFront(ctx: CanvasRenderingContext2D, g: JarGeometry): void {
  const { cx, cy, bodyW, bodyH, neckW, neckH } = g
  ctx.save()

  buildJarPath(ctx, g)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.26)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  buildNeckPath(ctx, g)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.26)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Neck top rim
  ctx.beginPath()
  ctx.moveTo(cx - neckW / 2 - 4, cy - bodyH / 2 - neckH)
  ctx.lineTo(cx + neckW / 2 + 4, cy - bodyH / 2 - neckH)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)'
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Left glass edge highlight
  ctx.beginPath()
  ctx.moveTo(cx - bodyW / 2 + 7, cy - bodyH / 2 + 18)
  ctx.lineTo(cx - bodyW / 2 + 7, cy + bodyH / 2 - 32)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.stroke()

  ctx.restore()
}

// ─── Full scene render (only external entry point) ────────────────────────────

export function renderJarScene(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  orbs: PhysicsOrb[],
  g: JarGeometry,
): void {
  ctx.clearRect(0, 0, W, H)

  // 1. Background
  drawBackground(ctx, W, H)

  // 2. Jar back
  drawJarBack(ctx, g)

  // 3. Clip — orbs stay inside jar
  ctx.save()
  buildJarPath(ctx, g, 2)
  ctx.clip()

  // 4a. Orb glow — Additive Blending (core technique!)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  orbs.forEach(o => drawOrbGlow(ctx, o))
  ctx.restore()

  // 4b. Orb body
  orbs.forEach(o => drawOrbBody(ctx, o))

  // 4c. Ambient interior light
  drawAmbientInterior(ctx, orbs, g)

  ctx.restore() // release clip

  // 5. Jar front (over orbs)
  drawJarFront(ctx, g)
}
