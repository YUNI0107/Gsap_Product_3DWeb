import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

class World {
  experience: Experience
  scene: THREE.Scene

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)

    gsap.to(cube.rotation, { duration: 2, y: 3, repeat: -1, yoyo: true })
  }

  update() {}
}

export default World
