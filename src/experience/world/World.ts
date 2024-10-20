import * as THREE from 'three'
import EventEmitter from 'eventemitter3'

import Experience from '../Experience'
import ProductModel from './ProductModel'
import { ThemeType } from '@constants/theme'

class World extends EventEmitter {
  experience: Experience
  scene: THREE.Scene
  computer: ProductModel

  constructor() {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.computer = new ProductModel()
    this.computer
      .loadModel()
      .then((model) => {
        this.scene.add(model)
        this.emit('world:model-loaded', model)
      })
      .catch((error) => console.error('Computer loadModel load failed', error))
  }

  updateTheme(theme: ThemeType) {
    if (this.computer.model) {
      this.computer.changeColor(theme)
    }
  }
}

export default World
