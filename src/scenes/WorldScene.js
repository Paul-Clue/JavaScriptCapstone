import 'phaser';
 
export default class WorldScene extends Phaser.Scene {
 
  constructor () {
    super('World');
  }

  
   init(){
       this.score = 0;
    //    this.scoreText = '';
       this.text;
       this.timedEvent;
   }
  

  
  create ()
  {

   
 

    let map = this.make.tilemap({ key: 'map' });

    let tiles = map.addTilesetImage('spritesheet', 'tiles');
        
	let grass = map.createStaticLayer('Grass', tiles, 0, 0);

    this.player = this.physics.add.sprite(50, 100, 'player', 6);
    
    for(let i = 0; i < Phaser.Math.RND.between(1, 32); i++) {
        this.stars = this.physics.add.group({
            key: 'star',
            // repeat: 1,
            // setXY: { x: Phaser.Math.RND.between(0, this.physics.world.bounds.width), y: Phaser.Math.RND.between(0, this.physics.world.bounds.height), stepX: Phaser.Math.RND.between(0, this.physics.world.bounds.height), stepY: Phaser.Math.RND.between(0, this.physics.world.bounds.height)}
            setXY: { x: Phaser.Math.RND.between(10, 315), y: Phaser.Math.RND.between(10, 235)}
        });

        // this.physics.add.collider(this.stars, grass);
        // this.physics.add.collider(this.stars, obstacles);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        // this.physics.add.overlap(this.stars, obstacles, this.clearObstacle2, null, this);

    }


    this.text = this.add.text(32, 32).setScrollFactor(0);
    

    this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.gameOver, callbackScope: this, loop: true });

    // this.text.setText('Event.progress: ' + this.timedEvent.getProgress().toString().substr(0, 4));

    let obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '15px', fill: '#000' }).setScrollFactor(0);
        // this.scoreText.fixedToCamera = true;
        // this.scoreText.cameraOffset.setTo(200, 500);
        // this.add.image(400, 300, 'hotdog').setScrollFactor(0);

    

    this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
       
        this.cameras.main.roundPixels = true;

         //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
         this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
          frameRate: 10,
          repeat: -1
      });
      
      // animation with key 'right'
      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
          key: 'down',
          frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
          frameRate: 10,
          repeat: -1
      });

      this.physics.add.collider(this.player, obstacles);

      
      
    
      
    
    // this.stars.children.iterate(function (child) {
    
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    // });

    this.physics.add.collider(this.stars, grass);
    this.physics.add.collider(this.stars, obstacles);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    

  }

  

  gameOver(){
    this.scene.start('Game', {score: Phaser.Math.FloorTo(this.score)});
  }
    collectStar(player, star){
        star.disableBody(true, true);

        if (this.stars.countActive(true) === 0){
            this.scene.start('Game', {score: Phaser.Math.FloorTo(this.score)});
        }
    }

    // update2(){
    //     console.log('does this ever run');
    //     this.add.text('Event.progress: ' + this.timedEvent.getProgress().toString().substr(0, 4));
    // }
    
    

  update(time, delta){
    this.text.setText('TIME: ' + this.timedEvent.getProgress().toString().substr(0, 4));
    this.score += this.timedEvent.getProgress();
	  this.player.body.setVelocity(0);
 
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }
 
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }    

        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }
  }
};