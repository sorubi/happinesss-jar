import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach } from 'vitest'
import { orbDb, addOrb, getOrbsByMonth, deleteOrb } from '../src/db/orbDb'
import type { Orb } from '../src/types'

const mockOrb = (): Omit<Orb, 'id'> => ({
  text: '오늘 커피가 맛있었다',
  createdAt: Date.now(),
  year: 2026,
  month: 4,
  color: '#F1467A',
  color2: '#FB949E',
  size: 40,
  emotion: 'joy',
})

describe('orbDb', () => {
  beforeEach(async () => {
    await orbDb.orbs.clear()
  })

  it('addOrb stores an orb and returns generated id', async () => {
    const id = await addOrb(mockOrb())
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('getOrbsByMonth returns orbs for that month only', async () => {
    await addOrb({ ...mockOrb(), month: 4 })
    await addOrb({ ...mockOrb(), month: 4 })
    await addOrb({ ...mockOrb(), month: 7 })
    const result = await getOrbsByMonth(2026, 4)
    expect(result).toHaveLength(2)
    result.forEach(o => expect(o.month).toBe(4))
  })

  it('deleteOrb removes the orb', async () => {
    const id = await addOrb(mockOrb())
    await deleteOrb(id)
    const result = await getOrbsByMonth(2026, 4)
    expect(result).toHaveLength(0)
  })
})
