import * as THREE from 'three'
import Experience from '../Experience'
import vertexShader from '../shaders/bubble/vertex.glsl'
import fragmentShader from '../shaders/bubble/fragment.glsl'
import { THEME_TYPE, ThemeType } from '@constants/theme'

export const RAY_MARCH_LAYER_ID = 1
const BUBBLE_COLOR_MAP = {
  [THEME_TYPE.BLUE]: {
    bubbleColor: new THREE.Color(0x4772ff),
    lightColor: new THREE.Color(0xfcf9de),
    backgroundColor: new THREE.Color(0x02007f),
  },
  [THEME_TYPE.GREEN]: {
    bubbleColor: new THREE.Color(0x45e8e8),
    lightColor: new THREE.Color(0xdef9f0),
    backgroundColor: new THREE.Color(0x199e9e),
  },
  [THEME_TYPE.PINK]: {
    bubbleColor: new THREE.Color(0xf75dfc),
    lightColor: new THREE.Color(0xfcf9de),
    backgroundColor: new THREE.Color(0x98169a),
  },
}

/**
 * Ray marching technique
 * References: https://medium.com/@nabilnymansour/ray-marching-in-three-js-66b03e3a6af2
 */

class BubblePlane {
  experience: Experience
  plane: THREE.Mesh
  startTheme: ThemeType
  endTheme: ThemeType
  lerpProgress: number
  calcVec3A: THREE.Vector3
  calcVec3B: THREE.Vector3
  totalSpheres: number = 8
  uniforms: { [key: string]: THREE.IUniform }

  constructor() {
    this.experience = new Experience()
    this.plane = this.createPlane()
    this.experience.scene.add(this.plane)

    this.startTheme = THEME_TYPE.BLUE
    this.endTheme = THEME_TYPE.BLUE
    this.lerpProgress = 1

    // Force the plane ignore depth and render behind everything
    const material = this.plane.material as THREE.ShaderMaterial
    material.transparent = true
    material.depthWrite = false
    material.defines = { MAX_SPHERES: this.totalSpheres }
    this.plane.layers.set(RAY_MARCH_LAYER_ID)

    this.calcVec3A = new THREE.Vector3()
    this.calcVec3B = new THREE.Vector3()

    const camera = this.experience.camera.instance
    const { spherePositions, sphereRadius } = this.generateRandomSpheres()
    this.uniforms = {
      uTime: new THREE.Uniform(0),

      uMaxSteps: new THREE.Uniform(100),
      uMaxDistance: new THREE.Uniform(1000),
      uEpsilon: new THREE.Uniform(0.001),

      uCamPosition: new THREE.Uniform(camera.position),
      uCamInvProjMatrix: new THREE.Uniform(camera.projectionMatrixInverse),
      uCamToWorldMatrix: new THREE.Uniform(camera.matrixWorld),

      uSpherePositions: new THREE.Uniform(spherePositions),
      uSphereRadius: new THREE.Uniform(sphereRadius),
      uNumSpheres: new THREE.Uniform(8),

      uLightColor: new THREE.Uniform(new THREE.Color(0xfcf9de)),
      uBubbleColor: new THREE.Uniform(new THREE.Color(0x5b81ff)),
      uBackgroundColor: new THREE.Uniform(new THREE.Color(0x02007f)),
    }

    material.uniforms = this.uniforms
  }

  createPlane() {
    const camera = this.experience.camera.instance

    const geometry = new THREE.PlaneGeometry()
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    })
    const rayMarchPlane = new THREE.Mesh(geometry, material)

    // Get the width and height of the near plane
    const nearPlaneWidth =
      camera.near *
      Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
      camera.aspect *
      2
    const nearPlaneHeight = nearPlaneWidth / camera.aspect

    rayMarchPlane.scale.set(nearPlaneWidth, nearPlaneHeight, 1)

    return rayMarchPlane
  }

  generateRandomSpheres() {
    const maxSpheres = this.totalSpheres
    const spherePositions = new Float32Array(maxSpheres * 3) //  x, y, z
    const sphereRadius = new Float32Array(maxSpheres)
    const range = 2
    const minSpacing = 1

    for (let i = 0; i < maxSpheres; i++) {
      spherePositions[i * 3] =
        (Math.random() + minSpacing) * range * (Math.random() > 0.5 ? 1 : -1)
      spherePositions[i * 3 + 1] = Math.random() * -1.0
      spherePositions[i * 3 + 2] =
        (Math.random() + minSpacing) * range * (Math.random() > 0.5 ? 1 : -1)
      sphereRadius[i] = 0.5 + Math.random()
    }

    return { spherePositions, sphereRadius }
  }

  changeColor(theme: ThemeType) {
    if (this.lerpProgress < 1) {
      this.endTheme = theme
    } else {
      this.startTheme = this.endTheme
      this.endTheme = theme
      this.lerpProgress = 0
    }

    const { spherePositions, sphereRadius } = this.generateRandomSpheres()
    this.uniforms.uSpherePositions.value = spherePositions
    this.uniforms.uSphereRadius.value = sphereRadius
  }

  resize() {
    const camera = this.experience.camera.instance
    const nearPlaneWidth =
      camera.near *
      Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
      camera.aspect *
      2
    const nearPlaneHeight = nearPlaneWidth / camera.aspect
    this.plane.scale.set(nearPlaneWidth, nearPlaneHeight, 1)
  }

  update() {
    const camera = this.experience.camera.instance
    const cameraDirection = camera.getWorldDirection(this.calcVec3B)
    const cameraForwardPos = this.calcVec3A
      .copy(camera.position)
      .add(cameraDirection.multiplyScalar(1).multiplyScalar(camera.near))
    this.plane.position.copy(cameraForwardPos)
    this.plane.rotation.copy(camera.rotation)

    this.uniforms.uTime.value = this.experience.time.elapsed

    // Lerp the colors
    if (this.lerpProgress < 1) {
      const progress = Math.min(this.lerpProgress, 1)
      const startColor = BUBBLE_COLOR_MAP[this.startTheme]
      const endColor = BUBBLE_COLOR_MAP[this.endTheme]
      this.lerpProgress += 0.05

      this.uniforms.uBubbleColor.value.lerpColors(
        startColor.bubbleColor,
        endColor.bubbleColor,
        progress,
      )
      this.uniforms.uLightColor.value.lerpColors(
        startColor.lightColor,
        endColor.lightColor,
        progress,
      )
      this.uniforms.uBackgroundColor.value.lerpColors(
        startColor.backgroundColor,
        endColor.backgroundColor,
        progress,
      )
    }
  }
}

export default BubblePlane
