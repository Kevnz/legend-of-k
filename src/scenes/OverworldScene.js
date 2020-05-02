import Phaser from 'phaser'
import { SCENES, PLAYER_KEY } from '../utils/constants'
import Player from '../entities/player'

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super(SCENES.OVERWORLD)
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/tiled/overworld.json')
    this.load.image('land', 'assets/images/tiles/roguelikeSheet.png')
    this.load.image('dungeon', 'assets/images/tiles/roguelikeDungeon.png')

    this.load.spritesheet('player', 'assets/images/entities/link.png', {
      frameWidth: 24,
      frameHeight: 32,
    })
  }

  create() {
    this.cameras.main.setBounds(0, 0, 16 * 16, 16 * 16)
    this.physics.world.setBounds(0, 0, 16 * 16, 16 * 16)
    this.cursors = this.input.keyboard.createCursorKeys()
    const map = this.make.tilemap({ key: 'map' })
    const ground = map.addTilesetImage('outside', 'land')
    const rock = map.addTilesetImage('dungeon', 'dungeon')
    const layers = [rock, ground]
    map.createStaticLayer('Ground', layers, 0, 0)
    map.createStaticLayer('Mountain', layers, 0, 0)
    map.createStaticLayer('Trees', layers, 0, 0)
    map.createStaticLayer('Water', layers, 0, 0)
    map.createStaticLayer('Paths', layers, 0, 0)
    map.createStaticLayer('Deco', layers, 0, 0)
    map.createStaticLayer('Cave', layers, 0, 0)

    this.anims.create({
      key: 'player-up',
      frames: this.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: 'player-right',
      frames: this.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: 'player-left',
      frames: this.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 27,
        end: 29,
      }),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: 'player-down',
      frames: this.anims.generateFrameNumbers(PLAYER_KEY, {
        start: 18,
        end: 20,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.player = new Player(this, 100, 100)
  }

  update() {
    this.player.update(this)
  }
}
