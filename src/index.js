import 'regenerator-runtime/runtime'; // eslint-disable-line
import 'phaser'; // eslint-disable-line
import config from './Config/config';
import WorldScene from './scenes/WorldScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import Model from './Model';
import GameOverScene from './scenes/GameOverScene';
import leaderBoardScene from './scenes/leaderBoardScene';

class Game extends Phaser.Game { // eslint-disable-line
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('World', WorldScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameOverScene);
    this.scene.add('Score', leaderBoardScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();