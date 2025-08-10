# Alpha 1 Issues - Core Mechanics

Copy these into GitHub Issues using the Feature template:

---

## Issue 1: Basic Player Movement System
**Component:** Player/Movement  
**Priority:** Critical  
**Milestone:** Alpha 1

**Description:**
Implement core player movement mechanics with 8-directional input handling and smooth movement.

**Acceptance Criteria:**
- [ ] Player sprite responds to WASD/arrow key input
- [ ] 8-directional movement (diagonal movement allowed)
- [ ] Movement speed: 150px/s (configurable in data/player.json)
- [ ] Movement is delta-time based for consistent speed
- [ ] Player cannot move outside screen boundaries
- [ ] Smooth movement without stuttering or lag

**PRD Reference:** Section 3.1 Movement

---

## Issue 2: Basic Scene Management
**Component:** Systems/Core  
**Priority:** Critical  
**Milestone:** Alpha 1

**Description:**
Set up core Phaser scene flow: Boot → Preload → Menu → Gameplay → GameOver

**Acceptance Criteria:**
- [ ] BootScene initializes game configuration
- [ ] PreloadScene loads essential assets (player sprite, basic enemy, weapon effects)
- [ ] MenuScene provides "Start Game" button
- [ ] GameplayScene handles main game loop
- [ ] GameOverScene shows final stats and restart option
- [ ] Scene transitions work smoothly without errors
- [ ] Proper asset management between scenes

**PRD Reference:** Section 9 Phaser 3 Implementation Guidance

---

## Issue 3: Basic Enemy - Virus Implementation
**Component:** Enemies/AI  
**Priority:** Critical  
**Milestone:** Alpha 1

**Description:**
Implement the Basic Virus enemy with simple AI and movement toward player.

**Acceptance Criteria:**
- [ ] Basic Virus sprite renders correctly
- [ ] Moves directly toward player at 80px/s
- [ ] 10 HP as specified in PRD
- [ ] Deals 5 damage on contact with player
- [ ] Dies when health reaches 0
- [ ] Spawns at screen edges only
- [ ] Uses object pooling for performance

**PRD Reference:** Section 4 Enemies Table, line 118

---

## Issue 4: Phagocytosis Burst Weapon
**Component:** Weapons/Combat  
**Priority:** Critical  
**Milestone:** Alpha 1

**Description:**
Implement the Phagocytosis Burst weapon as the starting weapon for Alpha 1.

**Acceptance Criteria:**
- [ ] Deals 10 base damage in 100px radius around player
- [ ] 1.5s cooldown between activations
- [ ] Damages all enemies within range simultaneously
- [ ] Visual effect shows burst area clearly
- [ ] Audio plays on weapon activation
- [ ] Weapon auto-fires on cooldown (no manual trigger)
- [ ] Damage numbers appear above hit enemies

**PRD Reference:** Section 3.3 Weapons Table, line 68

---

## Issue 5: Basic Collision System
**Component:** Systems/Core  
**Priority:** Critical  
**Milestone:** Alpha 1

**Description:**
Implement collision detection for player-enemy and weapon-enemy interactions.

**Acceptance Criteria:**
- [ ] Player takes damage when touching enemies
- [ ] 1-second invincibility frames after taking damage
- [ ] Player flashes during invincibility frames
- [ ] Weapons damage enemies within their defined ranges
- [ ] Collision detection is performant with 15+ enemies
- [ ] No collision bugs or edge cases

**PRD Reference:** Section 3.2 Health & Damage System

---

## Issue 6: Health System Implementation
**Component:** Player/Movement  
**Priority:** Critical  
**Milestone:** Alpha 1

**Description:**
Implement player health system with damage, death, and UI feedback.

**Acceptance Criteria:**
- [ ] Player starts with 100 HP
- [ ] Health decreases when hit by enemies (5 damage from Basic Virus)
- [ ] Health bar in top-left corner shows current HP
- [ ] Health bar flashes red when taking damage
- [ ] Screen shakes briefly when player takes damage
- [ ] Game ends when health reaches 0
- [ ] GameOver scene shows survival time

**PRD Reference:** Section 3.2 Health & Damage System

---

## Issue 7: Basic Enemy Spawning
**Component:** Enemies/AI  
**Priority:** High  
**Milestone:** Alpha 1

**Description:**
Implement basic enemy spawning system for testing core mechanics.

**Acceptance Criteria:**
- [ ] Spawns 1 Basic Virus every 2 seconds
- [ ] Enemies spawn at random screen edge positions
- [ ] Never spawns enemies within 100px of player
- [ ] Maximum 15 enemies on screen simultaneously
- [ ] Removes oldest enemies if spawn limit exceeded
- [ ] Spawning rate configurable via data file

**PRD Reference:** Section 4.3 Enemy Spawn Patterns

---

## Issue 8: Basic Game Loop Timer
**Component:** UI/HUD  
**Priority:** High  
**Milestone:** Alpha 1

**Description:**
Add survival timer and basic win condition for testing.

**Acceptance Criteria:**
- [ ] Timer displays in top-center of screen
- [ ] Counts up from 00:00 in MM:SS format
- [ ] Game ends in victory if player survives 5 minutes (Alpha 1 test duration)
- [ ] Timer pauses during pause state
- [ ] Victory screen shows final survival time
- [ ] Timer is clearly visible during gameplay

**PRD Reference:** Section 2 Core Gameplay Loop

---

## Issue 9: Asset Loading and Management
**Component:** Systems/Core  
**Priority:** High  
**Milestone:** Alpha 1

**Description:**
Set up proper asset loading for sprites, audio, and initial data files.

**Acceptance Criteria:**
- [ ] Player sprite loads and displays correctly
- [ ] Basic Virus sprite loads and displays correctly
- [ ] Weapon effect assets load properly
- [ ] Audio files load without errors
- [ ] Loading screen shows progress
- [ ] All assets use relative paths for GitHub Pages compatibility
- [ ] Error handling for missing assets

**PRD Reference:** Section 8 Technical Requirements

---

## Issue 10: Alpha 1 Performance Optimization
**Component:** Systems/Core  
**Priority:** Medium  
**Milestone:** Alpha 1

**Description:**
Ensure Alpha 1 meets 60 FPS performance target with basic object pooling.

**Acceptance Criteria:**
- [ ] Maintains 60 FPS with 15 enemies + player + weapon effects
- [ ] Object pooling implemented for Basic Virus enemies
- [ ] Object pooling implemented for weapon effect sprites
- [ ] No memory leaks during 5-minute play sessions
- [ ] Performance profiling shows stable frame times
- [ ] Graceful performance degradation if targets not met

**PRD Reference:** Section 8 Technical Requirements