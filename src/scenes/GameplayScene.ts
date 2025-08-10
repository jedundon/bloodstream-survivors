import * as Phaser from 'phaser';
import { Player } from '../components/Player';
import { WeaponSystem } from '../systems/WeaponSystem';

export class GameplayScene extends Phaser.Scene {
  private player!: Player;
  private weaponSystem!: WeaponSystem;
  private enemies!: Phaser.Physics.Arcade.Group;
  private gameTimer: number = 0;
  private readonly GAME_DURATION = 20 * 60 * 1000; // 20 minutes

  constructor() {
    super({ key: 'GameplayScene' });
  }

  create(): void {
    this.setupWorld();
    this.createPlayer();
    this.createSystems();
    this.setupInput();
    this.setupEventListeners();
  }

  private setupWorld(): void {
    this.physics.world.setBounds(0, 0, 1920, 1080);
    this.cameras.main.setBounds(0, 0, 1920, 1080);
  }

  private createPlayer(): void {
    this.player = new Player(this, 960, 540);
    this.cameras.main.startFollow(this.player);
  }

  private createSystems(): void {
    this.enemies = this.physics.add.group();
    this.weaponSystem = new WeaponSystem(this, this.player);
  }

  private setupInput(): void {
    this.input.keyboard?.on('keydown-SPACE', this.activateSpecialSkill, this);
    this.input.keyboard?.on('keydown-ESC', this.pauseGame, this);
  }

  private setupEventListeners(): void {
    this.events.on('player-died', this.handlePlayerDeath, this);
    this.events.on('player-levelup', this.showUpgradeMenu, this);
  }

  update(time: number, delta: number): void {
    this.gameTimer += delta;
    
    if (this.gameTimer >= this.GAME_DURATION) {
      this.handleGameComplete();
      return;
    }

    this.player.update(delta);
    this.weaponSystem.update(time, delta, this.enemies.children.entries as Phaser.GameObjects.Sprite[]);
  }

  private activateSpecialSkill(): void {
    this.events.emit('special-skill-activated');
  }

  private pauseGame(): void {
    this.scene.pause();
    this.scene.launch('PauseScene');
  }

  private handlePlayerDeath(): void {
    this.scene.start('GameOverScene', { 
      survivalTime: this.gameTimer,
      finalScore: this.calculateScore() 
    });
  }

  private showUpgradeMenu(): void {
    this.scene.pause();
    this.scene.launch('UpgradeScene');
  }

  private handleGameComplete(): void {
    this.scene.start('VictoryScene', {
      survivalTime: this.gameTimer,
      finalScore: this.calculateScore()
    });
  }

  private calculateScore(): number {
    return Math.floor(this.gameTimer / 1000) * 10;
  }
}