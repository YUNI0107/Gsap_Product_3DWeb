import * as THREE from 'three'

import { ThemeType } from '@constants/theme'
import Experience from '../Experience'
import Environment from './Environment'
import ProductModel from './ProductModel'
import BubblePlane from './BubblePlane'
import Sparks from './Sparks'

class World {
  experience: Experience
  scene: THREE.Scene
  computer: ProductModel
  environment: Environment
  bubblePlane: BubblePlane
  sparks: Sparks

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Lights
    this.environment = new Environment()

    this.computer = new ProductModel()
    this.bubblePlane = new BubblePlane()
    this.sparks = new Sparks()
  }

  updateTheme(theme: ThemeType) {
    this.bubblePlane.changeColor(theme)
    this.computer.changeColor(theme)
    this.sparks.changeColor(theme)
  }

  updateSection() {
    this.computer.updateSection()
  }

  resize() {
    this.bubblePlane.resize()
  }

  update() {
    this.bubblePlane.update()
    this.computer.update()
  }
}

export default World
