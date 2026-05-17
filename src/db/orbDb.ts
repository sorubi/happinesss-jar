import Dexie, { type Table } from 'dexie'
import type { Orb } from '../types'

class OrbDatabase extends Dexie {
  orbs!: Table<Orb, string>

  constructor() {
    super('SoraDB')
    this.version(1).stores({
      orbs: 'id, year, month, createdAt',
    })
    this.version(2).stores({
      orbs: 'id, createdAt, [year+month]',
    })
  }
}

export const orbDb = new OrbDatabase()

export async function addOrb(data: Omit<Orb, 'id'>): Promise<string> {
  const id = crypto.randomUUID()
  await orbDb.orbs.add({ ...data, id })
  return id
}

export async function getOrbsByMonth(year: number, month: number): Promise<Orb[]> {
  return orbDb.orbs.where('[year+month]').equals([year, month]).toArray()
}

export async function deleteOrb(id: string): Promise<void> {
  await orbDb.orbs.delete(id)
}

export async function updateOrb(id: string, changes: Partial<Pick<Orb, 'text' | 'color' | 'color2' | 'color3' | 'emotion'>>): Promise<void> {
  await orbDb.orbs.update(id, changes)
}
