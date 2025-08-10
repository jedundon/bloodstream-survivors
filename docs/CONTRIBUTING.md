# Contributing Guidelines

## Development Workflow

### Git Workflow
1. Create feature branch from `main`
2. Make focused, atomic commits
3. Run tests and linting before committing
4. Create pull request with clear description
5. Ensure CI passes before merging

### Branch Naming
```
feature/weapon-system-implementation
bugfix/collision-detection-optimization  
refactor/enemy-spawning-cleanup
```

### Commit Message Format
```
type(scope): description

feat(weapons): implement antibody dart weapon
fix(collision): resolve projectile penetration bug
refactor(enemies): extract common AI behavior
docs(api): add weapon system documentation
```

## Code Style Guidelines

### TypeScript Standards
- Use strict TypeScript configuration
- Prefer interfaces over types for public APIs
- Use meaningful variable and function names
- Add JSDoc comments for public methods

### Phaser-Specific Patterns
```typescript
// Good: proper lifecycle management
class WeaponSystem {
  constructor(private scene: Phaser.Scene) {
    this.scene.events.on('shutdown', this.cleanup, this);
  }
  
  private cleanup(): void {
    this.scene.events.off('shutdown', this.cleanup, this);
  }
}

// Good: consistent object creation
createProjectile(x: number, y: number, config: ProjectileConfig): Projectile {
  const projectile = this.projectilePool.get();
  projectile.reset(x, y, config);
  return projectile;
}
```

### Performance Guidelines
- Always use object pooling for frequently created/destroyed objects
- Prefer `setActive(false)` over `destroy()` for pooled objects
- Use `Phaser.Math.Vector2` for vector operations
- Cache expensive calculations outside update loops

## Testing Requirements

### Test Coverage Expectations
- **Unit Tests**: All game logic and calculations (90%+ coverage)
- **Integration Tests**: System interactions and data flow
- **Manual Tests**: Gameplay feel and balance verification
- **Damage System Tests**: Damage type calculations and enemy resistance mechanics
- **Combo System Tests**: Kill streak logic and multiplier calculations
- **Visual System Tests**: Telegraph timing and damage number display

### Test Naming Convention
```typescript
describe('WeaponSystem', () => {
  describe('when firing antibody dart', () => {
    it('should create projectile with correct damage', () => {
      // test implementation
    });
    
    it('should respect cooldown period', () => {
      // test implementation
    });
  });
});
```

## Code Review Checklist

### Functionality
- [ ] New features work as specified in PRD
- [ ] Edge cases handled appropriately
- [ ] Error handling implemented
- [ ] Performance requirements met
- [ ] Damage type system working correctly with resistances
- [ ] Weapon tier probabilities match PRD specifications
- [ ] Combo system timing and multipliers accurate
- [ ] Enemy telegraph system provides proper warning timing
- [ ] Visual feedback systems perform without frame drops

### Code Quality
- [ ] TypeScript strict mode compliance
- [ ] No console.log statements in production code
- [ ] Proper event listener cleanup
- [ ] Object pooling used where appropriate

### Documentation
- [ ] Public APIs documented with JSDoc
- [ ] Complex algorithms explained with comments
- [ ] Breaking changes noted in PR description

## File Organization Standards

### Naming Conventions
```
PascalCase: Classes, interfaces, types
camelCase: Variables, functions, methods
kebab-case: File names, asset names
SCREAMING_SNAKE_CASE: Constants
```

### Import Organization
```typescript
// External libraries first
import * as Phaser from 'phaser';

// Internal imports by category
import { IWeapon } from '../types/weapons';
import { WeaponSystem } from '../systems/WeaponSystem';
import { projectilePool } from '../utils/ObjectPools';
```

### Directory Structure Rules
- Keep files in appropriate directories by responsibility
- Avoid deep nesting (max 3 levels under src/)
- Group related functionality together
- Use index.ts files for clean imports

## Debug and Development Tools

### Development Mode Features
```typescript
if (import.meta.env.DEV) {
  // Debug overlays
  this.enableDebugPhysics();
  this.showPerformanceMetrics();
  
  // Cheat codes for testing
  this.enableGodMode();
  
  // New system debugging
  this.showDamageTypeIndicators();
  this.displayComboDebugInfo();
  this.highlightEnemyResistances();
  this.showTelegraphTimings();
}
```

### Useful Development Commands
```bash
# Development with debug info
npm run dev:debug

# Build with source maps
npm run build:dev

# Test specific weapon
npm run test -- --grep "antibody dart"
```