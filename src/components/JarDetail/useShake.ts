import { useEffect, useRef, useCallback } from 'react'

interface UseShakeOptions {
  threshold?: number
  cooldown?: number
  onShake: () => void
}

export function useShake({ threshold = 25, cooldown = 800, onShake }: UseShakeOptions) {
  const lastShakeTime = useRef(0)
  const lastAccel = useRef({ x: 0, y: 0, z: 0 })

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity
    if (!acc) return

    const { x = 0, y = 0, z = 0 } = acc
    const prev = lastAccel.current

    const delta = Math.sqrt(
      ((x ?? 0) - prev.x) ** 2 +
      ((y ?? 0) - prev.y) ** 2 +
      ((z ?? 0) - prev.z) ** 2
    )

    lastAccel.current = { x: x ?? 0, y: y ?? 0, z: z ?? 0 }

    if (delta > threshold) {
      const now = Date.now()
      if (now - lastShakeTime.current > cooldown) {
        lastShakeTime.current = now
        onShake()
      }
    }
  }, [threshold, cooldown, onShake])

  useEffect(() => {
    const setup = async () => {
      if (typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
        try {
          const perm = await (DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
          if (perm !== 'granted') return
        } catch {
          return
        }
      }
      window.addEventListener('devicemotion', handleMotion)
    }
    setup()
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [handleMotion])
}
