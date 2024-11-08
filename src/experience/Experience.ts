import * as THREE from 'three'
import EventEmitter from 'eventemitter3'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Camera from './Camera'
import Renderer from './Renderer'
import { ThemeType } from '@constants/theme'

// utils
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import World from './world/World'

class Experience extends EventEmitter {
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
    super()
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

    // new OrbitControls(this.camera.instance, this.renderer.instance.domElement)
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
    this.world.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
    this.world.update()
  }
}

export default Experience
