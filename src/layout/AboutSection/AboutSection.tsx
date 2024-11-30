import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import { THEME_TYPE } from '@constants/theme'
import useStore from '@store/useStore'
import { cn } from '@utils/style'
import ProductLogo from '../../components/ProductLogo'
import ScrollCardContainer from './components/ScrollCardContainer'

function AboutSection() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const theme = useStore((state) => state.currentTheme)

  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: cardsRef,
    offset: ['start center', 'end end'],
  })

  return (
    <div className="relative h-[300vh]">
      <div
        className="absolute left-1/2 mx-auto w-full max-w-80 -translate-x-1/2 -translate-y-1/2 md:w-80"
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

      <div className="relative h-full w-full">
        <div className="absolute left-0 top-0 w-full">
          <div className="hello flex h-[100vh] w-full flex-col items-center justify-center px-5">
            <h1 className="font-amiko mb-4 bg-gradient-to-b from-white to-charcoal bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl">
              About Sokuseki-ki
            </h1>
            <h3 className="text-center text-secondary">
              なぜ『速星機』このデスクトップコンピュータを購入すべきですか？
            </h3>
          </div>

          <div ref={cardsRef} className="hello h-[200vh] w-full" />
        </div>

        <div className="sticky top-0 h-[100vh] w-full">
          <ScrollCardContainer scrollValue={aboutScrollProgress} />
        </div>
      </div>
    </div>
  )
}

export default AboutSection
