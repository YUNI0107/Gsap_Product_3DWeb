import * as THREE from 'three'
import Experience from '../Experience'
import Sizes from '../utils/Sizes'
import sparkTexture from '@assets/textures/spark.png'
import { THEME_TYPE, ThemeType } from '@constants/theme'

import vertexShader from '../shaders/sparks/vertex.glsl'
import fragmentShader from '../shaders/sparks/fragment.glsl'

const themeColorMap = {
  [THEME_TYPE.BLUE]: 0x7792ff,
  [THEME_TYPE.GREEN]: 0x3cffff,
  [THEME_TYPE.PINK]: 0xfca4f8,
}

class Sparks {
  experience: Experience
  sizes: Sizes
  color: THREE.Color

  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.color = new THREE.Color(0x00ff00)

    this.createSparks()
  }

  async createSparks() {
    try {
      const texture = await this.loadTexture()
      const geometry = this.createGeometry()
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uSize: new THREE.Uniform(300),
          uResolution: new THREE.Uniform(this.sizes.resolution),
          uTexture: new THREE.Uniform(texture),
          uColor: new THREE.Uniform(this.color),
        },
      })

      const points = new THREE.Points(geometry, material)
      this.experience.scene.add(points)
    } catch (e) {
      console.error(e)
    }
  }

  loadTexture() {
    return new Promise((resolve, reject) => {
      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(sparkTexture, resolve, undefined, reject)
    })
  }

  createGeometry(count: number = 100, range: number = 15) {
    const positionsArray = new Float32Array(count * 3)
    const sizesArray = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      positionsArray[i3] = (Math.random() - 0.5) * range
      positionsArray[i3 + 1] = (Math.random() - 0.5) * range
      positionsArray[i3 + 2] = (Math.random() - 0.5) * range

      sizesArray[i] = Math.random()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionsArray, 3),
    )
    geometry.setAttribute(
      'aSize',
      new THREE.Float32BufferAttribute(sizesArray, 1),
    )

    return geometry
  }

  changeColor(theme: ThemeType) {
    this.color.setHex(themeColorMap[theme])
  }
}

export default Sparks
