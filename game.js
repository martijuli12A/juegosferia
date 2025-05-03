const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let player;
let stars;
let score = 0;
let scoreText;

function preload() {
    // Cargar imágenes
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
    this.load.image('star', 'https://labs.phaser.io/assets/sprites/star.png');
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
}

function create() {
    // Añadir fondo
    this.add.image(400, 300, 'sky');

    // Crear jugador
    player = this.physics.add.sprite(400, 500, 'player');
    player.setCollideWorldBounds(true);

    // Crear estrellas
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    // Hacer que las estrellas reboten
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Colisión entre jugador y estrellas
    this.physics.add.collider(player, stars, collectStar, null, this);

    // Texto de puntuación
    scoreText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
    // Movimiento del jugador
    const cursors = this.input.keyboard.createCursorKeys();
    
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Puntos: ' + score);
} 