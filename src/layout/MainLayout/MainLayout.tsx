import ContactSection from '../ContactSection'
import IntroductionSection from '../IntroductionSection'
import AboutSection from '../AboutSection'
import LandingSection from '../LandingSection'
import BackgroundLayout from '../BackgroundLayout'
import Scene from '../Scene'

function MainLayout() {
  return (
    <>
      {/* section: landing & about (with canvas) */}
      <div className="min-w-screen relative h-full">
        {/*  pointer-events-none only on landing section */}
        <div className="pointer-events-none absolute left-0 top-0 z-30 w-full">
          <LandingSection />
          <AboutSection />
        </div>

        {/* canvas */}
        <div className="sticky left-0 top-0 z-20 h-screen w-screen">
          <Scene />
        </div>
        <BackgroundLayout />
      </div>

      {/* section: introduction */}
      <IntroductionSection />
      {/* section: contact us */}
      <ContactSection />
    </>
  )
}

export default MainLayout
