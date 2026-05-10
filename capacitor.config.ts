import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.sora.happinessjar',
  appName: 'Sora',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
  },
  plugins: {
    Motion: {},
    Haptics: {},
  },
}

export default config
