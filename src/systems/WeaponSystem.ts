import * as Phaser from 'phaser';
import { WeaponConfig } from '../types';

export class WeaponSystem {
  private scene: Phaser.Scene;
  private player: Phaser.GameObjects.Sprite;
  private weapons: Map<string, ActiveWeapon> = new Map();
  private targetingRange: number = 300;

  constructor(scene: Phaser.Scene, player: Phaser.GameObjects.Sprite) {
    this.scene = scene;
    this.player = player;
    
    this.scene.events.on('shutdown', this.cleanup, this);
  }

  addWeapon(config: WeaponConfig): void {
    const weapon: ActiveWeapon = {
      config,
      level: 1,
      lastFired: 0,
      cooldownRemaining: 0
    };
    
    this.weapons.set(config.id, weapon);
  }

  update(time: number, delta: number, enemies: Phaser.GameObjects.Sprite[]): void {
    this.weapons.forEach((weapon) => {
      weapon.cooldownRemaining = Math.max(0, weapon.cooldownRemaining - delta);
      
      if (weapon.cooldownRemaining <= 0) {
        this.tryFireWeapon(weapon, enemies, time);
      }
    });
  }

  private tryFireWeapon(weapon: ActiveWeapon, enemies: Phaser.GameObjects.Sprite[], time: number): void {
    const target = this.findClosestEnemy(enemies);
    if (!target) return;

    this.fireWeapon(weapon, target);
    weapon.cooldownRemaining = weapon.config.cooldown;
    weapon.lastFired = time;
  }

  private findClosestEnemy(enemies: Phaser.GameObjects.Sprite[]): Phaser.GameObjects.Sprite | null {
    let closest: Phaser.GameObjects.Sprite | null = null;
    let minDistance = this.targetingRange;

    enemies.forEach(enemy => {
      if (!enemy.active) return;
      
      const distance = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        enemy.x, enemy.y
      );
      
      if (distance < minDistance) {
        closest = enemy;
        minDistance = distance;
      }
    });

    return closest;
  }

  private fireWeapon(weapon: ActiveWeapon, target: Phaser.GameObjects.Sprite): void {
    const damage = this.calculateDamage(weapon);
    
    this.scene.events.emit('weapon-fired', {
      weaponId: weapon.config.id,
      damage,
      damageType: weapon.config.damageType,
      target,
      player: this.player
    });
  }

  private calculateDamage(weapon: ActiveWeapon): number {
    const upgrade = weapon.config.upgrades[weapon.level - 1];
    return weapon.config.baseDamage + (upgrade?.damageBonus || 0);
  }

  upgradeWeapon(weaponId: string): boolean {
    const weapon = this.weapons.get(weaponId);
    if (!weapon || weapon.level >= weapon.config.upgrades.length) {
      return false;
    }

    weapon.level++;
    this.scene.events.emit('weapon-upgraded', { weaponId, newLevel: weapon.level });
    return true;
  }

  private cleanup(): void {
    this.scene.events.off('shutdown', this.cleanup, this);
    this.weapons.clear();
  }
}

interface ActiveWeapon {
  config: WeaponConfig;
  level: number;
  lastFired: number;
  cooldownRemaining: number;
}