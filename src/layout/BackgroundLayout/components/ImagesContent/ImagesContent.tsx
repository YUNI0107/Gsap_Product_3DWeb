function ImageContent({ image }: { image: string }) {
  return (
    <div className="opacity-80">
      <img className="h-full w-full overflow-hidden object-cover" src={image} />
    </div>
  )
}

export default ImageContent
