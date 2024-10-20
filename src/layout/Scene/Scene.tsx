import { useRef, useEffect } from 'react'
import Experience from '../../experience/Experience'
import useStore from '@store/useStore'

function ThreeScene() {
  const containerRef = useRef<HTMLCanvasElement | null>(null)
  const experienceRef = useRef<Experience | null>(null)
  const theme = useStore((state) => state.currentTheme)

  useEffect(() => {
    if (experienceRef.current) {
      experienceRef.current.updateTheme(theme)
    }
  }, [theme])

  useEffect(() => {
    if (containerRef.current) {
      experienceRef.current = new Experience(containerRef.current)
    }
  }, [])

  return <canvas ref={containerRef}></canvas>
}

export default ThreeScene
