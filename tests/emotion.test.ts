import { describe, it, expect } from 'vitest'
import { detectEmotion, getOrbColors, getOrbSize } from '../src/utils/emotion'

describe('detectEmotion', () => {
  it('detects joy keywords', () => {
    expect(detectEmotion('친구랑 맛집 다녀왔다 웃음꽃')).toBe('joy')
  })
  it('detects passion keywords', () => {
    expect(detectEmotion('프로젝트 완료! 드디어 성공했다')).toBe('passion')
  })
  it('detects peace keywords', () => {
    expect(detectEmotion('산책하며 힐링했다 여유로운 하루')).toBe('peace')
  })
  it('detects gratitude keywords', () => {
    expect(detectEmotion('엄마한테 선물 받았다 감사해')).toBe('gratitude')
  })
  it('detects excitement keywords', () => {
    expect(detectEmotion('여행 계획 세웠다 설레는 마음')).toBe('excitement')
  })
  it('returns joy as default for unknown text', () => {
    expect(detectEmotion('오늘 뭔가 좋았다')).toBe('joy')
  })
})

describe('getOrbColors', () => {
  it('returns gradient pair for each emotion', () => {
    const p = getOrbColors('passion')
    expect(p.color).toBe('#F1467A')
    expect(p.color2).toBe('#FB949E')

    const pe = getOrbColors('peace')
    expect(pe.color).toBe('#47AEA3')
    expect(pe.color2).toBe('#08B1C5')

    const j = getOrbColors('joy')
    expect(j.color).toBe('#FFE9D0')
    expect(j.color2).toBe('#FD7153')

    const g = getOrbColors('gratitude')
    expect(g.color).toBe('#7D6AE7')
    expect(g.color2).toBe('#56A2D5')

    const e = getOrbColors('excitement')
    expect(e.color).toBe('#FBCA88')
    expect(e.color2).toBe('#EF69AD')
  })
})

describe('getOrbSize', () => {
  it('short text returns smaller orb', () => {
    expect(getOrbSize('짧은 글')).toBeLessThan(getOrbSize('좀 더 긴 텍스트로 오늘 있었던 일을 써보겠습니다'))
  })
  it('size is within 30-60 range', () => {
    const s1 = getOrbSize('')
    const s2 = getOrbSize('a'.repeat(200))
    expect(s1).toBeGreaterThanOrEqual(30)
    expect(s2).toBeLessThanOrEqual(60)
  })
})
