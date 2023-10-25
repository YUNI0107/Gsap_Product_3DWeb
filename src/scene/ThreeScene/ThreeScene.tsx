import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function ThreeScene() {
  const containerRef = useRef<null | HTMLCanvasElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )

      const renderer = new THREE.WebGLRenderer({
        canvas: containerRef.current,
        alpha: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)

      window.addEventListener('resize', () => {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
      })

      // Camera
      camera.position.z = 5

      // Lights

      // Cube
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      // Render
      const renderScene = () => {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
        requestAnimationFrame(renderScene)
      }
      renderScene()

      const handleResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return <canvas ref={containerRef}></canvas>
}

export default ThreeScene
