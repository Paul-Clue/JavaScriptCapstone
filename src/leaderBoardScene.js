import 'phaser';
import Button from './Objects/Button';

// TO MIMIC A DELETE, CRETE A FUNCTION THAT MAKES ANOTHER GAME KEY
// https://us-central1-js-capstone-backend.cloudfunctions.net/api/
//
 

export default class leaderBoardScene extends Phaser.Scene {
  constructor () {
    super('Score');
  }
 
	create(){
			datas('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ip0JlGDyAdoLM8OImZTq/scores/')
			.then(function (response) {
				
				console.log(response.result);
				console.log(response.result[0].user);
				function compare( a, b ) {
					if ( a.score < b.score ){
						return -1;
					}
					if ( a.score > b.score ){
						return 1;
					}
					return 0;
				}
			
				const list = document.querySelector('.scores');
				const list2 = document.querySelector('#scoreList');
				let newOne = response.result.sort(compare);
				// response.result.reverse();
				for(let i = 0; i < 10; i += 1){
					const score = document.createElement('li');
					score.innerText = newOne[i].user + ": " + newOne[i].score;
					list.appendChild(score);
					

				}
				list2.style.display = 'block';
				})
			async function datas(url = ''){
				const response = await fetch(url, {
					method: 'GET',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					redirect: 'follow',
					referrerPolicy: 'no-referrer',
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					},
				})
				let have = await response.json();
				return have;
		}
	}
}

