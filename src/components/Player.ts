import * as Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
  private health: number;
  private maxHealth: number;
  private speed: number;
  private invulnerable: boolean = false;
  private invulnerabilityTimer: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'game-atlas', 'player');
    
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.speed = 150;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setSize(24, 24);
  }

  update(delta: number): void {
    this.handleMovement();
    this.updateInvulnerability(delta);
  }

  private handleMovement(): void {
    const cursors = this.scene.input.keyboard?.createCursorKeys();
    const wasd = this.scene.input.keyboard?.addKeys('W,S,A,D');
    const body = this.body as Phaser.Physics.Arcade.Body;

    const velocity = new Phaser.Math.Vector2();
    
    if (cursors?.left.isDown || wasd?.A.isDown) velocity.x = -1;
    if (cursors?.right.isDown || wasd?.D.isDown) velocity.x = 1;
    if (cursors?.up.isDown || wasd?.W.isDown) velocity.y = -1;
    if (cursors?.down.isDown || wasd?.S.isDown) velocity.y = 1;

    velocity.normalize().scale(this.speed);
    body.setVelocity(velocity.x, velocity.y);
  }

  private updateInvulnerability(delta: number): void {
    if (this.invulnerable) {
      this.invulnerabilityTimer -= delta;
      this.setAlpha(Math.sin(this.invulnerabilityTimer * 0.01) * 0.5 + 0.5);
      
      if (this.invulnerabilityTimer <= 0) {
        this.invulnerable = false;
        this.setAlpha(1);
      }
    }
  }

  takeDamage(damage: number): boolean {
    if (this.invulnerable) return false;

    this.health = Math.max(0, this.health - damage);
    this.invulnerable = true;
    this.invulnerabilityTimer = 1000;

    this.scene.events.emit('player-damaged', { health: this.health, maxHealth: this.maxHealth });

    if (this.health <= 0) {
      this.scene.events.emit('player-died');
      return true;
    }
    return false;
  }

  getHealth(): number {
    return this.health;
  }

  getMaxHealth(): number {
    return this.maxHealth;
  }
}