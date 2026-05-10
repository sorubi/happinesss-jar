import { Haptics, ImpactStyle } from '@capacitor/haptics'

export function useHaptics() {
  async function lightImpact() {
    try { await Haptics.impact({ style: ImpactStyle.Light }) } catch {}
  }

  async function mediumImpact() {
    try { await Haptics.impact({ style: ImpactStyle.Medium }) } catch {}
  }

  async function softImpact() {
    try { await Haptics.impact({ style: ImpactStyle.Medium }) } catch {}
  }

  return { lightImpact, mediumImpact, softImpact }
}
