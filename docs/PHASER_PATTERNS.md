# Phaser 3 Development Patterns

## Scene Management Best Practices

### Scene Lifecycle
```typescript
class GameplayScene extends Phaser.Scene {
  preload() {
    // Load scene-specific assets only
  }
  
  create() {
    // Initialize systems in dependency order
    // Set up event listeners
    // Create UI elements last
  }
  
  update(time: number, delta: number) {
    // Update all systems with delta time
    // Keep update logic minimal and delegated
  }
}
```

### Scene Transitions
```typescript
// Proper scene switching
this.scene.start('GameplayScene', { weaponChoice: 'antibody-dart' });
this.scene.pause('GameplayScene');
this.scene.launch('PauseScene');
```

## Object Pooling Implementation

### Pool Pattern
```typescript
class EntityPool<T extends Phaser.GameObjects.GameObject> {
  private pool: T[] = [];
  private activeCount = 0;
  
  get(): T {
    if (this.pool.length > this.activeCount) {
      return this.pool[this.activeCount++];
    }
    return this.createNew();
  }
  
  release(entity: T): void {
    entity.setActive(false).setVisible(false);
    this.activeCount--;
  }
}
```

### When to Use Pooling
- Projectiles (high frequency spawn/destroy)
- Enemies (moderate frequency)
- Particle effects
- UI elements that appear/disappear frequently

## Physics and Collision

### Collision Groups
```typescript
// Define collision categories
const COLLISION_CATEGORIES = {
  PLAYER: 1,
  ENEMY: 2,
  PROJECTILE: 4,
  PICKUP: 8,
  ENVIRONMENT: 16
};
```

### Efficient Collision Detection
```typescript
// Use overlap for non-physical collisions
this.physics.add.overlap(projectiles, enemies, this.handleProjectileHit);

// Use collider for physical interactions
this.physics.add.collider(player, enemies, this.handlePlayerHit);
```

## Performance Optimization

### Texture Management
```typescript
// Use texture atlases for batching
this.load.atlas('game-atlas', 'sprites/game-atlas.png', 'sprites/game-atlas.json');

// Efficient sprite creation
const sprite = this.add.sprite(x, y, 'game-atlas', 'enemy-virus');
```

### Update Loop Optimization
```typescript
// Avoid expensive operations in update()
update(time: number, delta: number) {
  // Good: use delta for frame-rate independence
  this.player.update(delta);
  
  // Bad: expensive calculations every frame
  // const distance = Phaser.Math.Distance.Between(a, b);
  
  // Good: cache or throttle expensive operations
  if (time - this.lastExpensiveOperation > 100) {
    this.performExpensiveOperation();
    this.lastExpensiveOperation = time;
  }
}
```

## Damage Type Visual Effects

### Particle Effect Patterns
```typescript
// Viral damage particles
createViralEffect(x: number, y: number) {
  const particles = this.add.particles(x, y, 'game-atlas', {
    frame: 'viral-particle',
    scale: { start: 0.8, end: 0 },
    tint: 0x9900FF, // Purple
    lifespan: 800,
    quantity: 8,
    alpha: { start: 1, end: 0 },
    emitZone: { type: 'random', source: new Phaser.Geom.Circle(0, 0, 20) }
  });
}

// Toxic damage bubbles
createToxicEffect(x: number, y: number) {
  const bubbles = this.add.particles(x, y, 'game-atlas', {
    frame: 'bubble-particle',
    scale: { start: 0.3, end: 1.2 },
    tint: 0x00FF44, // Green
    lifespan: 1200,
    quantity: 5,
    speed: { min: 10, max: 30 },
    gravityY: -50
  });
}

// Physical impact flash
createPhysicalEffect(x: number, y: number) {
  const flash = this.add.sprite(x, y, 'game-atlas', 'impact-flash');
  flash.setTint(0xFFFFFF).setScale(1.5);
  this.tweens.add({
    targets: flash,
    alpha: 0,
    scale: 0.5,
    duration: 200,
    onComplete: () => flash.destroy()
  });
}
```

### Enemy Telegraph System
```typescript
// Warning animation before enemy attacks
showEnemyTelegraph(enemy: Enemy, attackType: string) {
  const warning = this.add.sprite(enemy.x, enemy.y, 'game-atlas', 'warning-indicator');
  warning.setTint(0xFF4444).setAlpha(0.7);
  
  this.tweens.add({
    targets: warning,
    scale: { from: 0.5, to: 1.5 },
    duration: 500,
    yoyo: true,
    onComplete: () => {
      warning.destroy();
      enemy.executeAttack(attackType);
    }
  });
}
```

### Weapon Mastery Effects
```typescript
// Visual transformation for max-level weapons
applyMasteryEffect(weapon: Weapon) {
  switch(weapon.id) {
    case 'phagocytosis-burst':
      // Electrical crackling around player
      this.addElectricalAura(this.player);
      break;
    case 'antibody-dart':
      // Tracer trails on projectiles
      weapon.projectiles.forEach(p => this.addTracerTrail(p));
      break;
    case 'cytokine-spray':
      // Enhanced particle density
      weapon.particleDensity *= 2;
      weapon.glowIntensity = 1.5;
      break;
  }
}
```

