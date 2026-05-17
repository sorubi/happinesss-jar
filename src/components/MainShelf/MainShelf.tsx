import { useEffect, useRef } from 'react'
import type { Orb, MonthJar } from '../../types'
import { useOrbStore } from '../../store/useOrbStore'
import { getOrbsByMonth } from '../../db/orbDb'
import JarThumb from './JarThumb'
import './MainShelf.css'

const MONTH_LABELS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']

interface MainShelfProps {
  onJarSelect: (month: number) => void
}

export default function MainShelf({ onJarSelect }: MainShelfProps) {
  const { activeMonth, activeYear, orbs, setOrbs, setActiveMonth } = useOrbStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getOrbsByMonth(activeYear, activeMonth).then(setOrbs)
  }, [activeMonth, activeYear, setOrbs])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const item = el.children[activeMonth] as HTMLElement
    if (item) {
      item.scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' })
    }
  }, [])

  const now = new Date()

  return (
    <div className="main-shelf">
      <div className="shelf-scroll" ref={scrollRef}>
        {Array.from({ length: 12 }, (_, i) => {
          const isActive = i === activeMonth
          const isFuture = activeYear === now.getFullYear() && i > now.getMonth()
          const monthOrbs: Orb[] = isActive ? orbs : []

          return (
            <div
              key={i}
              className={`shelf-item ${isActive ? 'active' : ''} ${isFuture ? 'future' : ''}`}
              onClick={() => {
                if (isFuture) return
                setActiveMonth(i)
                onJarSelect(i)
              }}
            >
              <JarThumb orbs={monthOrbs} isActive={isActive} isFuture={isFuture} />
              <span className="shelf-item-label">{MONTH_LABELS[i]}</span>
            </div>
          )
        })}
      </div>

    </div>
  )
}
