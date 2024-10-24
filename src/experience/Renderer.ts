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
  composer: EffectComposer
  bloom: SelectiveBloomEffect

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
    this.setDefaultSetting()
    this.composer = this.setBloomEffect()
  }

  setDefaultSetting() {
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  setBloomEffect() {
    const composer = new EffectComposer(this.instance)
    this.bloom = new SelectiveBloomEffect(this.scene, this.camera.instance, {
      blendFunction: BlendFunction.ADD,
      intensity: 3,
      luminanceThreshold: 0.1,
      luminanceSmoothing: 0,
    })

    composer.addPass(new RenderPass(this.scene, this.camera.instance))
    composer.addPass(new EffectPass(this.camera.instance, this.bloom))

    return composer
  }

  handleBloomSelection(selectedObject: THREE.Object3D) {
    const selection = this.bloom.selection
    selection.toggle(selectedObject)
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.composer.render()
  }
}

export default Renderer
