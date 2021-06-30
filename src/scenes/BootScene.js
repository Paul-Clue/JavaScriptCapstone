import 'phaser';


export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
        // boot image
    this.load.image('logo', 'assets/pimg.png');
    // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');
    this.load.image('tiles', 'assets/map/ground_tiles.png');
       
    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    
    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
  }
   
  create () {
    this.scene.start('Preloader');
    // this.scene.start('World');
  }
};