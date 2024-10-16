import { cn } from '@utils/style'

function LinkItem({
  link,
  active = false,
  lightMode = false,
  onClick,
}: {
  link: {
    title: string
    key: string
    href: string
  }
  active?: boolean
  lightMode?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn('group cursor-pointer px-5 py-1 hover:bg-primary md:px-8', {
        'text-black': lightMode,
        ...(active &&
          (lightMode
            ? { 'bg-black text-white': true }
            : { 'bg-white text-black': true })),
      })}
    >
      <a href={`#${link.href}`}>
        <p className="font-medium group-hover:text-white">{link.title}</p>
      </a>
    </div>
  )
}

export default LinkItem
