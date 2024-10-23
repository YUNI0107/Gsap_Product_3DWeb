import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import computerModelUrl from '@assets/models/gaming-pc.glb?url'
import { THEME_TYPE, ThemeType } from '@constants/theme'
import Experience from '../Experience'

const themeColorMap = {
  [THEME_TYPE.BLUE]: new THREE.Color(0x0000ff),
  [THEME_TYPE.GREEN]: new THREE.Color(0x31f1f1),
  [THEME_TYPE.PINK]: new THREE.Color(0xf93afc),
}

class ProductModel {
  experience: Experience
  scene: THREE.Scene

  model: null | THREE.Group
  lightObject: null | THREE.Object3D

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.model = null
    this.lightObject = null

    this.loadModel()
      .then((model) => {
        this.scene.add(model)
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
      this.lightObject.material.emissive.copy(themeColorMap[theme])
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
          if (
            this.lightObject &&
            this.lightObject instanceof THREE.Mesh &&
            this.lightObject.material
          ) {
            this.lightObject.material.color.set(0, 0, 0)
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
