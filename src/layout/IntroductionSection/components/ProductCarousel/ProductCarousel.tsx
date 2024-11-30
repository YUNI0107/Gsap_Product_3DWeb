import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import ProductItems from '../ProductItems'
import Dots from '../Dots'

export interface IProduct {
  color: string
  title: string
  englishTitle: string
  price: number
  image: string
  description: string
}

const DRAG_BUFFER = 50
const AUTO_DELAY = 1500

/**
 * Draggable Carousel with React and Framer Motion
 * Reference: https://www.hover.dev/components/carousels
 */

function ProductCarousel({ products }: { products: IProduct[] }) {
  const [itemIndex, setItemIndex] = useState(0)
  const [drag, setDrag] = useState<boolean | 'x' | 'y'>('x')
  const [duration, setDuration] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const timer = useRef<number | null>(null)
  const dragX = useMotionValue(0)

  const onDragEnd = () => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && itemIndex < products.length - 1) {
      setItemIndex((pv) => pv + 1)
    } else if (x >= DRAG_BUFFER && itemIndex > 0) {
      setItemIndex((pv) => pv - 1)
    }
  }

  useEffect(() => {
    if (isTimerActive) {
      if (!timer.current) {
        timer.current = setInterval(() => {
          const x = dragX.get()
          if (x === 0) {
            setItemIndex((prev) =>
              prev === products.length - 1 ? 0 : prev + 1,
            )
          }
        }, AUTO_DELAY)
      }
    } else {
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = null
      }
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current)
        timer.current = null
      }
    }
  }, [dragX, products, isTimerActive])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setDrag(e.matches ? 'x' : false)
      setDuration(e.matches ? 0.5 : 0)
      setIsTimerActive(e.matches)
      if (!e.matches) setItemIndex(0)
    }

    handleMediaChange(mediaQuery)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  })

  return (
    <>
      <div className="relative h-full overflow-hidden">
        <motion.div
          drag={drag}
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${itemIndex * 100}%`,
          }}
          transition={{
            duration,
            type: 'spring',
            stiffness: 120,
            damping: 20,
          }}
          onDragEnd={onDragEnd}
          className="flex h-full cursor-grab active:cursor-grabbing md:cursor-auto md:active:cursor-auto"
        >
          <ProductItems products={products} />
        </motion.div>

        <div className="absolute bottom-10 left-1/2 flex md:hidden">
          <Dots
            currentIndex={itemIndex}
            setItemIndex={setItemIndex}
            points={products.length}
          />
        </div>
      </div>
    </>
  )
}

export default ProductCarousel
