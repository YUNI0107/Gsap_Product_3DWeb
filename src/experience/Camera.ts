import * as THREE from 'three'
import Experience from './Experience'
import Sizes from './utils/Sizes'
import { RAY_MARCH_LAYER_ID } from './world/BubblePlane'

export const CAMERA_LAYOUT_KEY = Object.freeze({
  LANDING: 'landing',
  TRANSITION: 'transition',
})
type cameraLayoutType =
  (typeof CAMERA_LAYOUT_KEY)[keyof typeof CAMERA_LAYOUT_KEY]

const pivots: { [key in cameraLayoutType]: THREE.Vector3 } = {
  [CAMERA_LAYOUT_KEY.LANDING]: new THREE.Vector3(-6, 7.5, 8),
  [CAMERA_LAYOUT_KEY.TRANSITION]: new THREE.Vector3(0, 0, 5),
}

const CAMERA_BREAKPOINT = {
  default: Infinity,
  tablet: 768,
  mobile: 640,
}
const CAMERA_BREAKPOINT_FOV = {
  [CAMERA_BREAKPOINT.default]: 35,
  [CAMERA_BREAKPOINT.tablet]: 45,
  [CAMERA_BREAKPOINT.mobile]: 50,
}

class Camera {
  experience: Experience
  canvas?: HTMLCanvasElement
  sizes: Sizes
  instance: THREE.PerspectiveCamera
  overlayCamera: THREE.PerspectiveCamera
  scene: THREE.Scene

  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes

    const fov = this.getFov()
    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    )

    this.instance.position.set(0, 0, 5)
    this.scene.add(this.instance)

    this.experience.once('world:model-loaded', (model: THREE.Group) => {
      this.transformToPivot(CAMERA_LAYOUT_KEY.LANDING)

      const box = new THREE.Box3().setFromObject(model)
      this.instance.lookAt(box.getCenter(new THREE.Vector3()))
    })

    this.overlayCamera = this.instance.clone()
    this.overlayCamera.layers.disable(0) // Default layer
    this.overlayCamera.layers.enable(RAY_MARCH_LAYER_ID)
  }

  transformToPivot(key: cameraLayoutType) {
    this.instance.position.copy(pivots[key])
  }

  getFov() {
    if (window.innerWidth < CAMERA_BREAKPOINT.mobile) {
      return CAMERA_BREAKPOINT_FOV[CAMERA_BREAKPOINT.mobile]
    } else if (window.innerWidth < CAMERA_BREAKPOINT.tablet) {
      return CAMERA_BREAKPOINT_FOV[CAMERA_BREAKPOINT.tablet]
    } else {
      return CAMERA_BREAKPOINT_FOV[CAMERA_BREAKPOINT.default]
    }
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.overlayCamera.aspect = this.sizes.width / this.sizes.height

    const fov = this.getFov()
    this.instance.fov = fov
    this.overlayCamera.fov = fov

    this.instance.updateProjectionMatrix()
    this.overlayCamera.updateProjectionMatrix()
  }

  update() {
    this.overlayCamera.position.copy(this.instance.position)
    this.overlayCamera.rotation.copy(this.instance.rotation)
  }
}

export default Camera
