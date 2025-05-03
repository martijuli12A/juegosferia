import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import Phaser from 'phaser';

const PescaGame = () => {
  const [score, setScore] = useState(0);

  const preload = function() {
    this.load.image('background', '/assets/pesca/background.svg');
    this.load.image('fish1', '/assets/pesca/fish1.svg');
    this.load.image('fish2', '/assets/pesca/fish2.svg');
    this.load.image('fishingRod', '/assets/pesca/fishingRod.svg');
    this.load.image('water', '/assets/pesca/water.svg');
  };

  const create = function() {
    // Configuración del fondo
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Crear agua
    const water = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.7,
      'water'
    ).setScale(0.5);

    // Crear caña de pescar
    const fishingRod = this.add.image(
      this.cameras.main.width * 0.2,
      this.cameras.main.height * 0.3,
      'fishingRod'
    ).setScale(0.3);

    // Configurar física
    this.physics.add.existing(fishingRod);
    fishingRod.body.setCollideWorldBounds(true);

    // Crear peces
    const fishes = [];
    const fishTypes = ['fish1', 'fish2'];
    const fishCount = 5;

    for (let i = 0; i < fishCount; i++) {
      const fish = this.add.image(
        Phaser.Math.Between(100, this.cameras.main.width - 100),
        Phaser.Math.Between(this.cameras.main.height * 0.5, this.cameras.main.height * 0.9),
        fishTypes[Phaser.Math.Between(0, 1)]
      ).setScale(0.2);

      this.physics.add.existing(fish);
      fish.body.setVelocityX(Phaser.Math.Between(-100, 100));
      fish.body.setBounce(1, 0);
      fish.body.setCollideWorldBounds(true);
      fishes.push(fish);
    }

    // Configurar controles
    this.input.on('pointerdown', (pointer) => {
      const angle = Phaser.Math.Angle.Between(
        fishingRod.x, fishingRod.y,
        pointer.x, pointer.y
      );
      
      fishingRod.rotation = angle;
      
      // Lanzar la caña
      const force = 300;
      fishingRod.body.setVelocity(
        Math.cos(angle) * force,
        Math.sin(angle) * force
      );
    });

    // Detectar colisiones con peces
    fishes.forEach(fish => {
      this.physics.add.overlap(fishingRod, fish, (rod, fish) => {
        if (rod.body.velocity.length() > 50) {
          fish.destroy();
          setScore(prevScore => prevScore + 10);
          
          // Resetear caña
          fishingRod.x = this.cameras.main.width * 0.2;
          fishingRod.y = this.cameras.main.height * 0.3;
          fishingRod.body.setVelocity(0, 0);
        }
      });
    });
  };

  const update = function() {
    // Lógica de actualización del juego
  };

  return (
    <GameTemplate
      gameId="pesca"
      title="Pesca Mexicana"
      maxScore={50}
      onGameComplete={() => console.log('Juego completado!')}
      preload={preload}
      create={create}
      update={update}
    />
  );
};

export default PescaGame; 