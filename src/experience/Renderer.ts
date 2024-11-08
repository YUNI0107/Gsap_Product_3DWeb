import * as THREE from 'three'
import Experience from './Experience'
import Sizes from './utils/Sizes'
import Camera from './Camera'
import { RAY_MARCH_LAYER_ID } from './world/BubblePlane'

class Renderer {
  experience: Experience
  canvas?: HTMLCanvasElement
  sizes: Sizes
  instance: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: Camera
  active: boolean

  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    })
    this.active = false
    this.setDefaultSetting()

    this.experience.once('world:model-loaded', () => (this.active = true))
  }

  setDefaultSetting() {
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.autoClear = false
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    if (!this.active) return

    this.camera.overlayCamera.layers.set(RAY_MARCH_LAYER_ID)
    this.instance.render(this.scene, this.camera.overlayCamera)
    this.instance.render(this.scene, this.camera.instance)
  }
}

export default Renderer
