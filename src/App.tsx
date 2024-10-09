import Scene from './layout/Scene'

// layout
import AboveLayout from './layout/AboveLayout'
import BackgroundLayout from './layout/BackgroundLayout'

function App() {
  return (
    <div className="w-full">
      <div className="relative z-50">
        <AboveLayout />
      </div>
      <div className="fixed left-0 top-0 z-20">
        <Scene />
      </div>

      <div className="fixed left-0 top-0 z-10 h-full w-full bg-black">
        <BackgroundLayout />
      </div>
    </div>
  )
}

export default App
