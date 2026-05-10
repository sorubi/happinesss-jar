import Dexie, { type Table } from 'dexie'
import type { Orb } from '../types'

class OrbDatabase extends Dexie {
  orbs!: Table<Orb, string>

  constructor() {
    super('SoraDB')
    this.version(1).stores({
      orbs: 'id, year, month, createdAt',
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
  return orbDb.orbs.where({ year, month }).toArray()
}

export async function deleteOrb(id: string): Promise<void> {
  await orbDb.orbs.delete(id)
}

export async function updateOrb(id: string, changes: Partial<Pick<Orb, 'text' | 'color' | 'color2' | 'emotion'>>): Promise<void> {
  await orbDb.orbs.update(id, changes)
}
