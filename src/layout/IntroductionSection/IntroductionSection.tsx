import ProductCarousel, { IProduct } from './components/ProductCarousel'

// images
import blueImage from '@assets/images/carousel/blue.png'
import greenImage from '@assets/images/carousel/green.png'
import pinkImage from '@assets/images/carousel/pink.png'

const products: IProduct[] = [
  {
    color: 'blue',
    title: '蒼碧藍',
    englishTitle: 'TEAL BLUE',
    price: 25000,
    description: '32 GB / 64 GB ',
    image: blueImage,
  },
  {
    color: 'green',
    title: '碧綠海',
    englishTitle: 'TURQUOISE',
    price: 28000,
    description: '32 GB / 64 GB ',
    image: greenImage,
  },
  {
    color: 'pink',
    title: '桃花粉',
    englishTitle: 'PEACH PINK',
    price: 30000,
    description: '32 GB / 64 GB ',
    image: pinkImage,
  },
]

function IntroductionSection() {
  return (
    <section
      id="introduction"
      className="w-full snap-center bg-black md:aspect-[2/1]"
    >
      <ProductCarousel products={products} />
    </section>
  )
}

export default IntroductionSection
