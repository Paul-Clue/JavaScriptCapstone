import 'phaser'; // eslint-disable-line
import config from '../Config/config';
import model from '../Model'; // eslint-disable-line
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene { // eslint-disable-line
  constructor() {
    super('Title');
  }

  create() {
    const list2 = document.querySelector('#scoreList');
    list2.style.display = 'none';

    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 50, 'blueButton1', 'blueButton2', 'Play', 'World');

    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 50, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}