## Event System Usage

### Custom Events
```typescript
// Emit game events with damage type info
this.events.emit('enemy-defeated', { enemy, xpValue, damageType });
this.events.emit('player-levelup', { newLevel });
this.events.emit('combo-increased', { streak, multiplier });

// Listen for events in other systems
this.events.on('player-levelup', this.showUpgradeMenu, this);
this.events.on('combo-increased', this.updateComboUI, this);
```

## Input Handling

### Movement Input
```typescript
// Continuous input for smooth movement
const cursors = this.input.keyboard.createCursorKeys();
const wasd = this.input.keyboard.addKeys('W,S,A,D');

// In update loop
const velocity = new Phaser.Math.Vector2();
if (cursors.left.isDown || wasd.A.isDown) velocity.x = -1;
if (cursors.right.isDown || wasd.D.isDown) velocity.x = 1;
// ... etc
```

### Action Input
```typescript
// One-time actions
this.input.keyboard.on('keydown-SPACE', this.activateSpecialSkill, this);
```

## Damage Number Implementation

### Floating Combat Text
```typescript
class DamageNumber extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, damage: number, damageType: string, isCritical: boolean = false) {
    super(scene, x, y);
    
    const color = this.getDamageColor(damageType);
    const size = isCritical ? 24 : 16;
    
    const text = scene.add.text(0, 0, damage.toString(), {
      fontSize: `${size}px`,
      color: color,
      stroke: '#000000',
      strokeThickness: 2
    });
    
    this.add(text);
    
    // Animation based on damage type
    this.animateByType(damageType, isCritical);
  }
  
  private getDamageColor(damageType: string): string {
    switch(damageType) {
      case 'viral': return '#9900FF';
      case 'toxic': return '#00FF44';
      case 'physical': return '#FFFFFF';
      default: return '#FFFFFF';
    }
  }
  
  private animateByType(damageType: string, isCritical: boolean) {
    const baseY = this.y;
    const duration = isCritical ? 1200 : 800;
    
    this.scene.tweens.add({
      targets: this,
      y: baseY - 60,
      alpha: 0,
      duration: duration,
      ease: 'Power2',
      onComplete: () => this.destroy()
    });
    
    // Type-specific effects
    if (damageType === 'viral') {
      this.scene.tweens.add({
        targets: this,
        scaleX: { from: 1, to: 0.8 },
        scaleY: { from: 1, to: 0.8 },
        duration: duration * 0.3,
        yoyo: true
      });
    }
  }
}
```

## Combo UI Patterns

### Streak Display
```typescript
class ComboDisplay extends Phaser.GameObjects.Container {
  private streakText: Phaser.GameObjects.Text;
  private glowEffect: Phaser.GameObjects.Graphics;
  
  updateCombo(streak: number, multiplier: number) {
    this.streakText.setText(`${streak}x COMBO`);
    this.streakText.setScale(1.2);
    
    // Glow intensity based on multiplier
    const glowAlpha = Math.min(multiplier / 5, 1);
    this.glowEffect.setAlpha(glowAlpha);
    
    // Scale animation
    this.scene.tweens.add({
      targets: this.streakText,
      scale: 1,
      duration: 200,
      ease: 'Back.out'
    });
  }
}
```

## Memory Management

### Cleanup Patterns
```typescript
// Always clean up in scene shutdown
shutdown() {
  this.events.off('player-levelup', this.showUpgradeMenu, this);
  this.weaponSystem.destroy();
  this.enemyPool.clear();
}
```

### Texture Cleanup
```typescript
// Remove unused textures
this.textures.remove('temporary-texture');
```

## Threat Indicator System

### Off-Screen Enemy Indicators
```typescript
class ThreatIndicator extends Phaser.GameObjects.Container {
  private arrow: Phaser.GameObjects.Sprite;
  private pulseTimer: Phaser.Time.TimerEvent;
  
  constructor(scene: Phaser.Scene, enemy: Enemy) {
    super(scene, 0, 0);
    
    this.arrow = scene.add.sprite(0, 0, 'game-atlas', 'threat-arrow');
    this.arrow.setTint(enemy.isBoss ? 0xFF8800 : 0xFF4444);
    this.add(this.arrow);
    
    // Position at screen edge pointing toward enemy
    this.updatePosition(enemy);
    
    // Pulse animation based on proximity
    this.startPulseAnimation(enemy);
  }
  
  updatePosition(enemy: Enemy) {
    const player = this.scene.player;
    const angle = Phaser.Math.Angle.Between(player.x, player.y, enemy.x, enemy.y);
    const distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    
    // Position at screen edge
    const screenEdge = this.getScreenEdgePosition(angle);
    this.setPosition(screenEdge.x, screenEdge.y);
    this.arrow.setRotation(angle);
    
    // Intensity based on distance
    const intensity = Math.max(0.3, 1 - (distance / 800));
    this.arrow.setAlpha(intensity);
  }
}
```