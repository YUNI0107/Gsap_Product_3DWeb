import { THEME_TYPE } from '@constants/theme'
import useStore from '@store/useStore'
import { cn } from '@utils/style'
import ProductLogo from '../../components/ProductLogo'

function AboutSection() {
  const theme = useStore((state) => state.currentTheme)

  return (
    <>
      <div
        className="relative mx-auto w-full max-w-80 -translate-y-1/2 md:w-80"
        style={{ paddingBottom: 'min(100%, 288px)' }}
      >
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-white from-50% to-secondary',
            {
              'drop-shadow-blue': theme === THEME_TYPE.BLUE,
              'drop-shadow-pink': theme === THEME_TYPE.PINK,
              'drop-shadow-green': theme === THEME_TYPE.GREEN,
            },
          )}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            <ProductLogo
              className="mb:w-auto mb-2 w-24"
              color={`var(--color-${theme})`}
            />
            <p className="text-center text-xs font-bold text-black md:text-sm">
              ネットワーク全体で
              <br />
              最高速の
              <br />
              パフォーマンスに挑戦
            </p>
          </div>
        </div>
        <div className="border-gradient pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </>
  )
}

export default AboutSection
