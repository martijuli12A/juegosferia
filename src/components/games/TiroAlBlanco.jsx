import React, { useState, useEffect, useRef } from 'react';
import GameTemplate from '../GameTemplate';
import Phaser from 'phaser';

const TiroAlBlanco = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([
    { id: 'novato', title: 'Novato', description: 'Alcanza 100 puntos', isUnlocked: false, requiredScore: 100 },
    { id: 'experto', title: 'Experto', description: 'Alcanza 500 puntos', isUnlocked: false, requiredScore: 500 },
    { id: 'maestro', title: 'Maestro', description: 'Alcanza 1000 puntos', isUnlocked: false, requiredScore: 1000 }
  ]);

  const preload = function() {
    this.load.image('background', '/assets/tiro/background.svg');
    this.load.image('rifle', '/assets/tiro/rifle.svg');
    this.load.image('target', '/assets/tiro/target.svg');
    this.load.image('pellet', '/assets/tiro/pellet.svg');
    this.load.audio('shoot', '/assets/tiro/shoot.mp3');
    this.load.audio('hit', '/assets/tiro/hit.mp3');
  };

  const create = function() {
    // Configuración del fondo
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Configuración del rifle
    const rifle = this.add.image(
      this.cameras.main.width * 0.2,
      this.cameras.main.height * 0.5,
      'rifle'
    ).setScale(0.3);

    // Configurar física
    this.physics.add.existing(rifle);
    rifle.body.setCollideWorldBounds(true);

    // Crear grupo de pellets
    const pellets = this.physics.add.group();
    
    // Crear blancos
    const targets = this.physics.add.group();
    const targetCount = 3 + level; // Aumenta con el nivel

    for (let i = 0; i < targetCount; i++) {
      const target = this.add.image(
        Phaser.Math.Between(100, this.cameras.main.width - 100),
        Phaser.Math.Between(100, this.cameras.main.height - 100),
        'target'
      ).setScale(0.2);

      this.physics.add.existing(target);
      target.body.setVelocityX(Phaser.Math.Between(-100, 100));
      target.body.setBounce(1, 0);
      target.body.setCollideWorldBounds(true);
      targets.add(target);
    }

    // Configurar controles
    this.input.on('pointerdown', (pointer) => {
      const angle = Phaser.Math.Angle.Between(
        rifle.x, rifle.y,
        pointer.x, pointer.y
      );
      
      rifle.rotation = angle;
      
      // Disparar
      const pellet = this.add.image(rifle.x, rifle.y, 'pellet')
        .setScale(0.1);
      
      this.physics.add.existing(pellet);
      pellet.body.setVelocity(
        Math.cos(angle) * 500,
        Math.sin(angle) * 500
      );

      pellets.add(pellet);

      // Sonido de disparo
      this.sound.play('shoot');

      // Auto-destrucción del pellet
      this.time.delayedCall(3000, () => {
        pellet.destroy();
      });
    });

    // Detectar colisiones entre pellets y blancos
    this.physics.add.overlap(pellets, targets, (pellet, target) => {
      target.destroy();
      pellet.destroy();
      
      // Sonido de impacto
      this.sound.play('hit');
      
      // Actualizar puntuación
      const points = 10 * level;
      setScore(prevScore => {
        const newScore = prevScore + points;
        
        // Verificar logros
        achievements.forEach(achievement => {
          if (!achievement.isUnlocked && newScore >= achievement.requiredScore) {
            achievement.isUnlocked = true;
            // Mostrar notificación de logro
            const achievementText = this.add.text(
              this.cameras.main.width / 2,
              this.cameras.main.height / 2,
              `¡Logro desbloqueado!\n${achievement.title}`,
              { fontSize: '32px', fill: '#ff0' }
            ).setOrigin(0.5);
            
            // Desvanecer el texto después de 2 segundos
            this.tweens.add({
              targets: achievementText,
              alpha: 0,
              duration: 2000,
              onComplete: () => achievementText.destroy()
            });
          }
        });

        // Verificar siguiente nivel
        if (newScore >= level * 100) {
          setLevel(prevLevel => prevLevel + 1);
          // Mostrar notificación de nivel
          const levelText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            `¡Nivel ${level + 1} desbloqueado!`,
            { fontSize: '32px', fill: '#0f0' }
          ).setOrigin(0.5);
          
          // Desvanecer el texto después de 2 segundos
          this.tweens.add({
            targets: levelText,
            alpha: 0,
            duration: 2000,
            onComplete: () => levelText.destroy()
          });
        }

        return newScore;
      });
    });
  };

  const update = function() {
    // Lógica de actualización del juego
  };

  return (
    <GameTemplate
      gameId="tiro"
      title="Tiro al Blanco"
      maxScore={1000}
      onGameComplete={() => console.log('Juego completado!')}
      preload={preload}
      create={create}
      update={update}
    />
  );
};

export default TiroAlBlanco; 