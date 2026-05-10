import { useState, useRef } from 'react'
import type { Orb } from '../../types'
import { addOrb } from '../../db/orbDb'
import { detectEmotion, getOrbColors, getOrbSize } from '../../utils/emotion'
import { useOrbStore } from '../../store/useOrbStore'
import { playMaterializeAnim } from './MaterializeAnim'
import './CaptureModal.css'

interface CaptureModalProps {
  onClose: () => void
}

export default function CaptureModal({ onClose }: CaptureModalProps) {
  const [text, setText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeMonth, activeYear, addOrbToCache } = useOrbStore()
  const MAX_CHARS = 200

  async function handleSubmit() {
    if (!text.trim() || isAnimating) return
    setIsAnimating(true)

    const emotion = detectEmotion(text)
    const { color, color2 } = getOrbColors(emotion)
    const size = getOrbSize(text)

    const orbData: Omit<Orb, 'id'> = {
      text: text.trim(),
      createdAt: Date.now(),
      year: activeYear,
      month: activeMonth,
      color,
      color2,
      size,
      emotion,
    }

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
      playMaterializeAnim(canvasRef.current, color, color2, async () => {
        const id = await addOrb(orbData)
        addOrbToCache({ ...orbData, id })
        onClose()
      })
    } else {
      const id = await addOrb(orbData)
      addOrbToCache({ ...orbData, id })
      onClose()
    }
  }

  return (
    <>
      <div className="capture-overlay" onClick={onClose}>
        <div className="capture-sheet" onClick={e => e.stopPropagation()}>
          <p className="capture-title">오늘의 행복한 순간 ✨</p>
          <textarea
            className="capture-textarea"
            placeholder="지금 이 순간 행복했던 일을 적어보세요"
            value={text}
            onChange={e => setText(e.target.value.slice(0, MAX_CHARS))}
            autoFocus
            disabled={isAnimating}
          />
          <p className="capture-char-count">{text.length} / {MAX_CHARS}</p>
          <div className="capture-actions">
            <button className="btn-cancel" onClick={onClose}>취소</button>
            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={!text.trim() || isAnimating}
            >
              행복 담기 ✨
            </button>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="materialize-canvas" />
    </>
  )
}
