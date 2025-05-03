import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import Phaser from 'phaser';

const TiroAlBlancoGame = () => {
  const [score, setScore] = useState(0);

  const preload = function() {
    this.load.image('background', '/assets/tiro/background.svg');
    this.load.image('target', '/assets/tiro/target.svg');
    this.load.image('arrow', '/assets/tiro/arrow.svg');
  };

  const create = function() {
    // Configuración del fondo
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Crear diana
    const target = this.add.image(
      this.cameras.main.width * 0.8,
      this.cameras.main.height * 0.5,
      'target'
    ).setScale(0.5);

    // Crear flecha
    const arrow = this.add.image(
      this.cameras.main.width * 0.2,
      this.cameras.main.height * 0.5,
      'arrow'
    ).setScale(0.3);

    // Configurar física
    this.physics.add.existing(arrow);
    arrow.body.setCollideWorldBounds(true);
    arrow.body.setBounce(0.3);

    // Variables para el lanzamiento
    let power = 0;
    let angle = 0;
    let isCharging = false;
    const maxPower = 1000;

    // Crear indicador de potencia
    const powerBar = this.add.graphics();
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
          arrow.x, arrow.y,
          pointer.x, pointer.y
        );
        arrow.rotation = angle + Math.PI / 2;
      }
    });

    this.input.on('pointerup', () => {
      if (isCharging) {
        isCharging = false;
        arrow.body.setVelocity(
          Math.cos(angle) * power,
          Math.sin(angle) * power
        );
        power = 0;
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
            arrow.x - powerBarWidth / 2,
            arrow.y - 50,
            powerBarWidth,
            powerBarHeight
          );
          powerBar.fillStyle(0xff0000);
          powerBar.fillRect(
            arrow.x - powerBarWidth / 2,
            arrow.y - 50,
            (power / maxPower) * powerBarWidth,
            powerBarHeight
          );
        } else {
          powerBar.clear();
        }
      },
      loop: true
    });

    // Detectar colisiones con la diana
    this.physics.add.overlap(arrow, target, (arrow, target) => {
      const distance = Phaser.Math.Distance.Between(
        arrow.x, arrow.y,
        target.x, target.y
      );
      
      let points = 0;
      if (distance < 20) points = 50;
      else if (distance < 40) points = 30;
      else if (distance < 60) points = 20;
      else if (distance < 80) points = 10;
      
      if (points > 0) {
        setScore(prevScore => prevScore + points);
        
        // Resetear flecha
        arrow.x = this.cameras.main.width * 0.2;
        arrow.y = this.cameras.main.height * 0.5;
        arrow.body.setVelocity(0, 0);
      }
    });
  };

  const update = function() {
    // Lógica de actualización del juego
  };

  return (
    <GameTemplate
      gameId="tiro-al-blanco"
      title="Tiro al Blanco"
      maxScore={100}
      onGameComplete={() => console.log('Juego completado!')}
      preload={preload}
      create={create}
      update={update}
    />
  );
};

export default TiroAlBlancoGame; 