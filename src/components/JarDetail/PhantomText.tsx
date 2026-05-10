import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface PhantomTextProps {
  text: string
  onDone: () => void
}

export default function PhantomText({ text, onDone }: PhantomTextProps) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    gsap.fromTo(el,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5, ease: 'power2.out',
        onComplete: () => {
          gsap.to(el, {
            opacity: 0, y: -30,
            duration: 0.8, ease: 'power1.in',
            delay: 1.2,
            onComplete: onDone,
          })
        }
      }
    )
  }, [text, onDone])

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        top: '38%',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '70%',
        textAlign: 'center',
        fontSize: 17,
        fontStyle: 'italic',
        color: 'rgba(226,232,240,0.85)',
        textShadow: '0 0 20px rgba(162,89,255,0.6)',
        pointerEvents: 'none',
        zIndex: 500,
        lineHeight: 1.6,
      }}
    >
      "{text}"
    </div>
  )
}
