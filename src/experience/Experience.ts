import * as THREE from 'three'
import Renderer from './Renderer'
import Camera, { CAMERA_LAYOUT_KEY } from './Camera'
import { ThemeType } from '@constants/theme'

// utils
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import World from './world/World'

class Experience {
  private static instance: Experience
  canvas?: HTMLCanvasElement
  scene: THREE.Scene
  sizes: Sizes
  renderer: Renderer
  camera: Camera
  time: Time
  world: World

  constructor(canvas?: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this

    this.canvas = canvas
    this.scene = new THREE.Scene()

    this.sizes = new Sizes()
    this.time = new Time()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    this.sizes.on('sizes:resize', () => {
      this.resize()
    })

    this.time.on('time:tick', () => {
      this.update()
    })

    this.world.once('world:model-loaded', (model: THREE.Group) => {
      this.camera.transformToPivot(CAMERA_LAYOUT_KEY.LANDING)
      this.camera.instance.lookAt(model.position)
    })
  }

  updateTheme(theme: ThemeType) {
    this.world.updateTheme(theme)
  }

  destroy() {
    this.time.off('tick')
    this.sizes.destroy()
    this.renderer.instance.dispose()
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
  }
}

export default Experience
