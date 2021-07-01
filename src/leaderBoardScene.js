import 'phaser'; // eslint-disable-line
import { datas } from './scenes/functions';
import Button from './Objects/Button';

export default class leaderBoardScene extends Phaser.Scene { // eslint-disable-line
  constructor() {
    super('Score');
  }

  create() { // eslint-disable-line
    datas('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ip0JlGDyAdoLM8OImZTq/scores/')
      .then((response) => {
        console.log(response.result);
        console.log(response.result[0].user);
        function compare(a, b) {
          if (a.score < b.score) {
            return -1;
          }
          if (a.score > b.score) {
            return 1;
          }
          return 0;
        }

        const list = document.querySelector('.scores');
        const list2 = document.querySelector('#scoreList');
        const newOne = response.result.sort(compare);

        for (let i = 0; i < 10; i += 1) {
          const score = document.createElement('li');
          score.innerText = `${newOne[i].user}: ${newOne[i].score}`;
          list.appendChild(score);
        }
        list2.style.display = 'block';
      });

      this.menuButton = new Button(this, 160, 210, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}
