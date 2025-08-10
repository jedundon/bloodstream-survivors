# Alpha 2-5 Issues

## Alpha 2: Progression System Issues

### Issue A2-1: XP System Implementation
**Component:** Systems/Core  
**Priority:** Critical  
**Milestone:** Alpha 2

**Description:** Implement XP collection, level thresholds, and level-up events.

**Acceptance Criteria:**
- [ ] XP orbs drop from defeated enemies (1 XP per Basic Virus, 3 XP per Spike Virus)
- [ ] XP orbs auto-collect within 30px of player
- [ ] XP orbs disappear after 15 seconds
- [ ] Level thresholds match PRD table (10, 35, 85, 185 XP...)
- [ ] Level-up event triggers upgrade selection
- [ ] XP bar shows progress to next level

### Issue A2-2: Weapon Upgrade System
**Component:** Weapons/Combat  
**Priority:** Critical  
**Milestone:** Alpha 2

**Description:** Implement weapon upgrade mechanics with 3 upgrade levels per weapon.

**Acceptance Criteria:**
- [ ] Each weapon tracks upgrade level (0-3 for Alpha 2)
- [ ] Phagocytosis Burst upgrades: +20px radius per level
- [ ] Antibody Dart upgrades: +1 projectile per level  
- [ ] Cytokine Spray upgrades: +15° cone width per level
- [ ] Upgrade selection modal shows 3 random options
- [ ] Visual indicators show weapon upgrade levels

### Issue A2-3: Antibody Dart Weapon
**Component:** Weapons/Combat  
**Priority:** High  
**Milestone:** Alpha 2

**Description:** Implement fast piercing projectile weapon.

