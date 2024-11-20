/* Infinite Slider Animation
Reference: https://youtu.be/mF9yOwlunWk?si=V6579Ifhbd9IeWHY */

import { cn } from '@utils/style'
import './style.css'

export interface ISliderItem {
  content: JSX.Element
  key?: string
}

const SliderItem = ({
  content,
  position,
}: {
  content: JSX.Element
  position: number
}) => {
  return (
    <div
      className="item"
      style={{ '--position': position } as React.CSSProperties}
    >
      {content}
    </div>
  )
}

function AnimSliderSection({
  items,
  containerClassName,
  variables,
}: {
  items: ISliderItem[]
  containerClassName?: string
  variables: {
    duration: string
    width: string
    height: string
  }
}) {
  return (
    <div
      className={cn(
        containerClassName,
        'slider-container flex w-full overflow-hidden',
      )}
      style={
        {
          '--duration': variables.duration,
          '--width': variables.width,
          '--height': variables.height,
          '--quantity': items.length,
        } as React.CSSProperties
      }
    >
      <div className="slider">
        {items.map((item, index) => (
          <SliderItem
            key={item.key || index}
            position={index}
            content={item.content}
          />
        ))}
      </div>
    </div>
  )
}

export default AnimSliderSection
