import 'phaser'; // eslint-disable-line

export default class WorldScene extends Phaser.Scene { // eslint-disable-line
  constructor() {
    super('World');
  }

  init() {
    this.score = 0;
    this.text; // eslint-disable-line
    this.timedEvent; // eslint-disable-line
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    const grass = map.createStaticLayer('Grass', tiles, 0, 0);

    this.player = this.physics.add.sprite(50, 100, 'player', 6);

    for (let i = 0; i < Phaser.Math.RND.between(1, 32); i += 1) { // eslint-disable-line
      this.stars = this.physics.add.group({
        key: 'star',

        setXY: { x: Phaser.Math.RND.between(10, 315), y: Phaser.Math.RND.between(10, 235) }, // eslint-disable-line
      });

      this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }

    this.text = this.add.text(32, 32).setScrollFactor(0);

    this.timedEvent = this.time.addEvent({
      delay: 10000, callback: this.gameOver, callbackScope: this, loop: true,
    });

    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.cameras.main.roundPixels = true;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, obstacles);

    this.physics.add.collider(this.stars, grass);
    this.physics.add.collider(this.stars, obstacles);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  gameOver() {
    this.scene.start('Game', { score: Phaser.Math.FloorTo(this.score) }); // eslint-disable-line
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    if (this.stars.countActive(true) === 0) {
      this.scene.start('Game', { score: Phaser.Math.FloorTo(this.score) });// eslint-disable-line
    }
  }

  update() {
    this.text.setText(`TIME: ${this.timedEvent.getProgress().toString().substr(0, 4)}`);
    this.score += this.timedEvent.getProgress();
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }
}