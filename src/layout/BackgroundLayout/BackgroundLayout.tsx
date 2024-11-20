import { useEffect, useRef, useState, RefObject } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useShallow } from 'zustand/shallow'
import useStore from '@store/useStore'
import { SECTION_TYPE } from '@constants/section'
import AnimSliderSection, {
  ISliderItem,
} from '../../components/AnimSliderSection'
import { imagesContent, keywordsContent } from '@constants/content'
import KeywordsContent from './components/KeywordsContent'
import ImageContent from './components/ImagesContent'

const generateSectionRanges = (
  landingRef: RefObject<HTMLDivElement>,
  transitionRef: RefObject<HTMLDivElement>,
  aboutRef: RefObject<HTMLDivElement>,
) => {
  if (!(landingRef.current && transitionRef.current && aboutRef.current)) {
    return [0, 1]
  }
  const landingRect = landingRef.current.getBoundingClientRect()
  const transitionRect = transitionRef.current.getBoundingClientRect()
  const aboutRect = aboutRef.current.getBoundingClientRect()

  const shift = landingRect.height * 0.5
  const landingBottom = landingRect.height - shift
  const transitionBottom = landingBottom + shift + transitionRect.height
  const aboutBottom = transitionBottom + aboutRect.height
  const sectionRanges = [landingBottom, transitionBottom, aboutBottom]

  return sectionRanges
}

function BackgroundLayout() {
  const { currentSection, updateSection, updateScroll } = useStore(
    useShallow((state) => ({
      currentSection: state.section,
      updateSection: state.updateSection,
      updateScroll: state.updateTransitionScrollY,
    })),
  )

  const landingRef = useRef<HTMLDivElement>(null)
  const transitionRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [sectionRanges, setSectionRanges] = useState([0, 1])

  const { scrollY: pageScrollY } = useScroll()
  useMotionValueEvent(pageScrollY, 'change', (scrollY) => {
    const index = sectionRanges.findIndex((range) => {
      return scrollY <= range
    })

    const section = Object.values(SECTION_TYPE)[index]
    if (section && section !== currentSection) {
      updateSection(section)
    }
  })

  const { scrollYProgress: transitionProgress } = useScroll({
    target: transitionRef,
  })
  useMotionValueEvent(transitionProgress, 'change', (progress) => {
    if (currentSection === SECTION_TYPE.TRANSITION) {
      updateScroll(progress)
    }
  })

  // AnimSlider items
  const keywordsSliderItems: ISliderItem[] = keywordsContent.map((content) => ({
    content: (
      <KeywordsContent
        title={content.title}
        description={content.description}
      />
    ),
  }))

  const imageSliderItems: ISliderItem[] = imagesContent.map((content) => ({
    content: <ImageContent image={content.src} />,
  }))

  useEffect(() => {
    const ranges = generateSectionRanges(landingRef, transitionRef, aboutRef)
    setSectionRanges(ranges)
  }, [])

  useEffect(() => {
    const resetSectionRanges = () => {
      const ranges = generateSectionRanges(landingRef, transitionRef, aboutRef)
      setSectionRanges(ranges)
    }

    window.addEventListener('resize', resetSectionRanges)
    return () => window.removeEventListener('resize', resetSectionRanges)
  }, [])

  return (
    <>
      <section
        id="landing"
        className="mt-[-100vh] h-[250vh] bg-bgPrimary transition-colors duration-500"
      >
        <div ref={landingRef} className="h-1/3 w-full" />
        <div ref={transitionRef} className="relative h-2/3 w-full">
          <AnimSliderSection
            containerClassName="absolute top-1/3"
            items={keywordsSliderItems}
            variables={{
              duration: '20s',
              width: '180px',
              height: '80px',
            }}
          />
          <AnimSliderSection
            containerClassName="absolute top-2/3"
            items={imageSliderItems}
            variables={{
              duration: '30s',
              width: '280px',
              height: '120px',
            }}
          />
        </div>
      </section>

      <section
        id="about"
        ref={aboutRef}
        className="relative -mt-1 h-[300vh] overflow-hidden bg-bgPrimary"
      >
        {/* circle */}
        <div className="w-full origin-top translate-y-[0%] scale-150 pb-[100%]">
          {/* <div className="absolute top-0 w-full translate-y-[50%] scale-150 pb-[100%]"> */}
          <div className="absolute top-0 h-full w-full rounded-full bg-black"></div>
        </div>

        {/* rectangle */}
        <div className="absolute top-0 h-full w-full translate-y-[50vw] bg-black" />
      </section>
    </>
  )
}

export default BackgroundLayout
