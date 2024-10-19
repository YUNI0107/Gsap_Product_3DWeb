import 'remixicon/fonts/remixicon.css'
import useStore from './store/useStore'

import Header from './components/Header'
import MainLayout from './layout/MainLayout/MainLayout'
import { cn } from '@utils/style'

function App() {
  const currentTheme = useStore((state) => state.currentTheme)

  return (
    <div className={cn('w-full', `theme-${currentTheme}`)}>
      <div className="relative z-50">
        <Header />
        <MainLayout />
      </div>
    </div>
  )
}

export default App
