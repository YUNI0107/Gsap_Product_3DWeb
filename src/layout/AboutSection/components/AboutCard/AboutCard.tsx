import { cn } from '@utils/style'
import styles from '../ScrollCardContainer/style.module.css'

console.log(styles)

function AboutCard({
  children,
  icon,
  index,
  background,
}: {
  children: React.ReactNode
  icon: string
  index: number
  background: string
}) {
  return (
    <>
      <div
        className={cn(
          'flex flex-col rounded-lg bg-white p-5 text-black md:p-10',
          styles.scrollItem,
          styles.front,
        )}
        style={
          {
            '--position': index,
            background: `linear-gradient(to right, ${background}, #FFFFFF)`,
          } as React.CSSProperties
        }
      >
        <div className="flex basis-1/2 items-center justify-center">
          <div className="w-20 md:w-28">
            <img className="h-full w-full object-cover" src={icon} alt="icon" />
          </div>
        </div>
        <div className="basis-1/2">{children}</div>
      </div>

      <div
        className={cn(
          'rounded-lg brightness-50',
          styles.scrollItem,
          styles.back,
        )}
        style={
          {
            '--position': index,
            background,
          } as React.CSSProperties
        }
      />
    </>
  )
}

export default AboutCard
