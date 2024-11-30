import { cn } from '@utils/style'
import { IProduct } from '../ProductCarousel'

const COLOR_MAP: {
  [key: string]: {
    border: string
    title: string
  }
} = {
  blue: {
    border: 'border-blue',
    title: 'text-blue',
  },
  green: {
    border: 'border-green',
    title: 'text-green',
  },
  pink: {
    border: 'border-pink',
    title: 'text-pink',
  },
}

const ProductItems = ({ products }: { products: IProduct[] }) => {
  return (
    <>
      {products.map((product) => (
        <div
          key={product.color}
          className={cn(
            'relative flex h-full w-screen flex-shrink-0 items-center justify-center border-4 border-pink px-5 py-10 md:w-auto md:flex-shrink md:grow',
            COLOR_MAP[product.color].border,
          )}
        >
          <div className="absolute h-full w-full md:hidden" />

          <div className="flex flex-col items-center">
            <div>
              <div className="mb-3 flex flex-col items-center">
                <h3
                  className={cn(
                    'text-2xl font-bold tracking-[.25em] md:text-4xl',
                    COLOR_MAP[product.color].title,
                  )}
                >
                  {product.title}
                </h3>
                <p className="font-amiko tracking-[.25em]">
                  {product.englishTitle}
                </p>
              </div>
            </div>

            <div className="flex">
              <p className="mr-4">{product.description}</p>
              <p className="font-black">
                <span className="mr-1">$</span> {product.price}
              </p>
            </div>

            <div className="w-full max-w-[320px] p-10 pb-0 md:max-w-[420px]">
              <img src={product.image} alt={product.title} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductItems
