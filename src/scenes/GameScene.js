import 'phaser';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    // load images
    this.load.image('logo', 'assets/pimg.png');
  }
 
  create () {
    this.add.image(400, 300, 'logo');
  }
};





// export class SimpleScene extends Phaser.Scene {
//   create() {
//     this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
//   }

//   preload() {
//     this.load.image('cokecan', 'assets/pimg.png');
//   }

//   create() {
//     this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
//     this.add.image(100, 200, 'cokecan');
//   }
// }