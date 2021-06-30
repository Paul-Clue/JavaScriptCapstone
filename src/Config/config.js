import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';
import WorldScene from '../scenes/WorldScene';

 
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
            // debug: true
        }
    },
    dom: {
        createContainer: true
    },
    // scene: [
    //     update2
    // ]

};