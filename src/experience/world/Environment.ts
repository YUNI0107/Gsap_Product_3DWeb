import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import Experience from '../Experience'

import environmentMapUrl from '@assets/models/pond_bridge_night_2k.hdr?url'

class Environment {
  experience: Experience
  scene: THREE.Scene
  ambientLight: THREE.AmbientLight
  directionalLight: THREE.DirectionalLight

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.loadEnvironmentMap()
    this.setupLight()

    // TODO: Remove ball for debug
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(),
      new THREE.MeshStandardMaterial(),
    )

    ball.position.set(0, 2, 2)
    this.scene.add(ball)
  }

  loadEnvironmentMap() {
    const rgbeLoader = new RGBELoader()
    rgbeLoader.load(environmentMapUrl, (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping
      this.scene.environment = environmentMap
      this.scene.environmentIntensity = 0.5
    })
  }

  setupLight() {
    this.directionalLight = new THREE.DirectionalLight(0xffe1ad, 1)
    // this.directionalLight.intensity = 10
    this.directionalLight.position.set(-5, 5, 5)
    this.scene.add(this.directionalLight)
  }
}

export default Environment
