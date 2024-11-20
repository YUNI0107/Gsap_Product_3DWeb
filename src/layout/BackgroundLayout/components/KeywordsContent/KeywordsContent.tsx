function KeywordsContent({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="px-3">
      <h1 className="text-5xl">{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default KeywordsContent
