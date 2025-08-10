# Architecture Overview

## Game Flow

```
Boot Scene → Preload Scene → Menu Scene → Gameplay Scene
                                ↑              ↓
                            Pause Scene ←──────┘
```

## Core Systems

### Scene Management
- **BootScene**: Initialize game configuration and global systems
- **PreloadScene**: Load all game assets with progress bar
- **MenuScene**: Main menu, settings, and weapon/skill selection
- **GameplayScene**: Core game loop with all systems active
- **PauseScene**: Overlay pause menu with resume/restart options

### Entity Component System (ECS) Pattern
- **Player**: Main controllable entity with health, movement, weapon slots, and combo tracking
- **Enemy**: Base enemy class with AI behaviors, health, damage, and resistance types
- **Projectile**: Weapon projectiles with physics, collision, and damage type classification
- **Pickup**: XP orbs and power-ups with collection logic
- **DamageNumber**: Floating combat text with type-specific styling and animations

### System Architecture

```
GameplayScene
├── Player System
├── Weapon System (with tier and damage type support)
├── Enemy Spawning System  
├── Collision System
├── XP/Leveling System
├── Combo System (kill streaks and multipliers)
├── Visual Feedback System (damage numbers, telegraphs)
├── UI System
└── Particle System
```

## Data Flow

1. **Configuration Loading**: JSON files define weapon/enemy stats
2. **Object Pooling**: Reuse projectiles, enemies, and effects
3. **Event System**: Phaser EventEmitter for cross-system communication
4. **State Management**: LocalStorage for meta-progression persistence

## Key Patterns

### Object Pooling
All dynamic entities (enemies, projectiles, pickups) use object pools to prevent garbage collection during gameplay.

### Component Composition
Entities are composed of behavior components (Health, Movement, Weapon, DamageType, Resistance, etc.) rather than deep inheritance.

### Damage Type System
Three damage types with visual and mechanical differences:
- **Viral**: Purple effects, high damage to basic enemies
- **Toxic**: Green effects, damage over time potential
- **Physical**: White effects, effective against armored enemies

### Weapon Tier System
Weapons classified by rarity affecting upgrade probability:
- **Common (60%)**: Standard weapons, consistent availability
- **Rare (30%)**: Enhanced versions with better stats
- **Epic (10%)**: Unique mechanics unlocked at max level

### Data-Driven Design
Game balance and configuration stored in JSON files, not hardcoded in source.

## Performance Considerations

- **Spatial Partitioning**: Efficient collision detection for large entity counts
- **Culling**: Off-screen entities are deactivated
- **Batching**: Sprite rendering optimized with texture atlases
- **Delta Time**: Frame-rate independent movement and timers