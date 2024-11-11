import { motion } from 'framer-motion'
import { cn } from '@utils/style'
import { THEME_TYPE, landingThemeContent } from '@constants/theme'
import useStore from '@store/useStore'

const landingOrder = [THEME_TYPE.BLUE, THEME_TYPE.GREEN, THEME_TYPE.PINK]

function LandingSection() {
  const theme = useStore((state) => state.currentTheme)
  const updateThemeType = useStore((state) => state.updateThemeType)
  const content = landingThemeContent[theme]

  const handleUpdateTheme = (direction: 'prev' | 'next') => {
    const currentThemeIndex = landingOrder.indexOf(theme)
    let nextThemeIndex = currentThemeIndex

    if (direction === 'prev') {
      if (currentThemeIndex - 1 < 0) {
        nextThemeIndex = landingOrder.length - 1
      } else {
        nextThemeIndex = currentThemeIndex - 1
      }
    } else if (direction === 'next') {
      if (currentThemeIndex + 1 > landingOrder.length - 1) {
        nextThemeIndex = 0
      } else {
        nextThemeIndex = currentThemeIndex + 1
      }
    }

    updateThemeType(landingOrder[nextThemeIndex])
  }

  return (
    <>
      {/* top landing  */}
      <div className="flex h-screen items-end justify-center">
        <div className="mb-10 flex flex-col items-center md:landscape:mb-5">
          <motion.div
            className="w-72 md:mb-2 lg:mb-8 lg:w-96 portrait:mb-10 portrait:w-72"
            key={theme}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <img
              className={cn({
                'drop-shadow-blue': theme === THEME_TYPE.BLUE,
                'drop-shadow-pink': theme === THEME_TYPE.PINK,
                'drop-shadow-green': theme === THEME_TYPE.GREEN,
              })}
              src={content.image}
            />
          </motion.div>

          <div className="pointer-events-auto flex items-center justify-center md:min-w-[700px]">
            <button
              className="text-primary transition-all hover:scale-110 hover:text-hover"
              onClick={() => handleUpdateTheme('prev')}
            >
              <i className="ri-arrow-left-double-line text-5xl"></i>
            </button>

            <p className="mx-2 flex-1 text-center md:mx-5">{content.title}</p>

            <button
              className="text-primary transition-all hover:scale-110 hover:text-hover"
              onClick={() => handleUpdateTheme('next')}
            >
              <i className="ri-arrow-right-double-fill text-5xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* rotate transition  */}
      <div className="h-[200vh]"></div>
    </>
  )
}

export default LandingSection
