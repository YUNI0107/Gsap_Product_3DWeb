import ProductLogoImage from '@assets/images/product-logo.svg?react'
import { cn } from '@utils/style'

function ProductLogo({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <ProductLogoImage />
    </div>
  )
}

export default ProductLogo
