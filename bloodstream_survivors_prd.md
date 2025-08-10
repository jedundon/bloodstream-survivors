# Product Requirements Document (PRD)

## **Game Title (Working)**
**Bloodstream Survivors** (placeholder; to be finalized)

---

## **1. Overview**
A top-down, arena-survival action game inspired by *Vampire Survivors*.  
The player controls a **lonely white blood cell** drifting through a hostile bloodstream, automatically attacking incoming viruses. The player collects XP and power-ups to survive increasingly intense waves of enemies, all while navigating a visually rich, particle-filled, abstract bloodstream environment.

---

## **2. Core Gameplay Loop**
1. **Start the game** by spawning in the bloodstream arena with:
   - One selected **starting weapon** (with fully defined max-level stats and scaling in the Weapons Table)
   - One selected **special skill** (non-upgradable, with clearly defined effects, cooldowns, and any stacking rules)
2. **Survive waves** of enemy viruses that spawn at an increasing rate and difficulty over time.
3. **Defeat enemies** to earn XP or collect XP orbs dropped on death.
4. **Level up** upon reaching an XP threshold, then choose either a new weapon or an upgrade for an existing one. Upgrade paths must specify numerical scaling and max-level effects.
5. **Collect power-ups** that grant temporary boosts or new abilities.
6. **Continue playing** until either the 20-minute survival timer expires or the player's HP is reduced to zero.

---

## **3. Player Mechanics**

### **3.1 Movement**
- 8-directional (WASD or arrow keys, or controller stick).
- No aiming — attacks auto-target or are directional based on weapon type.

### **3.2 Weapons Table**
| Weapon Name | Description | Base Damage | Cooldown | Projectile Speed | Area/Range | Upgrade Path |
|-------------|-------------|-------------|----------|------------------|------------|--------------|
| Phagocytosis Burst | Short-range radial burst damaging all nearby enemies | 10 | 1.5s | N/A | 100px radius | +Radius, +Damage, +Burst count |
| Antibody Dart | Fast piercing projectile in facing direction | 8 | 1.0s | 400px/s | 1 projectile | +Projectile count, +Damage, +Speed |
| Cytokine Spray | Cone spray with multiple small projectiles | 4 per proj | 2.0s | 350px/s | 45° cone | +Cone width, +Damage, +Proj count |
| Macrophage Spit | Lobbed projectile that explodes on impact | 12 | 2.5s | 250px/s | 50px radius | +Explosion radius, +Damage |
| Antigen Field | Persistent damaging field around player | 3 DPS | Continuous | N/A | 60px radius | +Radius, +DPS |
| Platelet Shard | Boomerang-like shard that returns to player | 6 | 2.0s | 300px/s | Return path | +Count, +Damage, +Speed |
| **Leukocyte Orbitals** | Small cell fragments orbit the player, damaging enemies on contact | 5 | Continuous | Orbit speed ~180°/s | 80px from player | +Orbit count, +Damage, +Orbit speed |

### **3.3 Special Skills Table**
| Skill Name | Effect | Duration | Cooldown | Notes |
|------------|--------|----------|----------|-------|
| Micro-Teleport | Dash in movement direction instantly | N/A | 5s | Pass through enemies |
| Cell Compression | Shrink to half size, harder to hit | 4s | 15s | No change to attack |
| Immuno Boost | Double attack speed | 3s | 15s | Stacks with other buffs |
| Adhesion | Attach to enemy, dealing continuous damage | 2s | 8s | Can still be damaged |
| Receptor Cloak | Invisible to enemies | 3s | 20s | Enemies stop chasing |
| **Chemotactic Pull** | XP orbs within medium range are slowly attracted to the player | Passive | N/A | Pull speed and radius fixed |

---

## **4. Enemies Table**
| Enemy Name | HP | Speed | Damage | Behavior | Special Notes |
|------------|----|-------|--------|----------|---------------|
| Basic Virus | 10 | 80px/s | 5 | Moves directly toward player | Very common early |
| Spike Virus | 15 | 100px/s (burst 200px/s) | 8 | Charges in bursts | Appears ~3 min |
| Cluster Virus | 12 | 70px/s | 5 | Splits into 2 smaller on death | Each mini-virus has 5 HP |
| Parasite | 8 | 120px/s | 0 | Attaches to player, slows movement | Drains XP if attached |
| Armor Virus | 30 | 60px/s | 10 | High HP, slow | Immune to knockback |

---

## **4.1 Boss Design Principles**
- Bosses have **weak points** that must be attacked to disable certain abilities.
- Destroying all weak points will allow damage to the core health pool, ultimately defeating the boss.
- Weak points may regenerate or have unique protection phases.

### **4.2 Boss Table**
| Boss Name | HP | Speed | Damage | Weak Points | Abilities | Spawn Time |
|-----------|----|-------|--------|-------------|-----------|------------|
| Viral Behemoth | 300 | 40px/s | 15 | 3 large nodules on outer membrane | Spawns minions, periodic radial bursts | 5 min |
| Cytokine Overlord | 350 | 50px/s | 18 | 2 receptor clusters on tentacles | Long-range tentacle lash, debuff cloud | 10 min |
| Hemophage Prime | 400 | 60px/s | 20 | 4 moving organelles | Rapid dash attacks, area drain | 15 min |
| Parasitic Hive | 500 | 45px/s | 25 | 5 parasite sacs | Constant parasite spawns, slows player | 20 min |

---

## **5. Level Progression**
- **Survival Timer**: 20 minutes.
- **XP Gain**: XP orbs dropped by enemies.
- **Level-Up Thresholds**: Gradually increase each level.
- **Meta-Progression**: Unlocks between runs (new weapons, skills, starting bonuses).
- **Post-Max Level**: After max upgrades, continue to gain XP for “gold” or score multipliers.

---

## **6. Environment & Visuals**
- Vector-based art with particle effects and pulsing animations.
- Animated bloodstream background with parallax layers.
- HUD: HP, XP, timer, weapon slots, score.

---

## **7. Audio**
- Ambient “whoosh” of bloodstream.
- Weapon SFX, enemy cues, level-up chimes, low-HP heartbeat.

---

## **8. Technical Requirements**
- **Engine:** Phaser 3 (WebGL-first)
- **Target:** GitHub Pages
- **Physics:** Arcade Physics
- **Save:** localStorage
- **Performance:** 60fps target, pooled objects, atlas batching

---

## **9. Phaser 3 Implementation Guidance**
- TypeScript + Vite setup
- Scene separation (Boot, Preload, Menu, Gameplay, Pause)
- Systems for weapons, spawns, upgrades, loot, particles
- Data-driven stats from JSON files
- Object pooling for projectiles, enemies, pickups
- ADD/SCREEN blend modes for glow effects
- Delta-based movement
- Texture atlases for batching
- LocalStorage wrapper for progression
- Accessibility: rebindable keys, gamepad support, color contrast safe
- GH Pages deployment with relative asset paths

