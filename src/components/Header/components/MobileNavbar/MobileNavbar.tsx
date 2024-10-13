import NavbarLinks from '../NavbarLinks'
import LogoImage from '../LogoImage'
import ProductLogo from '../../../ProductLogo'

function MobileNavbar({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed left-0 top-0 h-screen w-screen bg-white md:hidden">
      <div className="flex h-full w-full flex-col px-5">
        <div className="flex items-center justify-between py-5">
          <LogoImage className="w-32" lightMode={true} />

          {/* Close Button */}
          <div
            className="h-6 w-6 cursor-pointer text-black hover:text-primary"
            onClick={onClose}
          >
            <i className="ri-close-line text-2xl leading-none"></i>
          </div>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="mb-4 flex flex-grow flex-col items-center justify-center">
            <NavbarLinks lightMode={true} />
          </div>

          {/* Mobile Bottom */}
          <div className="flex flex-col items-center">
            <ProductLogo className="mb-4" />

            {/* Navbar Line */}
            <div className="relative h-40 w-[2px] bg-black">
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNavbar
