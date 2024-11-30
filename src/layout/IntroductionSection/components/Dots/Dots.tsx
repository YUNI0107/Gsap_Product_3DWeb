function Dots({
  points,
  setItemIndex,
  currentIndex,
}: {
  points: number
  setItemIndex: (index: number) => void
  currentIndex: number
}) {
  return (
    <>
      {Array.from({ length: points }).map((_, i) => (
        <div
          key={i}
          onClick={() => setItemIndex(i)}
          className={`mx-1 h-3 w-3 cursor-pointer rounded-full ${
            i === currentIndex ? 'bg-white' : 'bg-charcoal'
          }`}
        />
      ))}
    </>
  )
}

export default Dots
