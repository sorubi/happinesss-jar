import { useEffect, useRef, useCallback, useState } from 'react'

interface UseShakeOptions {
  threshold?: number
  cooldown?: number
  onShake: () => void
}

export function useShake({ threshold = 25, cooldown = 800, onShake }: UseShakeOptions) {
  const lastShakeTime = useRef(0)
  const lastAccel = useRef({ x: 0, y: 0, z: 0 })
  const [needsPermission, setNeedsPermission] = useState(false)

  const fire = useCallback(() => {
    const now = Date.now()
    if (now - lastShakeTime.current > cooldown) {
      lastShakeTime.current = now
      onShake()
    }
  }, [cooldown, onShake])

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
    if (delta > threshold) fire()
  }, [threshold, fire])

  // Device motion setup (non-iOS auto, iOS deferred until permission granted)
  useEffect(() => {
    const needsReq = typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    if (needsReq) {
      setNeedsPermission(true)
      return
    }
    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [handleMotion])

  // Spacebar fallback for desktop
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat) return
      e.preventDefault()
      fire()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [fire])

  // Must be called from a user gesture on iOS
  const requestPermission = useCallback(async () => {
    try {
      const perm = await (DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
      if (perm === 'granted') {
        setNeedsPermission(false)
        window.addEventListener('devicemotion', handleMotion)
      }
    } catch {}
  }, [handleMotion])

  return { needsPermission, requestPermission }
}
