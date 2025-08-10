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

## **2.1 Power-Up System**
| Power-Up Name | Effect | Duration | Rarity | Visual Indicator |
|---------------|--------|----------|--------|------------------|
| Adrenaline Boost | +50% damage to all weapons | 30s | Common | Red glow around player |
| Metabolic Rush | +40% movement speed | 20s | Common | Blue speed lines |
| Cellular Shield | 50% damage reduction | 15s | Uncommon | Golden barrier effect |
| Rapid Fire | -50% weapon cooldowns | 25s | Uncommon | Orange weapon glow |
| XP Magnetism | Attract XP orbs from 200px radius | 45s | Rare | Purple magnetic field |
| Regeneration | Restore 25 HP over 10 seconds | 10s | Rare | Green healing particles |
| Berserker Mode | +100% damage, +25% damage taken | 15s | Epic | Red screen tint |

**Power-Up Mechanics:**
- Power-ups spawn randomly from defeated enemies (5% base chance)
- Boss encounters guarantee 1-2 power-ups on defeat
- Effects stack additively (multiple damage boosts combine)
- Visual timers show remaining duration in HUD

---

## **3. Player Mechanics**

### **3.1 Movement**
- 8-directional (WASD or arrow keys, or controller stick).
- No aiming — attacks auto-target or are directional based on weapon type.

### **3.2 Health & Damage System**
- **Starting Health**: 100 HP
- **Health Regeneration**: None (pure survival focus)
- **Damage Calculation**: Direct damage minus any active damage reduction
- **Invincibility Frames**: 1 second after taking damage (player flashes)
- **Death Condition**: Health reaches 0 HP
- **Revival**: None; game ends on death

**Damage Indicators:**
- Floating damage numbers appear above enemies when hit
- Player health bar flashes red when taking damage
- Screen briefly shakes on player damage
- Low health warning (heartbeat audio + red screen tint) below 25 HP

### **3.3 Weapons Table**
| Weapon Name | Description | Base Damage | Cooldown | Projectile Speed | Area/Range | Upgrade Path |
|-------------|-------------|-------------|----------|------------------|------------|--------------|
| Phagocytosis Burst | Short-range radial burst damaging all nearby enemies | 10 | 1.5s | N/A | 100px radius | +Radius, +Damage, +Burst count |
| Antibody Dart | Fast piercing projectile in facing direction | 8 | 1.0s | 400px/s | 1 projectile | +Projectile count, +Damage, +Speed |
| Cytokine Spray | Cone spray with multiple small projectiles | 4 per proj | 2.0s | 350px/s | 45° cone | +Cone width, +Damage, +Proj count |
| Macrophage Spit | Lobbed projectile that explodes on impact | 12 | 2.5s | 250px/s | 50px radius | +Explosion radius, +Damage |
| Antigen Field | Persistent damaging field around player | 3 DPS | Continuous | N/A | 60px radius | +Radius, +DPS |
| Platelet Shard | Boomerang-like shard that returns to player | 6 | 2.0s | 300px/s | Return path | +Count, +Damage, +Speed |
| **Leukocyte Orbitals** | Small cell fragments orbit the player, damaging enemies on contact | 5 | Continuous | Orbit speed ~180°/s | 80px from player | +Orbit count, +Damage, +Orbit speed |

**Weapon Balance Details:**
- Maximum weapon slots: 6 active weapons
- Each weapon has 5 upgrade levels maximum
- Weapon synergies: Antibody Dart + Platelet Shard = increased projectile speed
- Auto-targeting prioritizes: closest enemy → lowest health → highest threat

### **3.5 Weapon Tier System**
| Tier | Rarity | Upgrade Choice Probability | Visual Indicator |
|------|--------|----------------------------|------------------|
| Common | 60% | High chance early game | White border |
| Rare | 30% | Moderate chance mid-game | Blue border + glow |
| Epic | 10% | Low chance late game | Purple border + particles |

**Tier Effects:**
- Higher tier weapons have stronger base stats
- Epic weapons unlock unique mechanics at max level
- Tier affects upgrade choice pool weighting

### **3.6 Enemy Resistance System**
| Enemy Type | Viral Resistance | Toxic Resistance | Physical Resistance |
|------------|------------------|------------------|--------------------|
| Basic Virus | 0% | +25% | 0% |
| Spike Virus | +25% | 0% | 0% |
| Armor Virus | +10% | +10% | +50% |
| Parasite | 0% | -25% (weakness) | +15% |
| Cluster Virus | +15% | +15% | -10% (weakness) |

### **3.4 Special Skills Table**
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

