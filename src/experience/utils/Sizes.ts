import EventEmitter from 'eventemitter3'

class Sizes extends EventEmitter {
  width: number
  height: number
  pixelRatio: number

  constructor() {
    super()

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.emit('sizes:resize')
  }

  destroy() {
    window.addEventListener('resize', this.resize.bind(this))
    this.off('sizes:resize')
  }
}

export default Sizes
