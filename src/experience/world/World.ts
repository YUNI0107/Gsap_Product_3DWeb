import * as THREE from 'three'

import Experience from '../Experience'
import Environment from './Environment'
import ProductModel from './ProductModel'
import { ThemeType } from '@constants/theme'

class World {
  experience: Experience
  scene: THREE.Scene
  computer: ProductModel
  environment: Environment

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Lights
    this.environment = new Environment()

    this.computer = new ProductModel()
  }

  updateTheme(theme: ThemeType) {
    if (this.computer.model) {
      this.computer.changeColor(theme)
    }
  }
}

export default World
