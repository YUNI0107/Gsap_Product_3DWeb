import { cn } from '@utils/style'

function LinkItem({
  link,
  active = false,
  lightMode = false,
}: {
  link: {
    title: string
    key: string
  }
  active?: boolean
  lightMode?: boolean
}) {
  return (
    <div
      className={cn('group cursor-pointer px-5 hover:bg-primary md:px-8', {
        'text-black': lightMode,
        ...(active &&
          (lightMode
            ? { 'bg-black text-white': true }
            : { 'bg-white text-black': true })),
      })}
    >
      <p className="font-medium group-hover:text-white">{link.title}</p>
    </div>
  )
}

export default LinkItem
