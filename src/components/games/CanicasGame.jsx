import React, { useEffect, useState } from 'react';
import GameTemplate from '../GameTemplate';

const CanicasGame = () => {
  const [score, setScore] = useState(0);
  const [gameInstance, setGameInstance] = useState(null);

  const preload = function() {
    this.load.image('background', '/assets/canicas/background.png');
    this.load.image('marble', '/assets/canicas/marble.png');
    this.load.image('hole', '/assets/canicas/hole.png');
  };

  const create = function() {
    // Configuración del fondo
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Crear hoyos
    const holes = [];
    const holePositions = [
      { x: 0.2, y: 0.2 },
      { x: 0.8, y: 0.2 },
      { x: 0.5, y: 0.5 },
      { x: 0.2, y: 0.8 },
      { x: 0.8, y: 0.8 }
    ];

    holePositions.forEach(pos => {
      const hole = this.add.image(
        this.cameras.main.width * pos.x,
        this.cameras.main.height * pos.y,
        'hole'
      ).setScale(0.5);
      holes.push(hole);
    });

    // Crear canica del jugador
    const marble = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.9,
      'marble'
    ).setScale(0.3);

    // Configurar física
    this.physics.add.existing(marble);
    marble.body.setCollideWorldBounds(true);
    marble.body.setBounce(0.7);

    // Configurar controles
    this.input.on('pointerdown', (pointer) => {
      const angle = Phaser.Math.Angle.Between(
        marble.x, marble.y,
        pointer.x, pointer.y
      );
      
      const force = 300;
      marble.body.setVelocity(
        Math.cos(angle) * force,
        Math.sin(angle) * force
      );
    });

    // Detectar colisiones con hoyos
    this.physics.add.overlap(marble, holes, (marble, hole) => {
      if (marble.body.velocity.length() < 50) {
        marble.x = this.cameras.main.width / 2;
        marble.y = this.cameras.main.height * 0.9;
        marble.body.setVelocity(0, 0);
        setScore(prevScore => prevScore + 10);
      }
    });
  };

  const update = function() {
    // Lógica de actualización del juego
  };

  return (
    <GameTemplate
      gameId="canicas"
      title="Juego de Canicas"
      maxScore={50}
      onGameComplete={() => console.log('Juego completado!')}
      preload={preload}
      create={create}
      update={update}
    />
  );
};

export default CanicasGame; 