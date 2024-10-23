import * as THREE from 'three'
import Experience from './Experience'
import Sizes from './utils/Sizes'

export const CAMERA_LAYOUT_KEY = Object.freeze({
  LANDING: 'landing',
  TRANSITION: 'transition',
})
type cameraLayoutType =
  (typeof CAMERA_LAYOUT_KEY)[keyof typeof CAMERA_LAYOUT_KEY]

const pivots: { [key in cameraLayoutType]: THREE.Vector3 } = {
  [CAMERA_LAYOUT_KEY.LANDING]: new THREE.Vector3(-8, 7.5, 8),
  [CAMERA_LAYOUT_KEY.TRANSITION]: new THREE.Vector3(0, 0, 5),
}

class Camera {
  experience: Experience
  canvas?: HTMLCanvasElement
  sizes: Sizes
  instance: THREE.PerspectiveCamera
  scene: THREE.Scene

  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes

    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    )

    this.instance.position.set(0, 0, 5)
    this.scene.add(this.instance)

    this.experience.once('world:model-loaded', (model: THREE.Group) => {
      this.transformToPivot(CAMERA_LAYOUT_KEY.LANDING)
      this.instance.lookAt(model.position)
    })
  }

  transformToPivot(key: cameraLayoutType) {
    this.instance.position.copy(pivots[key])
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {}
}

export default Camera
