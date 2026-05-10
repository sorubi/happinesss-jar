import type { EmotionCategory } from '../types'

const KEYWORDS: Record<EmotionCategory, string[]> = {
  passion: ['도전', '성공', '노력', '인정', '완료', '달성', '목표', '열심', '프로젝트', '결과', '이겼'],
  peace: ['힐링', '산책', '여유', '휴식', '쉬었', '잠', '평온', '조용', '차분', '명상'],
  joy: ['맛집', '친구', '웃음', '재밌', '즐거', '행복', '신났', '좋았', '맛있', '기쁘'],
  gratitude: ['감사', '고마', '사랑', '가족', '엄마', '아빠', '선물', '배려', '따뜻', '응원'],
  excitement: ['설레', '기대', '여행', '새로', '시작', '만남', '처음', '계획', '두근'],
}

// Gradient pairs from Linear Gradient Generator library reference
const GRADIENT_PAIRS: Record<EmotionCategory, { color: string; color2: string }> = {
  passion:    { color: '#F1467A', color2: '#FB949E' },
  peace:      { color: '#47AEA3', color2: '#08B1C5' },
  joy:        { color: '#FFE9D0', color2: '#FD7153' },
  gratitude:  { color: '#7D6AE7', color2: '#56A2D5' },
  excitement: { color: '#FBCA88', color2: '#EF69AD' },
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

  return top[1] > 0 ? top[0] : 'joy'
}

export function getOrbColors(emotion: EmotionCategory): { color: string; color2: string } {
  return GRADIENT_PAIRS[emotion]
}

export function getOrbSize(text: string): number {
  const MIN = 30, MAX = 60
  const ratio = Math.min(1, text.length / 100)
  return Math.round(MIN + (MAX - MIN) * ratio)
}
