export interface WeaponConfig {
  id: string;
  name: string;
  description: string;
  baseDamage: number;
  damageType: 'viral' | 'toxic' | 'physical';
  tier: 'common' | 'rare' | 'epic';
  cooldown: number;
  projectileSpeed?: number;
  range: number;
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

export interface WeaponUpgrade {
  level: number;
  damageBonus?: number;
  cooldownReduction?: number;
  additionalEffects?: {
    projectileCount?: number;
    areaRadius?: number;
    penetration?: boolean;
  };
}

export interface EnemyConfig {
  id: string;
  name: string;
  health: number;
  speed: number;
  damage: number;
  behaviorType: 'direct' | 'burst' | 'split' | 'attach';
  spawnWeight: number;
  firstAppearanceTime: number;
  resistances: {
    viral: number;
    toxic: number;
    physical: number;
  };
  telegraph?: {
    enabled: boolean;
    duration: number;
    visualEffect: string;
  };
  specialProperties?: {
    splitCount?: number;
    burstSpeed?: number;
    attachDuration?: number;
  };
}

export interface BossConfig {
  id: string;
  name: string;
  coreHealth: number;
  speed: number;
  damage: number;
  spawnTime: number;
  weakPoints: WeakPoint[];
  abilities: BossAbility[];
}

export interface WeakPoint {
  id: string;
  health: number;
  position: { x: number; y: number };
  regeneratesAfter?: number;
}

export interface BossAbility {
  id: string;
  name: string;
  cooldown: number;
  disabledWhenWeakPointDestroyed?: string;
}

export interface SkillConfig {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  duration?: number;
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

export interface GameBalance {
  playerStartingHealth: number;
  baseXpPerEnemy: number;
  survivalTimeMinutes: number;
  maxWeaponSlots: number;
  xpOrbLifetime: number;
  comboSettings: {
    comboTimer: number;
    multipliers: number[];
  };
  visualEffects: {
    damageNumberDuration: number;
    telegraphDuration: number;
    masteryEffectIntensity: number;
  };
}

export interface SaveData {
  version: string;
  unlockedWeapons: string[];
  unlockedSkills: string[];
  highScore: number;
  totalPlaytime: number;
  gamesPlayed: number;
  settings: {
    masterVolume: number;
    sfxVolume: number;
    musicVolume: number;
    keyBindings: Record<string, string>;
  };
}