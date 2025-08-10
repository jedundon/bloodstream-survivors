# Game Systems Implementation Guide

## Weapon System

### Implementation Requirements
Each weapon must implement the `IWeapon` interface with these properties:
- `damage`: Base damage value
- `damageType`: 'viral' | 'toxic' | 'physical'
- `tier`: 'common' | 'rare' | 'epic'
- `cooldown`: Time between attacks (milliseconds)
- `range`: Attack range in pixels
- `upgradeStats`: Array of upgrade effects per level
- `masteryEffect?`: Special visual/mechanical effect at max level

### Weapon Behavior Patterns

**Phagocytosis Burst**
```typescript
// Radial area attack at player position
// Check all enemies within radius
// Apply damage and knockback effect
// Visual: expanding circle particle effect
```

**Antibody Dart**
```typescript
// Single projectile in facing direction
// Pierces through enemies
// Speed: 400px/s, infinite range until screen edge
// Upgrade: additional projectiles fired simultaneously
```

**Cytokine Spray**
```typescript
// Multiple projectiles in cone pattern
// 45° cone angle, multiple small projectiles
// Each projectile has individual damage and physics
```

## Enemy Spawning System

### Wave Progression
- Enemies spawn at increasing rates over 20 minutes
- New enemy types introduced at specific time intervals
- Boss encounters at 5, 10, 15, 20 minute marks

### Spawn Mechanics
```typescript
interface SpawnRule {
  enemyType: string;
  spawnRate: number;    // enemies per second
  startTime: number;    // when this enemy starts spawning
  maxActive: number;    // maximum on screen at once
}
```

### Enemy Behaviors
- **Basic Movement**: Direct path to player with collision avoidance
- **Burst Movement**: Spike virus charges with speed bursts (telegraph: red glow)
- **Split Behavior**: Cluster virus creates smaller enemies on death
- **Attachment**: Parasites attach and apply debuffs
- **Telegraph System**: 0.5s warning animations before major attacks

### Enemy Resistance System
Each enemy has resistance/weakness to damage types:
- **Viral Resistance**: Reduces viral damage by percentage
- **Toxic Resistance**: Reduces toxic damage by percentage  
- **Physical Resistance**: Reduces physical damage by percentage
- **Resistance Values**: Range from -25% (weakness) to +50% (strong resistance)

## Boss System

### Weak Point Mechanics
Bosses require a two-phase approach:
1. **Weak Point Phase**: Attack specific weak points to disable abilities
2. **Core Phase**: Damage main health pool after all weak points destroyed

### Implementation Pattern
```typescript
class Boss extends Enemy {
  weakPoints: WeakPoint[];
  coreVulnerable: boolean = false;
  
  takeDamage(damage: number, hitPoint: Vector2) {
    if (!this.coreVulnerable) {
      // Route damage to nearest weak point
    } else {
      // Apply damage to core health
    }
  }
}
```

## XP and Progression System

### Level Up Flow
1. Collect XP orbs from defeated enemies
2. Reach XP threshold to trigger level up
3. Pause game and show upgrade choices
4. Player selects weapon upgrade or new weapon
5. Resume game with new abilities

### Upgrade Categories
- **New Weapon**: Add weapon to available slots (max 6)
- **Weapon Upgrade**: Improve existing weapon stats
- **Utility Upgrade**: Movement speed, health, XP gain multipliers

## Special Skills System

### Skill Implementation
Special skills are selected at game start and have fixed behavior:
- No upgrades during gameplay
- Fixed cooldowns and effects
- Activated by player input (spacebar/gamepad button)

### Skill Patterns
- **Instant Effects**: Micro-teleport, compression
- **Duration Buffs**: Immuno boost, receptor cloak
- **Targeting Effects**: Adhesion to enemy
- **Passive Effects**: Chemotactic pull (always active)

## Performance Systems

### Object Pooling Strategy
```typescript
class ProjectilePool {
  active: Projectile[] = [];
  inactive: Projectile[] = [];
  
  get(): Projectile;
  release(projectile: Projectile): void;
}
```

### Collision Optimization
- Spatial grid for broad-phase collision detection
- AABB (bounding box) checks before expensive collision tests
- Separate collision groups for different entity types

## Combo System

### Kill Streak Mechanics
- **Combo Multiplier**: 1.5x, 2x, 3x, 5x XP bonus for rapid kills
- **Combo Timer**: 3 seconds to maintain streak
- **Visual Feedback**: Particle trail intensity increases with combo level
- **Audio Feedback**: Ascending pitch for each combo level
- **Screen Effects**: Border glow intensity matches combo level

### Implementation Pattern
```typescript
class ComboSystem {
  currentStreak: number = 0;
  lastKillTime: number = 0;
  comboTimer: number = 3000; // 3 seconds
  
  onEnemyKilled(timestamp: number): number {
    if (timestamp - this.lastKillTime < this.comboTimer) {
      this.currentStreak++;
    } else {
      this.currentStreak = 1;
    }
    this.lastKillTime = timestamp;
    return this.getMultiplier();
  }
  
  getMultiplier(): number {
    if (this.currentStreak < 5) return 1.5;
    if (this.currentStreak < 10) return 2.0;
    if (this.currentStreak < 20) return 3.0;
    return 5.0;
  }
}
```

## Visual Feedback System

### Damage Number System
- **Viral Damage**: Purple numbers with decay particle effect
- **Toxic Damage**: Green numbers with bubble animation
- **Physical Damage**: White numbers with impact flash
- **Critical Hits**: Golden numbers at 2x size with sparkle trail
- **Combo Hits**: Size and glow intensity increase with streak

### Threat Indicator System
- **Off-Screen Enemies**: Red arrows pointing toward threats
- **Proximity Warning**: Pulsing frequency indicates distance
- **Threat Level**: Arrow intensity shows enemy danger level
- **Boss Indicators**: Orange color and larger size for bosses

## UI System

### HUD Elements
- Health bar (top-left)
- XP bar with level indicator (bottom)
- Timer (top-center)
- Score (top-right)
- Weapon icons (bottom-left)
- Combo streak indicator (center-right)
- Threat indicators (screen edges)
- Mini-map or threat indicator (top-right corner)

### Menu Systems
- Pause overlay with semi-transparent background
- Level-up modal with weapon selection grid and tier indicators
- Death screen with final stats and restart option