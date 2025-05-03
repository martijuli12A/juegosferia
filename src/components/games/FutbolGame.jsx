import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import Phaser from 'phaser';

const FutbolGame = () => {
  const [score, setScore] = useState(0);

  const preload = function() {
    this.load.image('background', '/assets/futbol/background.svg');
    this.load.image('ball', '/assets/futbol/ball.svg');
    this.load.image('goal', '/assets/futbol/goal.svg');
  };

  const create = function() {
    // Configuración del fondo
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Crear portería
    const goal = this.add.image(
      this.cameras.main.width * 0.8,
      this.cameras.main.height * 0.5,
      'goal'
    ).setScale(0.5);

    // Crear pelota
    const ball = this.add.image(
      this.cameras.main.width * 0.2,
      this.cameras.main.height * 0.5,
      'ball'
    ).setScale(0.3);

    // Configurar física
    this.physics.add.existing(ball);
    ball.body.setCollideWorldBounds(true);
    ball.body.setBounce(0.7);
    ball.body.setDamping(true);
    ball.body.setDrag(0.98);

    // Variables para el tiro
    let power = 0;
    let angle = 0;
    let isCharging = false;
    const maxPower = 1000;

    // Crear indicador de potencia y dirección
    const powerBar = this.add.graphics();
    const directionLine = this.add.graphics();
    const powerBarWidth = 200;
    const powerBarHeight = 20;

    // Configurar controles
    this.input.on('pointerdown', () => {
      isCharging = true;
      power = 0;
    });

    this.input.on('pointermove', (pointer) => {
      if (isCharging) {
        // Calcular ángulo basado en la posición del ratón
        angle = Phaser.Math.Angle.Between(
          ball.x, ball.y,
          pointer.x, pointer.y
        );

        // Actualizar línea de dirección
        directionLine.clear();
        directionLine.lineStyle(2, 0xffffff);
        directionLine.beginPath();
        directionLine.moveTo(ball.x, ball.y);
        directionLine.lineTo(
          ball.x + Math.cos(angle) * 100,
          ball.y + Math.sin(angle) * 100
        );
        directionLine.strokePath();
      }
    });

    this.input.on('pointerup', () => {
      if (isCharging) {
        isCharging = false;
        ball.body.setVelocity(
          Math.cos(angle) * power,
          Math.sin(angle) * power
        );
        power = 0;
        directionLine.clear();
      }
    });

    // Actualizar potencia
    this.time.addEvent({
      delay: 16,
      callback: () => {
        if (isCharging) {
          power = Math.min(power + 10, maxPower);
          
          // Actualizar barra de potencia
          powerBar.clear();
          powerBar.fillStyle(0xffffff);
          powerBar.fillRect(
            ball.x - powerBarWidth / 2,
            ball.y - 50,
            powerBarWidth,
            powerBarHeight
          );
          powerBar.fillStyle(0x00ff00);
          powerBar.fillRect(
            ball.x - powerBarWidth / 2,
            ball.y - 50,
            (power / maxPower) * powerBarWidth,
            powerBarHeight
          );
        } else {
          powerBar.clear();
        }
      },
      loop: true
    });

    // Detectar gol
    this.physics.add.overlap(ball, goal, (ball, goal) => {
      if (ball.body.velocity.length() > 100) {
        setScore(prevScore => prevScore + 10);
        
        // Resetear pelota
        ball.x = this.cameras.main.width * 0.2;
        ball.y = this.cameras.main.height * 0.5;
        ball.body.setVelocity(0, 0);
      }
    });
  };

  const update = function() {
    // Lógica de actualización del juego
  };

  return (
    <GameTemplate
      gameId="futbol"
      title="Gol Mexicano"
      maxScore={50}
      onGameComplete={() => console.log('Juego completado!')}
      preload={preload}
      create={create}
      update={update}
    />
  );
};

export default FutbolGame; 