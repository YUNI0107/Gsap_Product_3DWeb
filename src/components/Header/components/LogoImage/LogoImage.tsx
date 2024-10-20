import { cn } from '@utils/style'

import logoImageSrc from '@assets/images/logo/logo-top.png'
import logoTitleImageSrc from '@assets/images/logo/logo-title.png'

function LogoImage({
  className,
  lightMode = false,
}: {
  className?: string
  lightMode?: boolean
}) {
  return (
    <div className={cn('flex flex-col justify-center', className)}>
      <img className="w-full" src={logoImageSrc} alt="logo" />
      <img
        className={cn('w-[80%]', { invert: lightMode })}
        src={logoTitleImageSrc}
        alt="logo-title"
      />
    </div>
  )
}

export default LogoImage
