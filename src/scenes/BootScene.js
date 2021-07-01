import 'phaser'; // eslint-disable-line

export default class BootScene extends Phaser.Scene { // eslint-disable-line
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/pimg.png');

    this.load.image('tiles', 'assets/map/spritesheet.png');
    this.load.image('tiles', 'assets/map/ground_tiles.png');

    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}