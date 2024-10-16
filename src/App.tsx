import 'remixicon/fonts/remixicon.css'

import Header from './components/Header'
import MainLayout from './layout/MainLayout/MainLayout'

function App() {
  return (
    <div className="w-full">
      <div className="relative z-50">
        <Header />
        <MainLayout />
      </div>
    </div>
  )
}

export default App
