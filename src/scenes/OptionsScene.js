import 'phaser'; // eslint-disable-line
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene { // eslint-disable-line
  constructor() {
    super('Options');
  }

  create() {

    this.model = this.sys.game.globals.model;

    this.text = this.add.text(100, 100, 'Options', { fontSize: 25 });
    this.musicButton = this.add.image(130, 160, 'checkedBox');
    this.musicText = this.add.text(160, 150, 'Music Enabled', { fontSize: 15 });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 14 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.soundOn = !this.soundOn;
      this.updateAudio();
    });

    this.updateAudio();

    this.menuButton = new Button(this, 160, 212, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}