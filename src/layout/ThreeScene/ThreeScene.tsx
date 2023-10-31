import { useRef, useEffect } from 'react'
import Experience from '../../experience/Experience'

function ThreeScene() {
  const containerRef = useRef<HTMLCanvasElement | null>(null)
  const experienceRef = useRef<Experience | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      experienceRef.current = new Experience(containerRef.current)
    }
  }, [])

  return <canvas ref={containerRef}></canvas>
}

export default ThreeScene