### **4.3 Enemy Spawn Patterns**
| Time Interval | Spawn Rate | Active Enemy Types | Max On Screen |
|---------------|------------|-------------------|---------------|
| 0-2 min | 1 enemy/2s | Basic Virus | 15 |
| 2-5 min | 1 enemy/1.5s | Basic + Spike Virus | 20 |
| 5-8 min | 1 enemy/1s | All except Armor | 25 |
| 8-12 min | 2 enemies/1s | All types | 30 |
| 12-20 min | 3 enemies/1s | All types + elites | 35 |

**Spawn Mechanics:**
- Enemies spawn at screen edges, never in player's immediate vicinity
- Elite variants (20% more HP/damage) appear after 10 minutes
- Special spawn events: virus swarms every 3 minutes (10 enemies at once)

### **4.4 Difficulty Scaling**
- **Enemy Health**: +15% every 3 minutes
- **Enemy Speed**: +5% every 5 minutes  
- **Spawn Rate**: +20% every 4 minutes
- **New Mechanics**: Introduce new enemy behaviors at 8, 12, 16 minutes

---

## **5. Level Progression**

### **5.1 XP System**
- **Survival Timer**: 20 minutes.
- **XP Sources**: XP orbs dropped by enemies on death
- **XP Values**: Basic enemies (1 XP), Elite enemies (3 XP), Bosses (25 XP)
- **XP Orb Lifetime**: 15 seconds before disappearing
- **Collection Range**: 30px base radius (affected by skills/power-ups)
### **5.2 Level Thresholds**
| Level | XP Required | Cumulative XP | Upgrade Choices |
|-------|-------------|---------------|-----------------|
| 1     | 10          | 10            | 3 weapon/upgrade options |
| 2     | 25          | 35            | 3 weapon/upgrade options |
| 3     | 50          | 85            | 3 weapon/upgrade options |
| 4     | 100         | 185           | 3 weapon/upgrade options |
| 5     | 175         | 360           | 3 weapon/upgrade options |
| 6     | 275         | 635           | 3 weapon/upgrade options |
| 7+    | +150/level  | ---           | 3 weapon/upgrade options |
### **5.3 Meta-Progression**
**Unlock Currency**: Genetic Material (earned 1 per minute survived)

**Permanent Unlocks:**
- New starting weapons (cost: 50 Genetic Material each)
- New special skills (cost: 75 Genetic Material each)  
- Starting bonuses: +10% XP gain, +10 starting HP, +10% movement speed (cost: 100 each)
- **Post-Max Level**: After max upgrades, continue to gain XP for “gold” or score multipliers.

---

## **6. Environment & Visuals**

### **6.1 Visual Style**
- Vector-based art with particle effects and pulsing animations.
- Animated bloodstream background with parallax layers.
- Color palette: Deep reds, blues, and whites with neon accents
- Particle density scales with action intensity

### **6.2 Visual Polish Details**
**Damage Type Indicators:**
- Viral damage: Purple/magenta particle effects
- Toxic damage: Green bubbling effects
- Physical damage: White/silver impact flashes
- Critical hits: Golden burst with larger particles

**Enemy Telegraph System:**
- 0.5s warning animations before enemy attacks
- Spike Virus: Red charging glow before burst
- Boss attacks: Screen flash + audio cue 1s before impact
- Area attacks: Ground targeting circles appear before damage

**Weapon Mastery Effects:**
- Fully upgraded weapons gain unique visual flair
- Phagocytosis Burst: Electrical crackling around player
- Antibody Dart: Tracer trails and impact sparks
- Cytokine Spray: Enhanced particle density and glow
- Weapon evolution: Visual transformation at max level

### **6.3 User Interface**
**HUD Layout:**
- Health bar (top-left corner)
- XP bar with level indicator (bottom center)
- Survival timer (top-center)
- Score counter (top-right)
- Active weapon icons (bottom-left)
- Power-up timers (right side)
- Mini-map or threat indicator (bottom-right)

**Menu Systems:**
- Main menu: Play, Unlocks, Settings, Credits
- Weapon selection screen before game start
- Pause menu: Resume, Settings, Restart, Quit
- Level-up modal: 3 upgrade choices with descriptions
- Death screen: Final stats, restart, main menu
- Settings menu: Audio, Controls, Graphics, Accessibility

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

---

## **10. Controls & Settings**

### **10.1 Control Schemes**
**Keyboard (Primary):**
- WASD or Arrow Keys: Movement
- Spacebar: Activate special skill
- P or Escape: Pause game
- M: Mute audio toggle

