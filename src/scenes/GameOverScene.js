import 'phaser';
import { postData } from './functions';

export default class GameOverScene extends Phaser.Scene { // eslint-disable-line
  constructor() {
    super('Game');
  }

  init(data) {
    this.finalScore = data.score;
  }

  preload() {
    this.load.image('logo', 'assets/pimg.png');
  }

  create() {
    this.add.text(125, 140, this.finalScore, { fontSize: '30px', color: '#fff' }).setScrollFactor(0);
    this.add.text(40, 100, 'Your Score Is', { fontSize: '30px', color: '#fff' }).setScrollFactor(0);

    this.add.image(400, 300, 'logo');
    this.add.text(64, 70, 'GOOD JOB!!!', { fontSize: '30px', fill: '#fff' });

    this.nameInput = document.querySelector('#form');
    this.nameInput2 = document.querySelector('#form');
    this.show = document.querySelector('#input-form');
    this.show.style.display = 'block';

    this.message = this.add.text(130, 200, ' ', {
      color: '#fff',
      fontSize: 20,
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // eslint-disable-line

    this.returnKey.on('down', () => {
      const name = this.nameInput.value;
      if (name !== '') {
        this.message.setText(`Player: ${name}`);
        this.nameInput.value = '';
        this.show.style.display = 'none';
      }

      const playerInfo = { user: name, score: this.finalScore };

      postData(playerInfo);

      this.scene.start('Score');
    });
  }
}
