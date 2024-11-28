import { useMemo, useState } from 'react'
import { cn } from '@utils/style'
import AboutCard from '../AboutCard'
import styles from './style.module.css'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { rescale } from '@utils/math'

import iconA from '@assets/images/about/icon1.png'
import iconB from '@assets/images/about/icon2.png'
import iconC from '@assets/images/about/icon3.png'
import iconD from '@assets/images/about/icon4.png'
import iconE from '@assets/images/about/icon5.png'

const TextContent = ({ text }: { text: string }) => {
  return <p className="text-xs leading-6 md:leading-8">{text}</p>
}

const ListContent = ({
  list,
}: {
  list: Array<{
    title: string
    description: string
  }>
}) => {
  return (
    <div className="mt-4">
      {list.map((item, index) => (
        <div className="mb-4 flex text-xs leading-4 md:leading-8" key={index}>
          <p className="mr-3 flex-shrink-0 text-xs font-bold">{item.title}</p>
          <p className="text-xs">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

function ScrollCardContainer({
  scrollValue,
}: {
  scrollValue: MotionValue<number>
}) {
  const [progress, setProgress] = useState(0)
  const rotateY = useMemo(() => rescale(progress, 0.5, 1, 0, 360), [progress])

  useMotionValueEvent(scrollValue, 'change', (value) => {
    setProgress(value)
  })

  const cardList = [
    {
      icon: iconA,
      children: (
        <ListContent
          list={[
            {
              title: 'CPU',
              description: 'Intel Core i7-11700K',
            },
            {
              title: 'GPU',
              description: 'NVIDIA GeForce RTX 3080',
            },
            {
              title: 'RAM',
              description: '32 GB / 64 GB ',
            },
          ]}
        />
      ),
      background: '#D0CFF5',
    },
    {
      icon: iconB,
      children: (
        <TextContent text="高性能CPUとGPU、多彩なタスクとゲームに優れたパフォーマンスを提供する優れた仕様。" />
      ),
      background: '#D3FFF7',
    },
    {
      icon: iconC,
      children: (
        <TextContent text="購入時、他のコンピュータ周辺機器との互換性があり、さまざまなオプションを選んで利用できる柔軟な設定が可能です。" />
      ),
      background: '#FFEBFF',
    },
    {
      icon: iconD,
      children: (
        <ListContent
          list={[
            {
              title: '高性能',
              description: '最新世代CPUとGPUで驚異的な処理性能。',
            },
            {
              title: '多用途',
              description: 'ゲームやクリエイティブ作業に最適化された仕様。',
            },
          ]}
        />
      ),
      background: '#D0CFF5',
    },
    {
      icon: iconE,
      children: (
        <TextContent text="高品質な冷却システムとカスタマイズ性抜群のデザイン。長時間使用にも安心、ゲームにもクリエイティブにも対応。" />
      ),
      background: '#D3FFF7',
    },
  ]

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden transition-transform duration-1000',
        progress > 0 ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div
        className={cn(
          styles.scrollSlider,
          'absolute left-[calc(50%-120px)] top-28 h-[300px] w-[240px] md:left-[calc(50%-144px)] md:h-[360px] md:w-[288px]',
        )}
        style={
          {
            '--quantity': cardList.length,
            transform: `perspective(2500px) rotateX(-5deg) rotateY(${-rotateY}deg)`,
          } as React.CSSProperties
        }
      >
        {cardList.map((card, index) => (
          <AboutCard
            key={index}
            icon={card.icon}
            index={index}
            background={card.background}
          >
            {card.children}
          </AboutCard>
        ))}
      </div>
    </div>
  )
}

export default ScrollCardContainer
