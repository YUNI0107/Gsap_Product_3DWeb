import * as THREE from 'three'
import { SectionType } from '@constants/section'
import useStore from '@store/useStore'
import CameraControls from './CameraControls'

interface CameraLockControlsOptions {
  target?: THREE.Vector3
  alpha?: number
  lookAt?: THREE.Vector3
  lookAtTarget?: THREE.Object3D
}

class CameraLockControls implements CameraControls {
  camera: THREE.Camera
  sectionKey: SectionType
  targetPosition: THREE.Vector3 | null
  alpha: number
  lookAtPoint: THREE.Vector3 | null
  lookAtTarget: THREE.Object3D | null

  constructor(
    camera: THREE.Camera,
    sectionKey: SectionType,
    options: CameraLockControlsOptions = {},
  ) {
    this.sectionKey = sectionKey
    this.camera = camera
    this.targetPosition = options.target || null
    this.alpha = options.alpha !== undefined ? options.alpha : 0.05
    this.lookAtPoint = options.lookAt || null
    this.lookAtTarget = options.lookAtTarget || null
  }

  updateLookAt(lookAt: THREE.Vector3) {
    this.lookAtPoint = lookAt
  }

  update() {
    const currentSection = useStore.getState().section
    if (currentSection !== this.sectionKey) return

    if (this.targetPosition) {
      const currentPosition = this.camera.position
      if (!currentPosition.equals(this.targetPosition)) {
        this.camera.position.lerp(this.targetPosition, this.alpha)
      }
    }

    if (this.lookAtPoint && this.lookAtTarget) {
      const currentPosition = this.lookAtTarget.position

      if (!currentPosition.equals(this.lookAtPoint)) {
        this.lookAtTarget.position.lerp(this.lookAtPoint, this.alpha)
      }

      this.camera.lookAt(this.lookAtTarget.position)
    }
  }
}

export default CameraLockControls
