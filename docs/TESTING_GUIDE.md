# Testing Strategy

## Test Categories

### Unit Tests
Focus on pure game logic without Phaser dependencies:

**Weapon Calculations**
```typescript
describe('WeaponStats', () => {
  test('damage scaling per upgrade level', () => {
    const weapon = new AntibodyDart();
    expect(weapon.getDamageAtLevel(3)).toBe(14); // 8 base + 6 upgrades
  });
  
  test('damage type effectiveness against enemy resistances', () => {
    const viralWeapon = createMockWeapon({ damageType: 'viral', damage: 10 });
    const basicVirus = createMockEnemy({ resistances: { viral: 0, toxic: 25, physical: 0 } });
    
    const actualDamage = calculateDamage(viralWeapon, basicVirus);
    expect(actualDamage).toBe(10); // No resistance to viral
  });
  
  test('weapon tier affects upgrade probability', () => {
    const commonWeapon = createMockWeapon({ tier: 'common' });
    const epicWeapon = createMockWeapon({ tier: 'epic' });
    
    const commonProbability = getUpgradeProbability(commonWeapon, 1);
    const epicProbability = getUpgradeProbability(epicWeapon, 1);
    
    expect(commonProbability).toBeGreaterThan(epicProbability);
  });
});
```

**Enemy Behavior Logic**
```typescript
describe('EnemyAI', () => {
  test('pathfinding to player position', () => {
    const enemy = new BasicVirus(100, 100);
    const playerPos = { x: 200, y: 200 };
    const direction = enemy.calculateMovementDirection(playerPos);
    expect(direction.x).toBeCloseTo(0.707, 2);
  });
  
  test('enemy telegraph system timing', () => {
    const spikeVirus = new SpikeVirus(100, 100);
    const startTime = Date.now();
    
    spikeVirus.startAttackTelegraph();
    expect(spikeVirus.telegraphActive).toBe(true);
    
    // Telegraph should last 500ms
    setTimeout(() => {
      expect(spikeVirus.telegraphActive).toBe(false);
      expect(spikeVirus.isCharging).toBe(true);
    }, 500);
  });
});
```

### Integration Tests
Test system interactions with minimal Phaser setup:

**Collision System**
```typescript
describe('CollisionSystem', () => {
  test('projectile hits enemy and applies damage', () => {
    const projectile = createMockProjectile({ damage: 10 });
    const enemy = createMockEnemy({ health: 20 });
    
    CollisionSystem.handleProjectileHit(projectile, enemy);
    
    expect(enemy.health).toBe(10);
    expect(projectile.active).toBe(false);
  });
  
  test('damage type resistance calculations', () => {
    const toxicProjectile = createMockProjectile({ damage: 10, damageType: 'toxic' });
    const basicVirus = createMockEnemy({ 
      health: 20, 
      resistances: { viral: 0, toxic: 25, physical: 0 }
    });
    
    CollisionSystem.handleProjectileHit(toxicProjectile, basicVirus);
    
    // 10 damage - 25% resistance = 7.5 damage
    expect(basicVirus.health).toBe(12.5);
  });
});
```

### Manual Testing Checklist

#### Gameplay Balance
- [ ] Each weapon feels distinct and useful
- [ ] Upgrade progression provides meaningful power increase
- [ ] Enemy difficulty scales appropriately over 20 minutes
- [ ] Boss fights are challenging but fair
- [ ] Damage type resistances create strategic weapon choices
- [ ] Weapon tier probabilities feel balanced across gameplay
- [ ] Combo system rewards aggressive play without being overpowered
- [ ] Telegraph system provides fair warning for enemy attacks

#### Performance Benchmarks
- [ ] Maintains 60 FPS with 100+ enemies on screen
- [ ] Memory usage stable over long play sessions
- [ ] No frame drops during intense combat

#### User Experience
- [ ] Controls feel responsive
- [ ] Audio cues provide clear feedback
- [ ] Visual effects enhance gameplay without distraction
- [ ] UI elements remain readable during intense action
- [ ] Damage numbers are clearly visible and distinguish damage types
- [ ] Threat indicators effectively guide player attention
- [ ] Combo feedback feels satisfying and motivating
- [ ] Weapon mastery effects are noticeable and rewarding
- [ ] Enemy telegraphs provide sufficient reaction time

## Test Data Setup

### Mock Factories
```typescript
export const createMockWeapon = (overrides: Partial<IWeapon> = {}) => ({
  damage: 10,
  damageType: 'physical',
  tier: 'common',
  cooldown: 1000,
  range: 100,
  ...overrides
});

export const createMockEnemy = (overrides: Partial<IEnemy> = {}) => ({
  health: 20,
  speed: 80,
  damage: 5,
  resistances: { viral: 0, toxic: 0, physical: 0 },
  ...overrides
});

export const createMockComboSystem = () => ({
  currentStreak: 0,
  lastKillTime: 0,
  comboTimer: 3000
});
```

### Test Scenes
Create minimal Phaser scenes for integration testing:
```typescript
class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }
  
  // Minimal setup for testing specific systems
}
```

## Running Tests

```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode for development
npm run test:coverage      # Generate coverage report
npm run test:e2e           # End-to-end gameplay tests
```

## Performance Testing

### Frame Rate Monitoring
```typescript
// Add to gameplay scene for performance monitoring
let frameCount = 0;
let lastFPSUpdate = 0;

update(time: number) {
  frameCount++;
  if (time - lastFPSUpdate > 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastFPSUpdate = time;
  }
}
```

### Memory Profiling
- Use browser DevTools Performance tab
- Monitor heap size during extended gameplay
- Check for memory leaks in object pools