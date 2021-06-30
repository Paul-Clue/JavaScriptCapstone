import 'phaser';
 

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  init(data){
      // console.log('init', data);
      this.finalScore = data.score;
  }
  preload () {
    // this.load.html("form", "form.html");
    this.load.image('logo', 'assets/pimg.png');
  }
 
  create ()
  {
    this.add.text(125, 140, this.finalScore, {fontSize: '30px', color: '#fff'}).setScrollFactor(0);
    this.add.text(40, 100, 'Your Score Is', {fontSize: '30px', color: '#fff'}).setScrollFactor(0);
 
    this.add.image(400, 300, 'logo');
    this.add.text(64, 70, 'GOOD JOB!!!', { fontSize: '30px', fill: '#fff'});



    // this.nameInput = this.add.dom(640, 360).createFromCache("form");
    this.nameInput = document.querySelector('#form');
    this.nameInput2 = document.querySelector('#form');
    this.show = document.querySelector('#input-form');
    // this.show.setAttribute('display', 'block');
    this.show.style.display = 'block';

    this.message = this.add.text(130, 200, " ", {
      color: "#fff",
      fontSize: 20,
      fontStyle: "bold"
    }).setOrigin(0.5);

  this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.returnKey.on("down", event => {
        let name = this.nameInput.value;
        if(name != "") {
            this.message.setText("Player: " + name);
            this.nameInput.value = "";
            this.show.style.display = 'none';
        }

        let grab = '';
        // const playerInfo = document.querySelector('.playerScore');
        const playerInfo = { "user": name, "score":  this.finalScore};
    
        // "Game with ID: ip0JlGDyAdoLM8OImZTq
        
        //   TO POST THE SCORES:
        //   /games/:id/scores/
    
        grab = postData('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ip0JlGDyAdoLM8OImZTq/scores/', playerInfo)
        .then(function (response) {
            if (response.ok) { 
              return response.json();
            }
          return Promise.reject(response);
          }).then(function (data) {
            
            // console.log(data);
            // console.log(data.result);
            
          }).catch(function (error) {
            // console.warn('Something went wrong.', error);
          });

          this.scene.start('Score');
    });


   

      
    // console.log('This is grab:' + grab);
    // console.log('This is results:' + grab.result);
    // console.log(grab);


    async function postData(url = '', data = {}){
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      })
      let have = await response.json();
      // let have2 = have.then(function (data) {return data});
      // console.log('This is have: ' + have);
      return have;
    }
  }
};


