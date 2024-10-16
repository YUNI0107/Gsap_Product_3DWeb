import AboveLayout from '../AboveLayout'
import BackgroundLayout from '../BackgroundLayout'
import ContactSection from '../ContactSection'
import IntroductionSection from '../IntroductionSection'
import Scene from '../Scene'

function MainLayout() {
  return (
    <>
      {/* section: landing & about (with canvas) */}
      <div className="relative h-full">
        <AboveLayout />
        {/* Canvas */}
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
