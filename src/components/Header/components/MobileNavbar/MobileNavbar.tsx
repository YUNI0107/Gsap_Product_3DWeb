import { motion } from 'framer-motion'

import NavbarLinks from '../NavbarLinks'
import LogoImage from '../LogoImage'
import ProductLogo from '../../../ProductLogo'

function MobileNavbar({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      className="fixed left-0 top-0 h-screen w-screen origin-top bg-white md:hidden"
    >
      <div className="flex h-full w-full flex-col px-5">
        <div className="flex items-center justify-between py-5">
          <LogoImage className="w-32" lightMode={true} />

          {/* Close Button */}
          <motion.div
            className="h-6 w-6 cursor-pointer text-black hover:text-primary"
            onClick={onClose}
            whileHover={{ scale: 1.2 }}
          >
            <i className="ri-close-line text-2xl leading-none"></i>
          </motion.div>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="mb-4 flex flex-grow flex-col items-center justify-center">
            <NavbarLinks lightMode={true} />
          </div>

          {/* Mobile Bottom */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <ProductLogo className="mb-4" />
            </motion.div>

            {/* Navbar Line */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: 0.2,
                ease: 'easeOut',
              }}
              className="relative h-40 w-[1px] bg-black"
            >
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MobileNavbar
