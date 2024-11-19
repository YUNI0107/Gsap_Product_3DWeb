import { useRef, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import Experience from '../../experience/Experience'
import useStore from '@store/useStore'

function ThreeScene() {
  const containerRef = useRef<HTMLCanvasElement | null>(null)
  const experienceRef = useRef<Experience | null>(null)

  const { section, theme } = useStore(
    useShallow((state) => ({
      section: state.section,
      theme: state.currentTheme,
    })),
  )

  useEffect(() => {
    if (experienceRef.current) {
      experienceRef.current.updateTheme(theme)
    }
  }, [theme])

  useEffect(() => {
    if (experienceRef.current) {
      experienceRef.current.updateSection()
    }
  }, [section])

  useEffect(() => {
    if (containerRef.current) {
      experienceRef.current = new Experience(containerRef.current)
    }
  }, [])

  return <canvas ref={containerRef}></canvas>
}

export default ThreeScene
