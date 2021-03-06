import Phaser from 'phaser'; // eslint-disable-line

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  dom: {
    createContainer: true,
  },
};