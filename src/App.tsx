import { useState } from 'react'
import './App.css'
import MainShelf from './components/MainShelf/MainShelf'
import JarDetail from './components/JarDetail/JarDetail'
import CaptureModal from './components/CaptureModal/CaptureModal'
import FAB from './components/FAB/FAB'
import { useOrbStore } from './store/useOrbStore'

type View = 'shelf' | 'detail'

export default function App() {
  const [view, setView] = useState<View>('shelf')
  const [showCapture, setShowCapture] = useState(false)
  const { activeMonth, activeYear } = useOrbStore()

  const now = new Date()
  const isCurrent = activeMonth === now.getMonth() && activeYear === now.getFullYear()

  return (
    <>
      {view === 'shelf' && (
        <>
          <MainShelf onJarSelect={() => setView('detail')} />
          {isCurrent && <FAB onClick={() => setShowCapture(true)} />}
        </>
      )}

      {view === 'detail' && (
        <JarDetail
          month={activeMonth}
          year={activeYear}
          onBack={() => setView('shelf')}
          onCapture={() => setShowCapture(true)}
        />
      )}

      {showCapture && (
        <CaptureModal onClose={() => setShowCapture(false)} />
      )}
    </>
  )
}
