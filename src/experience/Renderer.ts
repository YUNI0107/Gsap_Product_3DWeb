import * as THREE from 'three'
import {
  SelectiveBloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  BlendFunction,
} from 'postprocessing'
import Experience from './Experience'
import Sizes from './utils/Sizes'
import Camera from './Camera'

class Renderer {
  experience: Experience
  canvas?: HTMLCanvasElement
  sizes: Sizes
  instance: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: Camera
  renderActive: boolean

  composer: EffectComposer | null
  bloom: SelectiveBloomEffect | null

  constructor() {
    this.renderActive = false
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

    // post-processing
    this.composer = null
    this.bloom = null

    this.setDefaultSetting()
    this.setBloomEffect()

    this.experience.once('world:model-loaded', () => (this.renderActive = true))
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
    if (this.composer) {
      this.composer.setSize(this.sizes.width, this.sizes.height)
    }
  }

  setBloomEffect() {
    const composer = new EffectComposer(this.instance)
    this.bloom = new SelectiveBloomEffect(this.scene, this.camera.instance, {
      blendFunction: BlendFunction.ADD,
      intensity: 3,
      luminanceThreshold: 0.1,
      luminanceSmoothing: 0,
    })

    const bubbleRender = new RenderPass(this.scene, this.camera.overlayCamera)
    composer.addPass(bubbleRender)
    const mainRender = new RenderPass(this.scene, this.camera.instance)
    mainRender.clear = false
    composer.addPass(mainRender)
    const bloomEffect = new EffectPass(this.camera.instance, this.bloom)
    composer.addPass(bloomEffect)

    this.composer = composer
  }

  handleBloomSelection(selectedObject: THREE.Object3D) {
    if (this.bloom === null) return

    const selection = this.bloom.selection
    selection.set([selectedObject])
  }

  update() {
    if (!this.renderActive) return

    if (this.composer) {
      this.composer.render()
    }
  }
}

export default Renderer