**Acceptance Criteria:**
- [ ] Fires projectile in player's last movement direction
- [ ] 8 base damage, 1.0s cooldown, 400px/s speed
- [ ] Projectile pierces through enemies (doesn't stop on hit)
- [ ] Projectile despawns at screen edge
- [ ] Object pooling for projectiles
- [ ] Visual trail effect for projectile

### Issue A2-4: Cytokine Spray Weapon  
**Component:** Weapons/Combat  
**Priority:** High  
**Milestone:** Alpha 2

**Description:** Implement cone-based spray weapon.

**Acceptance Criteria:**
- [ ] Fires multiple projectiles in 45° cone
- [ ] 4 damage per projectile, 2.0s cooldown, 350px/s speed
- [ ] 5 projectiles in base cone (configurable)
- [ ] Cone direction based on player movement
- [ ] Each projectile can hit different enemies
- [ ] Visual spread pattern clearly shows cone area

### Issue A2-5: Spike Virus Enemy
**Component:** Enemies/AI  
**Priority:** High  
**Milestone:** Alpha 2

**Description:** Implement burst-movement enemy type.

**Acceptance Criteria:**
- [ ] 15 HP, 8 damage on contact
- [ ] Normal speed: 100px/s, burst speed: 200px/s
- [ ] Charges toward player in bursts every 2-3 seconds
- [ ] Red charging glow before burst movement
- [ ] Returns to normal speed after 1-second burst
- [ ] Spawns starting at 3-minute mark

---

## Alpha 3: Full Weapon Set + UI Issues

### Issue A3-1: Remaining Weapons Implementation
**Component:** Weapons/Combat  
**Priority:** Critical  
**Milestone:** Alpha 3

**Description:** Implement remaining 4 weapons: Macrophage Spit, Antigen Field, Platelet Shard, Leukocyte Orbitals.

**Acceptance Criteria:**
- [ ] Macrophage Spit: Lobbed projectile with explosion (12 damage, 50px radius)
- [ ] Antigen Field: Continuous damage field around player (3 DPS, 60px radius)
- [ ] Platelet Shard: Boomerang projectile that returns (6 damage, return path)
- [ ] Leukocyte Orbitals: Orbiting projectiles around player (5 damage, 80px orbit)
- [ ] Each weapon follows PRD specifications exactly
- [ ] All weapons work with existing upgrade system

### Issue A3-2: Power-Up System
**Component:** Systems/Core  
**Priority:** Critical  
**Milestone:** Alpha 3

**Description:** Implement all 7 power-ups from PRD with proper effects and timers.

**Acceptance Criteria:**
- [ ] 5% drop chance from defeated enemies
- [ ] Visual timers in HUD show remaining duration
- [ ] Effects stack additively when multiple power-ups active
- [ ] Adrenaline Boost: +50% damage, 30s duration, red player glow
- [ ] Metabolic Rush: +40% movement speed, 20s, blue speed lines
- [ ] All 7 power-ups implemented per PRD specifications
- [ ] Power-up collection audio and visual feedback

### Issue A3-3: Complete HUD Implementation
**Component:** UI/HUD  
**Priority:** High  
**Milestone:** Alpha 3

**Description:** Implement full HUD layout as specified in PRD.

**Acceptance Criteria:**
- [ ] Health bar (top-left) with damage flash animation
- [ ] XP bar with level indicator (bottom-center)
- [ ] Survival timer (top-center) in MM:SS format
- [ ] Score counter (top-right) tracking points
- [ ] Active weapon icons (bottom-left) showing cooldowns
- [ ] Power-up timers (right side) with visual countdown
- [ ] All elements scale properly with screen resolution

---

## Alpha 4: Enemy Variety + Bosses Issues

### Issue A4-1: Advanced Enemy Types
**Component:** Enemies/AI  
**Priority:** Critical  
**Milestone:** Alpha 4

**Description:** Implement Cluster Virus, Parasite, and Armor Virus enemies.

**Acceptance Criteria:**
- [ ] Cluster Virus: Splits into 2 mini-viruses on death (5 HP each)
- [ ] Parasite: Attaches to player, slows movement, drains XP
- [ ] Armor Virus: 30 HP, immune to knockback, slow movement
- [ ] Each enemy follows resistance table from PRD
- [ ] Proper AI behaviors implemented
- [ ] Visual indicators for special abilities

### Issue A4-2: Boss System Framework
**Component:** Enemies/AI  
**Priority:** Critical  
**Milestone:** Alpha 4

**Description:** Create boss encounter system with weak points and special abilities.

**Acceptance Criteria:**
- [ ] Boss health tracking separate from regular enemies
- [ ] Weak point system (targetable sub-components)
- [ ] Boss can only be damaged after destroying all weak points
- [ ] Boss spawn triggered by timer (5 min for Viral Behemoth)
- [ ] Boss music and UI changes during encounter
- [ ] Camera may zoom out slightly for boss fights

### Issue A4-3: Viral Behemoth Boss
**Component:** Enemies/AI  
**Priority:** High  
**Milestone:** Alpha 4

**Description:** Implement first boss encounter.

**Acceptance Criteria:**
- [ ] 300 HP, 40px/s movement speed, 15 damage
- [ ] 3 weak points (large nodules) that must be destroyed first
- [ ] Spawns minion enemies every 10 seconds during fight
- [ ] Periodic radial burst attack (warning + execution)
- [ ] Drops guaranteed power-ups on defeat
- [ ] Victory condition advances to next phase

---

## Alpha 5: Polish + Meta-progression Issues

### Issue A5-1: Achievement System
**Component:** Systems/Core  
**Priority:** High  
**Milestone:** Alpha 5

**Description:** Implement achievement tracking and unlock system.

**Acceptance Criteria:**
- [ ] 15 achievements from PRD implemented
- [ ] Achievement progress tracked in localStorage
- [ ] Achievement unlock notifications during gameplay
- [ ] Achievement viewing in main menu
- [ ] Proper icons and descriptions for each achievement
- [ ] Achievement completion triggers special effects

### Issue A5-2: Meta-progression System
**Component:** Systems/Core  
**Priority:** High  
**Milestone:** Alpha 5

**Description:** Implement Genetic Material currency and permanent unlocks.

**Acceptance Criteria:**
- [ ] Genetic Material earned at 1 per minute survived
- [ ] Currency persists between sessions
- [ ] Unlock shop in main menu
- [ ] New starting weapons unlockable (50 GM each)
- [ ] New special skills unlockable (75 GM each)
- [ ] Starting bonuses unlockable (100 GM each)

### Issue A5-3: Performance Optimization & Deployment
**Component:** Systems/Core  
**Priority:** High  
**Milestone:** Alpha 5

**Description:** Final performance optimization and GitHub Pages deployment setup.

**Acceptance Criteria:**
- [ ] Object pooling for all dynamic entities
- [ ] Frustum culling for off-screen entities
- [ ] Texture atlasing for sprite batching
- [ ] 60 FPS maintained with full enemy count (35 enemies)
- [ ] GitHub Pages deployment configuration
- [ ] Relative asset paths for web deployment
- [ ] Build optimization and minification

---

## Development Tips for Each Alpha

**Alpha 1 Focus:**
- Get the core loop working first
- Don't worry about balance yet
- Prioritize stability over features
- Test thoroughly on single weapon

**Alpha 2 Focus:**
- Balance weapon upgrade progression
- Ensure XP system feels rewarding
- Test with multiple weapons
- Validate progression pacing

**Alpha 3 Focus:**
- Weapon variety and uniqueness
- UI/UX polish and clarity
- Power-up tactical value
- Audio integration

**Alpha 4 Focus:**
- Enemy tactical variety
- Boss encounter design
- Combat depth and strategy
- Visual clarity in complex fights

**Alpha 5 Focus:**
- Long-term engagement features
- Performance at scale
- Accessibility and polish
- Deployment readiness