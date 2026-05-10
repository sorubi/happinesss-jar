import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({ W: window.innerWidth, H: window.innerHeight })

  useEffect(() => {
    const handler = () => setSize({ W: window.innerWidth, H: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}
