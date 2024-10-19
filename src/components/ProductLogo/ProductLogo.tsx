import ProductLogoImage from '@assets/images/product-logo.svg?react'
import { cn } from '@utils/style'

function ProductLogo({
  className,
  color,
}: {
  className?: string
  color?: string
}) {
  const fillColor = color || 'var(--color-blue)'

  return (
    <div className={cn('w-24', className)}>
      <ProductLogoImage style={{ color: fillColor }} />
    </div>
  )
}

export default ProductLogo
