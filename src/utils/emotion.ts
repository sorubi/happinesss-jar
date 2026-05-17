import type { EmotionCategory } from '../types'

const KEYWORDS: Record<EmotionCategory, string[]> = {
  passion:    ['도전', '성공', '노력', '인정', '완료', '달성', '목표', '열심', '프로젝트', '결과', '이겼'],
  peace:      ['힐링', '산책', '여유', '휴식', '쉬었', '잠', '평온', '조용', '차분', '명상'],
  joy:        ['맛집', '친구', '웃음', '재밌', '즐거', '행복', '신났', '좋았', '맛있', '기쁘'],
  gratitude:  ['감사', '고마', '사랑', '가족', '엄마', '아빠', '선물', '배려', '따뜻', '응원'],
  excitement: ['설레', '기대', '여행', '새로', '시작', '만남', '처음', '계획', '두근'],
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return '#' + [f(0), f(8), f(4)]
    .map(x => Math.round(255 * x).toString(16).padStart(2, '0'))
    .join('')
}

// Generate a 3-stop harmonious gradient — hues each 80–130° apart, vivid saturation
export function generateGradientTriple(): { color: string; color2: string; color3: string } {
  const hue1 = Math.floor(Math.random() * 360)
  const sep1 = 80 + Math.floor(Math.random() * 51)    // 80–130°
  const sep2 = 80 + Math.floor(Math.random() * 51)    // 80–130°
  const hue2 = (hue1 + sep1) % 360
  const hue3 = (hue2 + sep2) % 360
  const sat = 78 + Math.floor(Math.random() * 18)      // 78–95%
  const lit1 = 58 + Math.floor(Math.random() * 12)     // 58–69%
  const lit2 = 56 + Math.floor(Math.random() * 14)     // 56–69%
  const lit3 = 54 + Math.floor(Math.random() * 16)     // 54–69%
  return {
    color:  hslToHex(hue1, sat, lit1),
    color2: hslToHex(hue2, sat, lit2),
    color3: hslToHex(hue3, sat, lit3),
  }
}

/** @deprecated use generateGradientTriple */
export function generateGradientPair(): { color: string; color2: string } {
  const { color, color2 } = generateGradientTriple()
  return { color, color2 }
}

export function detectEmotion(text: string): EmotionCategory {
  const scores: Record<EmotionCategory, number> = {
    passion: 0, peace: 0, joy: 0, gratitude: 0, excitement: 0,
  }
  for (const [emotion, keywords] of Object.entries(KEYWORDS) as [EmotionCategory, string[]][]) {
    for (const kw of keywords) {
      if (text.includes(kw)) scores[emotion]++
    }
  }
  const top = (Object.entries(scores) as [EmotionCategory, number][])
    .sort((a, b) => b[1] - a[1])[0]

  if (top[1] > 0) return top[0]
  const all: EmotionCategory[] = ['passion', 'peace', 'joy', 'gratitude', 'excitement']
  return all[Math.floor(Math.random() * all.length)]
}

// Kept for backwards compatibility — color is now generated dynamically per memo
export function getOrbColors(_emotion?: EmotionCategory): { color: string; color2: string; color3: string } {
  return generateGradientTriple()
}

export function getOrbSize(text: string): number {
  const MIN = 30, MAX = 60
  const ratio = Math.min(1, text.length / 100)
  return Math.round(MIN + (MAX - MIN) * ratio)
}
