# Data Schemas and JSON Structure

## Weapon Configuration Schema

```typescript
interface WeaponConfig {
  id: string;
  name: string;
  description: string;
  baseDamage: number;
  damageType: 'viral' | 'toxic' | 'physical';
  tier: 'common' | 'rare' | 'epic';
  cooldown: number;        // milliseconds
  projectileSpeed?: number; // px/s (if applicable)
  range: number;           // pixels
  upgrades: WeaponUpgrade[];
  masteryEffect?: {
    visualEffect: string;
    mechanicalBonus?: {
      damageMultiplier?: number;
      additionalProjectiles?: number;
      specialBehavior?: string;
    };
  };
}

interface WeaponUpgrade {
  level: number;
  damageBonus?: number;
  cooldownReduction?: number;
  additionalEffects?: {
    projectileCount?: number;
    areaRadius?: number;
    penetration?: boolean;
  };
}
```

### Example: weapons.json
```json
{
  "antibody-dart": {
    "id": "antibody-dart",
    "name": "Antibody Dart",
    "description": "Fast piercing projectile",
    "baseDamage": 8,
    "damageType": "physical",
    "tier": "common",
    "cooldown": 1000,
    "projectileSpeed": 400,
    "range": 800,
    "upgrades": [
      {
        "level": 1,
        "damageBonus": 2
      },
      {
        "level": 2,
        "additionalEffects": {
          "projectileCount": 2
        }
      }
    ],
    "masteryEffect": {
      "visualEffect": "tracer-trails",
      "mechanicalBonus": {
        "additionalProjectiles": 1
      }
    }
  }
}
```

## Enemy Configuration Schema

```typescript
interface EnemyConfig {
  id: string;
  name: string;
  health: number;
  speed: number;           // px/s
  damage: number;
  behaviorType: 'direct' | 'burst' | 'split' | 'attach';
  spawnWeight: number;     // relative spawn probability
  firstAppearanceTime: number; // seconds into game
  resistances: {
    viral: number;         // percentage (-25 to +50)
    toxic: number;
    physical: number;
  };
  telegraph?: {
    enabled: boolean;
    duration: number;      // milliseconds
    visualEffect: string;
  };
  specialProperties?: {
    splitCount?: number;
    burstSpeed?: number;
    attachDuration?: number;
  };
}
```

### Example: enemies.json
```json
{
  "basic-virus": {
    "id": "basic-virus",
    "name": "Basic Virus",
    "health": 10,
    "speed": 80,
    "damage": 5,
    "behaviorType": "direct",
    "spawnWeight": 10,
    "firstAppearanceTime": 0,
    "resistances": {
      "viral": 0,
      "toxic": 25,
      "physical": 0
    }
  },
  "cluster-virus": {
    "id": "cluster-virus",
    "name": "Cluster Virus",
    "health": 12,
    "speed": 70,
    "damage": 5,
    "behaviorType": "split",
    "spawnWeight": 3,
    "firstAppearanceTime": 120,
    "resistances": {
      "viral": 15,
      "toxic": 15,
      "physical": -10
    },
    "specialProperties": {
      "splitCount": 2
    }
  }
}
```

## Boss Configuration Schema

```typescript
interface BossConfig {
  id: string;
  name: string;
  coreHealth: number;
  speed: number;
  damage: number;
  spawnTime: number;       // seconds into game
  weakPoints: WeakPoint[];
  abilities: BossAbility[];
}

interface WeakPoint {
  id: string;
  health: number;
  position: { x: number; y: number }; // relative to boss center
  regeneratesAfter?: number; // seconds, if applicable
}

interface BossAbility {
  id: string;
  name: string;
  cooldown: number;
  disabledWhenWeakPointDestroyed?: string; // weak point id
}
```

## Special Skills Schema

```typescript
interface SkillConfig {
  id: string;
  name: string;
  description: string;
  cooldown: number;        // milliseconds
  duration?: number;       // milliseconds (for buffs)
  type: 'instant' | 'duration' | 'passive';
  effects: {
    teleportDistance?: number;
    sizeMultiplier?: number;
    speedMultiplier?: number;
    invisibility?: boolean;
    xpAttraction?: {
      range: number;
      pullSpeed: number;
    };
  };
}
```

## Level Progression Schema

```typescript
interface LevelConfig {
  level: number;
  xpRequired: number;
  enemySpawnRateMultiplier: number;
  enemyHealthMultiplier: number;
  newEnemyTypes?: string[]; // enemy IDs that unlock at this level
}

interface GameBalance {
  playerStartingHealth: number;
  baseXpPerEnemy: number;
  survivalTimeMinutes: number;
  maxWeaponSlots: number;
  xpOrbLifetime: number;   // milliseconds
  comboSettings: {
    comboTimer: number;    // milliseconds to maintain streak
    multipliers: number[]; // XP multipliers by combo level
  };
  visualEffects: {
    damageNumberDuration: number;
    telegraphDuration: number;
    masteryEffectIntensity: number;
  };
}
```

### Example: progression.json
```json
{
  "levels": [
    {
      "level": 1,
      "xpRequired": 10,
      "enemySpawnRateMultiplier": 1.0,
      "enemyHealthMultiplier": 1.0
    },
    {
      "level": 2,
      "xpRequired": 25,
      "enemySpawnRateMultiplier": 1.1,
      "enemyHealthMultiplier": 1.0
    }
  ],
  "gameBalance": {
    "playerStartingHealth": 100,
    "baseXpPerEnemy": 1,
    "survivalTimeMinutes": 20,
    "maxWeaponSlots": 6,
    "xpOrbLifetime": 15000
  }
}
```

## Asset Manifest Schema

```typescript
interface AssetManifest {
  atlases: AtlasConfig[];
  audio: AudioConfig[];
  fonts: FontConfig[];
}

interface AtlasConfig {
  key: string;
  textureUrl: string;
  atlasUrl: string;
  preload: boolean;        // load in preload scene vs lazy load
}

interface AudioConfig {
  key: string;
  url: string;
  volume: number;
  loop: boolean;
  category: 'sfx' | 'music' | 'ui';
}
```

## Save Data Schema

```typescript
interface SaveData {
  version: string;
  unlockedWeapons: string[];
  unlockedSkills: string[];
  highScore: number;
  totalPlaytime: number;   // milliseconds
  gamesPlayed: number;
  settings: {
    masterVolume: number;
    sfxVolume: number;
    musicVolume: number;
    keyBindings: Record<string, string>;
  };
}
```

## Configuration File Locations

```
assets/data/
├── weapons.json         # All weapon configurations
├── enemies.json         # All enemy configurations  
├── bosses.json          # Boss and weak point data
├── skills.json          # Special skill definitions
├── progression.json     # Level thresholds and balance
├── assets.json          # Asset loading manifest
└── defaults.json        # Default game settings
```