import { useState, useRef, useEffect, useCallback } from 'react'
import type { Orb } from '../../types'

import { useOrbStore } from '../../store/useOrbStore'
import { getOrbsByMonth } from '../../db/orbDb'
import { useWindowSize } from '../../hooks/useWindowSize'
import JarCanvas, { type JarCanvasRef } from '../JarCanvas/JarCanvas'
import PhantomText from './PhantomText'
import { useShake } from './useShake'

interface JarDetailProps {
  month: number
  year: number
  onBack: () => void
  onCapture: () => void
}

const MONTH_LABELS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']

export default function JarDetail({ month, year, onBack, onCapture }: JarDetailProps) {
  const { setOrbs, orbs } = useOrbStore()
  const [phantomText, setPhantomText] = useState<string | null>(null)
  const jarRef = useRef<JarCanvasRef>(null)
  const { W, H } = useWindowSize()

  const now = new Date()
  const isCurrent = month === now.getMonth() && year === now.getFullYear()

  useEffect(() => {
    getOrbsByMonth(year, month).then(loaded => {
      setOrbs(loaded)
    })
  }, [month, year, setOrbs])

  const handleShake = useCallback(() => {
    jarRef.current?.shake()
    if (orbs.length > 0) {
      const orb = orbs[Math.floor(Math.random() * orbs.length)]
      setPhantomText(orb.text)
    }
  }, [orbs])

  useShake({ onShake: handleShake })

  const handleOrbTap = useCallback((orb: Orb) => {
    setPhantomText(orb.text)
  }, [])

  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden' }}>

      <button
        onClick={onBack}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 100,
          background: 'rgba(148,163,184,0.12)',
          border: '1px solid var(--border-glass)',
          color: 'var(--text-primary)',
          padding: '8px 14px',
          borderRadius: 20, fontSize: 13,
        }}
      >
        ← 선반
      </button>

      <div style={{
        position: 'fixed', top: 22, left: '50%', transform: 'translateX(-50%)',
        fontSize: 14, color: 'var(--text-secondary)', zIndex: 100,
      }}>
        {year}년 {MONTH_LABELS[month]}
      </div>

      <div style={{
        position: 'fixed', top: 22, right: 20, zIndex: 100,
        fontSize: 13, color: 'var(--text-secondary)',
      }}>
        {orbs.length}개
      </div>

      <JarCanvas
        ref={jarRef}
        orbs={orbs}
        width={W}
        height={H}
        onOrbTap={handleOrbTap}
      />

      {phantomText && (
        <PhantomText
          key={phantomText + Date.now()}
          text={phantomText}
          onDone={() => setPhantomText(null)}
        />
      )}

      {orbs.length > 0 && (
        <div style={{
          position: 'fixed', bottom: 44, left: '50%', transform: 'translateX(-50%)',
          fontSize: 11, color: 'rgba(226,232,240,0.3)', whiteSpace: 'nowrap',
        }}>
          흔들면 구슬이 섞여요
        </div>
      )}

      {isCurrent && (
        <button
          onClick={onCapture}
          style={{
            position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #A259FF 0%, #FF6B9D 100%)',
            boxShadow: '0 0 24px rgba(162,89,255,0.5)',
            fontSize: 28, color: '#fff', zIndex: 100,
          }}
        >
          +
        </button>
      )}

      <div style={{
        position: 'fixed', bottom: 20, left: 22,
        fontSize: 13, color: 'rgba(226,232,240,0.5)',
      }}>
        ● Sora
      </div>
    </div>
  )
}