**Gamepad Support:**
- Left stick: Movement
- A button (Xbox) / X button (PlayStation): Special skill
- Start/Options: Pause game
- Right stick: Camera control (if implemented)

### **10.2 Accessibility Options**
- Rebindable key controls
- High contrast mode toggle
- Colorblind-friendly palette option
- Audio cues for visual events
- Reduced motion settings for sensitive players
- Font size scaling for UI text

### **10.3 Graphics Settings**
- Particle density: Low/Medium/High
- Screen shake intensity: Off/Low/Medium/High
- Visual effects quality: Performance/Balanced/Quality
- Fullscreen toggle

---

## **11. Statistics & Analytics**

### **11.1 Player Statistics**
**Per-Run Tracking:**
- Survival time
- Enemies defeated by type
- Damage dealt and taken
- XP collected
- Power-ups used
- Final score

**Persistent Statistics:**
- Total playtime
- Best survival time
- Total enemies defeated
- Favorite weapon usage
- Achievement progress

### **11.2 Leaderboards** 
- Local high scores (top 10 runs)
- Best time per weapon combination
- Challenge mode completions

---

## **12. Quality of Life Features**

### **12.1 Pause System**
- Game auto-pauses when window loses focus
- Manual pause available anytime except during upgrade selection
- Pause screen shows current run statistics
- Resume countdown (3-2-1) to prevent accidental deaths

### **12.2 Enhanced Feedback Systems**
**Damage Number System:**
- Viral damage: Purple numbers with decay effect
- Toxic damage: Green numbers with bubble animation
- Physical damage: White numbers with impact flash
- Critical hits: Golden numbers 2x size with sparkle trail
- Combo multiplier: Stacking number size and glow intensity

**Screen Edge Threat Indicators:**
- Red arrows point toward off-screen enemies
- Arrow intensity indicates enemy threat level
- Pulsing frequency shows proximity
- Boss indicators use unique color (orange) and larger size

**Combo System:**
- Kill streak multiplier: 1.5x, 2x, 3x, 5x XP bonus
- Combo timer: 3 seconds to maintain streak
- Visual: Increasing particle trail behind player
- Audio: Ascending pitch for each combo level
- Screen border glow intensity matches combo level

**Standard Feedback:**
- Screen shake intensity based on damage dealt/received
- Controller vibration for impacts (if gamepad connected)
- Audio feedback for all player actions
- Visual feedback: hit flashes, critical hit sparkles

### **12.3 Convenience Features**
- Auto-pause on level up for upgrade selection
- Skip upgrade animation option for experienced players
- Quick restart button on death screen
- Settings persist between sessions
- Resume from last upgrade selection if game crashes

---

## **13. Enhanced Audio Specifications**

### **13.1 Dynamic Audio System**
**Adaptive Music:**
- Music intensity scales with enemy density and player health
- Smooth transitions between calm exploration and intense combat
- Boss battle themes override standard gameplay music

**3D Audio Effects:**
- Positional audio for off-screen enemies
- Distance-based volume attenuation
- Stereo panning for directional awareness

**Audio Accessibility:**
- Subtitles for important audio cues
- Visual representations of audio events
- Haptic feedback alternatives for hearing-impaired players

---

## **14. Enhanced Technical Specifications**

### **14.1 Advanced Performance Features**
**Rendering Optimizations:**
- Frustum culling for off-screen entities
- Level-of-detail (LOD) for distant enemies
- Instanced rendering for particle effects
- Occlusion culling for overlapped sprites

**Memory Management:**
- Garbage collection optimization
- Asset streaming for large textures
- Texture compression (DXT/ETC2) where supported
- Audio compression and streaming

### **14.2 Platform Considerations**
**Desktop Targets:**
- 1920x1080 native resolution
- Multi-monitor support awareness
- Keyboard + mouse optimization

**Mobile Considerations (Future):**
- Touch controls with virtual joystick
- Responsive UI scaling
- Battery optimization modes
- Reduced particle effects on low-end devices

---

## **15. Achievement System**

### **15.1 Achievement Categories**
**Survival Achievements:**
- "First Steps": Survive 5 minutes
- "Endurance": Survive 15 minutes  
- "Perfect Run": Survive 20 minutes without taking damage
- "Virus Hunter": Defeat 1000 total enemies

**Combat Achievements:**
- "Specialist": Max upgrade a single weapon
- "Arsenal": Unlock all starting weapons
- "Combo Master": Defeat 10 enemies within 1 second
- "Boss Slayer": Defeat all boss types

**Discovery Achievements:**
- "Experimenter": Try all weapon combinations
- "Collector": Use all power-up types in a single run
- "Survivor": Complete 50 total runs

