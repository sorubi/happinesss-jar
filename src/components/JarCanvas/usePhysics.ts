import { useEffect, useRef, useCallback } from 'react'
import Matter from 'matter-js'
import type { JarGeometry, PhysicsOrb } from '../../types'

const { Engine, Bodies, Body, Composite } = Matter

interface UsePhysicsOptions {
  geometry: JarGeometry
  onOrbsUpdate: (orbs: PhysicsOrb[]) => void
}

interface OrbBody {
  body: Matter.Body
  id: string
  color: string
  color2: string
  radius: number
}

export function usePhysics({ geometry: g, onOrbsUpdate }: UsePhysicsOptions) {
  const engineRef = useRef<Matter.Engine | null>(null)
  const orbBodiesRef = useRef<OrbBody[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const engine = Engine.create({ gravity: { y: 2.5 } })
    engineRef.current = engine

    const T = 12
    const walls = [
      Bodies.rectangle(g.cx, g.cy + g.bodyH / 2 + T / 2, g.bodyW + T * 2, T, { isStatic: true, label: 'floor' }),
      Bodies.rectangle(g.cx - g.bodyW / 2 - T / 2, g.cy, T, g.bodyH + g.neckH, { isStatic: true, label: 'lwall' }),
      Bodies.rectangle(g.cx + g.bodyW / 2 + T / 2, g.cy, T, g.bodyH + g.neckH, { isStatic: true, label: 'rwall' }),
    ]
    Composite.add(engine.world, walls)

    let lastTime = performance.now()
    const loop = (now: number) => {
      const delta = now - lastTime
      lastTime = now
      Engine.update(engine, Math.min(delta, 32))

      const physicsOrbs: PhysicsOrb[] = orbBodiesRef.current.map(({ body, id, color, color2, radius }) => ({
        id,
        color,
        color2,
        radius,
        x: body.position.x,
        y: body.position.y,
      }))
      onOrbsUpdate(physicsOrbs)

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      Engine.clear(engine)
      orbBodiesRef.current = []
    }
  }, [g.cx, g.cy, g.bodyW, g.bodyH, g.neckW, g.neckH])

  const addOrbToPhysics = useCallback((id: string, color: string, color2: string, radius: number) => {
    const engine = engineRef.current
    if (!engine) return
    if (orbBodiesRef.current.some(o => o.id === id)) return

    const x = g.cx + (Math.random() - 0.5) * g.neckW * 0.5
    const y = g.cy - g.bodyH / 2 - g.neckH + radius

    const body = Bodies.circle(x, y, radius, {
      restitution: 0.42,
      friction: 0.08,
      frictionAir: 0.014,
      density: 0.002,
    })
    Composite.add(engine.world, body)
    orbBodiesRef.current.push({ body, id, color, color2, radius })
  }, [g])

  const shake = useCallback(() => {
    orbBodiesRef.current.forEach(({ body }) => {
      Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.14,
        y: -(0.08 + Math.random() * 0.12),
      })
    })
  }, [])

  const removeOrbFromPhysics = useCallback((id: string) => {
    const engine = engineRef.current
    if (!engine) return
    const idx = orbBodiesRef.current.findIndex(o => o.id === id)
    if (idx === -1) return
    Composite.remove(engine.world, orbBodiesRef.current[idx].body)
    orbBodiesRef.current.splice(idx, 1)
  }, [])

  return { addOrbToPhysics, shake, removeOrbFromPhysics }
}
