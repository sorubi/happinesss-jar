import { create } from 'zustand'
import type { Orb } from '../types'

interface OrbStore {
  activeMonth: number
  activeYear: number
  orbs: Orb[]
  phantomText: string | null
  setActiveMonth: (month: number) => void
  setActiveYear: (year: number) => void
  setOrbs: (orbs: Orb[]) => void
  addOrbToCache: (orb: Orb) => void
  removeOrbFromCache: (id: string) => void
  setPhantomText: (text: string | null) => void
}

const now = new Date()

export const useOrbStore = create<OrbStore>((set) => ({
  activeMonth: now.getMonth(),
  activeYear: now.getFullYear(),
  orbs: [],
  phantomText: null,
  setActiveMonth: (month) => set({ activeMonth: month }),
  setActiveYear: (year) => set({ activeYear: year }),
  setOrbs: (orbs) => set({ orbs }),
  addOrbToCache: (orb) => set((s) => ({ orbs: [...s.orbs, orb] })),
  removeOrbFromCache: (id) => set((s) => ({ orbs: s.orbs.filter(o => o.id !== id) })),
  setPhantomText: (text) => set({ phantomText: text }),
}))
