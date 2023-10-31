import * as THREE from 'three'
import Experience from '../Experience.js'

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
  }

  update() {}
}

export default World
