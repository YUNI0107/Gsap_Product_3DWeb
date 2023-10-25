import style from './App.module.css'
import ThreeScene from './scene/ThreeScene'

// layout
import AboveLayout from './layout/AboveLayout'
import BackgroundLayout from './layout/BackgroundLayout'

function App() {
  return (
    <div className={style.root}>
      <div className={style['above-layout']}>
        <AboveLayout />
      </div>
      <div className={style['three-scene']}>
        <ThreeScene />
      </div>

      <div className={style['background-layout']}>
        <BackgroundLayout />
      </div>
    </div>
  )
}

export default App
