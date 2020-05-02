import Phaser from 'phaser'

export const PLAYER_KEY = 'player'

export const PLAYER_ANIMS = {
  LEFT: 'player-left',
  RIGHT: 'player-right',
  UP: 'player-up',
  DOWN: 'player-down',
  DEATH: 'death',

  ATTACK1: 'attack1',

  HIT: 'hit',
}

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, PLAYER_KEY)

    this.BEING_HIT = false
    this.HIT_POINTS = 20
    scene.physics.world.enableBody(this)
    this.body.setCollideWorldBounds(true)
    this.setScale(0.5, 0.5)
    this.body.setBounce(0.1)
    scene.add.existing(this)
    scene.anims.create({
      key: 'player-up',
      frames: scene.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 0,
        end: 2,
      }),
      frameRate: 7,
      repeat: -1,
    })
    scene.anims.create({
      key: 'player-right',
      frames: scene.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 9,
        end: 11,
      }),
      frameRate: 7,
      repeat: -1,
    })
    scene.anims.create({
      key: 'player-left',
      frames: scene.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 27,
        end: 29,
      }),
      frameRate: 7,
      repeat: -1,
    })
    scene.anims.create({
      key: 'player-down',
      frames: scene.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 18,
        end: 20,
      }),
      frameRate: 7,
      repeat: -1,
    })

    scene.anims.create({
      key: 'player-eat',
      frames: scene.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 39,
        end: 41,
      }),
      frameRate: 5,
      repeat: -1,
    })
    scene.anims.create({
      key: 'player-idle',
      frames: scene.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 40,
        end: 40,
      }),
      frameRate: 5,
      repeat: -1,
    })

    const animComplete = function (event, character, deets) { }

    this.on('animationcomplete', animComplete, this)
    this.on(
      'animationstart',
      e => {
        console.log('start', e)
        if (e.key === 'player-right' || e.key === 'player-left') {
          this.setScale(0.56, 0.56)
        } else {
          this.setScale(0.5, 0.5)
        }
      },
      this
    )
  }

  update(scene) {
    const pads = scene.input.gamepad.gamepads
    const gamepad = pads[0] || { buttons: [] }
    this.body.setVelocityX(0)
    this.body.setVelocityY(0)
    const play = animation => {
      // console.log('play')
      if (this?.anims?.currentAnim?.key !== animation) {
        console.log('in the if')
        this.anims.play(animation, true)
      }
    }
    if (gamepad.left) {
      play('player-left')
      this.body.setVelocityX(-20)
    } else if (gamepad.right) {
      play('player-right')
      this.body.setVelocityX(20)
    } else if (gamepad.up) {
      play('player-up')
      this.body.setVelocityY(-20)
    } else if (gamepad.down) {
      this.body.setVelocityY(20)
      play('player-down')
    } else {
      // play('player-idle')
    }
  }
}
