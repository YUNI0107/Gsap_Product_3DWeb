import * as THREE from 'three'
import EventEmitter from 'eventemitter3'

class Sizes extends EventEmitter {
  width: number
  height: number
  pixelRatio: number
  resolution: THREE.Vector2

  constructor() {
    super()

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.resolution = new THREE.Vector2(this.width, this.height)
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    this.resize = this.resize.bind(this)

    window.addEventListener('resize', this.resize)
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.resolution.set(
      this.width * this.pixelRatio,
      this.height * this.pixelRatio,
    )
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.emit('sizes:resize')
  }

  destroy() {
    window.removeEventListener('resize', this.resize)
    this.off('sizes:resize')
  }
}

export default Sizes
