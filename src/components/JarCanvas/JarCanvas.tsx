import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import type { Orb, JarGeometry, PhysicsOrb } from '../../types'
import { renderJarScene } from './jarRenderer'
import { usePhysics } from './usePhysics'
import './JarCanvas.css'

interface JarCanvasProps {
  orbs: Orb[]
  width: number
  height: number
  onOrbTap?: (orb: Orb) => void
}

export interface JarCanvasRef {
  shake: () => void
}

function computeGeometry(W: number, H: number): JarGeometry {
  return {
    cx: W / 2,
    cy: H * 0.54,
    bodyW: W * 0.56,
    bodyH: H * 0.46,
    neckW: W * 0.22,
    neckH: H * 0.07,
  }
}

const JarCanvas = forwardRef<JarCanvasRef, JarCanvasProps>(
  ({ orbs, width, height, onOrbTap }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [physicsOrbs, setPhysicsOrbs] = useState<PhysicsOrb[]>([])
    const geometry = computeGeometry(width, height)
    const prevOrbIdsRef = useRef<Set<string>>(new Set())

    const { addOrbToPhysics, shake, removeOrbFromPhysics } = usePhysics({
      geometry,
      onOrbsUpdate: setPhysicsOrbs,
    })

    useImperativeHandle(ref, () => ({ shake }), [shake])

    useEffect(() => {
      const newIds = new Set(orbs.map(o => o.id))

      for (const orb of orbs) {
        if (!prevOrbIdsRef.current.has(orb.id)) {
          addOrbToPhysics(orb.id, orb.color, orb.color2, orb.size)
        }
      }

      for (const id of prevOrbIdsRef.current) {
        if (!newIds.has(id)) {
          removeOrbFromPhysics(id)
        }
      }

      prevOrbIdsRef.current = newIds
    }, [orbs, addOrbToPhysics, removeOrbFromPhysics])

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      renderJarScene(ctx, width, height, physicsOrbs, geometry)
    }, [physicsOrbs, width, height, geometry])

    function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
      if (!onOrbTap) return
      const rect = canvasRef.current!.getBoundingClientRect()
      const mx = (e.clientX - rect.left) * (width / rect.width)
      const my = (e.clientY - rect.top) * (height / rect.height)

      for (const po of physicsOrbs) {
        const dist = Math.sqrt((mx - po.x) ** 2 + (my - po.y) ** 2)
        if (dist <= po.radius * 1.3) {
          const orb = orbs.find(o => o.id === po.id)
          if (orb) onOrbTap(orb)
          return
        }
      }
    }

    return (
      <div className="jar-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={handleClick}
        />
      </div>
    )
  }
)

JarCanvas.displayName = 'JarCanvas'
export default JarCanvas
