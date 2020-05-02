import Phaser from 'phaser'
import { SCENES } from '../utils/constants'

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('intro')
  }

  preload() { }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start(SCENES.OVERWORLD)
    }
  }
}
