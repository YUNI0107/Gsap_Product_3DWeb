import * as THREE from 'three'
import Experience from './Experience'
import Sizes from './utils/Sizes'
import { RAY_MARCH_LAYER_ID } from './world/BubblePlane'
import { SECTION_TYPE, SectionType } from '@constants/section'
import CameraLockControls from './utils/camera/CameraLockControls'
import useStore from '@store/useStore'

const pivots: { [key in SectionType]?: THREE.Vector3 } = {
  [SECTION_TYPE.LANDING]: new THREE.Vector3(-6, 7.5, 8),
  [SECTION_TYPE.TRANSITION]: new THREE.Vector3(0, 5, 10),
  [SECTION_TYPE.ABOUT]: new THREE.Vector3(-0.5, 6, 7),
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

  controls: { [key in SectionType]: CameraLockControls }
  #control: CameraLockControls

  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes

    // Generate camera
    const fov = this.getFov()
    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    )
    this.scene.add(this.instance)
    if (pivots[SECTION_TYPE.LANDING]) {
      const position = pivots[SECTION_TYPE.LANDING] as THREE.Vector3
      this.instance.position.copy(position)
    }

    // Controls setup
    const lookAtTarget = new THREE.Object3D()
    this.controls = {
      [SECTION_TYPE.LANDING]: new CameraLockControls(
        this.instance,
        SECTION_TYPE.LANDING,
        { target: pivots[SECTION_TYPE.LANDING], lookAtTarget },
      ),
      [SECTION_TYPE.TRANSITION]: new CameraLockControls(
        this.instance,
        SECTION_TYPE.TRANSITION,
        { target: pivots[SECTION_TYPE.TRANSITION], lookAtTarget },
      ),
      [SECTION_TYPE.ABOUT]: new CameraLockControls(
        this.instance,
        SECTION_TYPE.ABOUT,
        {
          target: pivots[SECTION_TYPE.ABOUT],
          lookAt: new THREE.Vector3(-0.5, 3, 0),
          lookAtTarget,
        },
      ),
    }
    this.#control = this.controls[SECTION_TYPE.LANDING]

    this.experience.once('world:model-loaded', (model: THREE.Group) => {
      const box = new THREE.Box3()
      box.setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      this.controls.landing.updateLookAt(center)
      this.controls.transition.updateLookAt(center)
    })

    this.overlayCamera = this.instance.clone()
    this.overlayCamera.layers.disable(0) // Default layer
    this.overlayCamera.layers.enable(RAY_MARCH_LAYER_ID)
  }

  get control() {
    return this.#control
  }

  set control(control) {
    this.#control = control
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

  updateSection() {
    const section = useStore.getState().section
    this.control = this.controls[section]
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
    this.control.update()

    this.overlayCamera.position.copy(this.instance.position)
    this.overlayCamera.rotation.copy(this.instance.rotation)
  }
}

export default Camera
