import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import computerModelUrl from '@assets/models/gaming-pc.glb?url'
import { THEME_TYPE, ThemeType } from '@constants/theme'
import Experience from '../Experience'
import Renderer from '../Renderer'

const themeColorMap = {
  [THEME_TYPE.BLUE]: {
    emissive: [0, 0.1, 1],
    color: [0.1, 0.1, 0],
    emissiveIntensity: 1,
  },
  [THEME_TYPE.GREEN]: {
    emissive: [0.2, 0.8, 0.8],
    color: [0, 0, 0],
    emissiveIntensity: 0.8,
  },
  [THEME_TYPE.PINK]: {
    emissive: [0.9, 0.2, 0.9],
    color: [0, 0, 0],
    emissiveIntensity: 1,
  },
}

class ProductModel {
  experience: Experience
  scene: THREE.Scene
  renderer: Renderer

  model: null | THREE.Group
  lightObject: null | THREE.Object3D

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.renderer = this.experience.renderer

    this.model = null
    this.lightObject = null

    this.loadModel()
      .then((model) => {
        this.scene.add(model)
        this.changeColor(THEME_TYPE.BLUE)
        this.experience.emit('world:model-loaded', model)
      })
      .catch((error) => console.error('Computer loadModel load failed', error))
  }

  changeColor(theme: ThemeType) {
    if (!this.model) return

    if (
      this.lightObject &&
      this.lightObject instanceof THREE.Mesh &&
      this.lightObject.material
    ) {
      this.lightObject.material.color.set(...themeColorMap[theme].color)
      this.lightObject.material.emissive.set(...themeColorMap[theme].emissive)
      this.lightObject.material.emissiveIntensity =
        themeColorMap[theme].emissiveIntensity
      this.lightObject.material.needsUpdate = true
    }
  }

  loadModel() {
    return new Promise<THREE.Group>((resolve, reject) => {
      const loader = new GLTFLoader()

      loader.load(
        computerModelUrl,
        // called when the resource is loaded
        (gltf) => {
          this.model = gltf.scene

          // Resize the model
          const sketchfabChild = this.model.getObjectByName('Sketchfab_model')
          if (sketchfabChild) sketchfabChild.scale.set(2, 2, 2)

          // Reset base color
          this.lightObject =
            this.model.getObjectByName('Nightshark_RGB_0') || null
          if (this.lightObject) {
            this.renderer.handleBloomSelection(this.lightObject)
          }

          resolve(this.model)
        },
        (request) => {
          console.log((request.loaded / request.total) * 100 + '% loaded')
        },
        // called when loading has errors
        (error) => {
          reject(error)
        },
      )
    })
  }
}

export default ProductModel