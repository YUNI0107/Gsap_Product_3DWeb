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
      <div className="fixed top-0 left-0 z-20">
        <Scene />
      </div>

      <div className="fixed z-10 top-0 left-0 w-full h-full bg-black">
        <BackgroundLayout />
      </div>
    </div>
  )
}

export default App
