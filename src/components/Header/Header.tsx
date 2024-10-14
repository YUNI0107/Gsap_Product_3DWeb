import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import NavbarLinks from './components/NavbarLinks'
import LogoImage from './components/LogoImage'
import MobileNavbar from './components/MobileNavbar/MobileNavbar'

function Header() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex w-full items-center justify-between px-5 py-5 md:px-0">
      <div className="md:ml-10">
        <LogoImage className="w-32 md:w-40" />
      </div>

      <div>
        {/* Hamburger button */}
        <div
          className="cursor-pointer hover:text-primary md:hidden"
          onClick={() => setIsVisible(true)}
        >
          <i className="ri-menu-3-line text-2xl"></i>
        </div>

        <div className="relative hidden pr-10 md:flex">
          <NavbarLinks />
          {/* Navbar Line */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
            className="absolute bottom-1 right-0 h-[1px] w-[calc(100%+30px)] bg-white"
          >
            <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isVisible && <MobileNavbar onClose={() => setIsVisible(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default Header
