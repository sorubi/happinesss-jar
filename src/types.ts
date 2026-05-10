export type EmotionCategory = 'passion' | 'peace' | 'joy' | 'gratitude' | 'excitement'

export interface Orb {
  id: string
  text: string
  createdAt: number   // Unix ms timestamp
  year: number
  month: number       // 0-11
  color: string       // gradient start hex, e.g. '#F1467A'
  color2: string      // gradient end hex, e.g. '#FB949E'
  size: number        // 30-60 (px radius)
  emotion: EmotionCategory
}

// Physics 시뮬레이션용 — Matter.js body와 함께 쓰는 런타임 타입
export interface PhysicsOrb {
  id: string
  color: string       // gradient start hex
  color2: string      // gradient end hex
  radius: number
  x: number
  y: number
}

export interface JarGeometry {
  cx: number        // 병 중심 x
  cy: number        // 병 body 중심 y
  bodyW: number     // 병 몸통 너비
  bodyH: number     // 병 몸통 높이
  neckW: number     // 목 너비
  neckH: number     // 목 높이
}

export interface MonthJar {
  month: number     // 0-11
  year: number
  orbs: Orb[]
  state: 'current' | 'past' | 'future'
}
