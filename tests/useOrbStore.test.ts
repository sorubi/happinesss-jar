import 'fake-indexeddb/auto'
import { describe, it, expect, beforeEach } from 'vitest'
import { useOrbStore } from '../src/store/useOrbStore'

describe('useOrbStore', () => {
  beforeEach(() => {
    useOrbStore.setState({ activeMonth: new Date().getMonth(), activeYear: new Date().getFullYear(), orbs: [] })
  })

  it('initial state has current month and year', () => {
    const { activeMonth, activeYear } = useOrbStore.getState()
    expect(activeMonth).toBe(new Date().getMonth())
    expect(activeYear).toBe(new Date().getFullYear())
  })

  it('setActiveMonth updates month', () => {
    useOrbStore.getState().setActiveMonth(7)
    expect(useOrbStore.getState().activeMonth).toBe(7)
  })

  it('setOrbs replaces orbs list', () => {
    const fake = [{ id: '1', text: 'hi', createdAt: 0, year: 2026, month: 4, color: '#F1467A', color2: '#FB949E', size: 40, emotion: 'joy' as const }]
    useOrbStore.getState().setOrbs(fake)
    expect(useOrbStore.getState().orbs).toHaveLength(1)
  })
})
