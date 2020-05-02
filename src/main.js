import Phaser from 'phaser'

import IntroScene from './scenes/IntroScene'
import OverworldScene from './scenes/OverworldScene'

const config = {
  type: Phaser.AUTO,
  width: 16 * 16,
  height: 16 * 16,
  input: {
    gamepad: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      // gravity: { y: 200 },
    },
  },
  scene: [IntroScene, OverworldScene],
}

export default new Phaser.Game(config)
