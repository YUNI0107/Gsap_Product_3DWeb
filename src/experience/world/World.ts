import * as THREE from 'three'

import Experience from '../Experience'
import Environment from './Environment'
import ProductModel from './ProductModel'
import { ThemeType } from '@constants/theme'
import BubblePlane from './BubblePlane'

class World {
  experience: Experience
  scene: THREE.Scene
  computer: ProductModel
  environment: Environment
  bubblePlane: BubblePlane

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Lights
    this.environment = new Environment()

    this.computer = new ProductModel()
    this.bubblePlane = new BubblePlane()
  }

  updateTheme(theme: ThemeType) {
    this.bubblePlane.changeColor(theme)
    if (this.computer.model) {
      this.computer.changeColor(theme)
    }
  }

  resize() {
    this.bubblePlane.resize()
  }

  update() {
    this.bubblePlane.update()
  }
}

export default World
