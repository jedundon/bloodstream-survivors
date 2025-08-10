# Alpha Build Milestones

## Alpha 1: Core Mechanics (MVP)
**Target Timeline:** 2-3 weeks  
**Validation Goal:** Prove core gameplay loop works

**Scope:**
- Basic player movement (8-directional WASD)
- Single weapon: Phagocytosis Burst
- Basic Virus enemy (moves toward player)
- Simple collision detection (player/enemy, weapon/enemy)
- Health system (100 HP, damage on contact)
- Game over screen
- Basic scene management (Menu → Gameplay → GameOver)

**Success Criteria:**
- Player can survive 2+ minutes consistently
- Weapon feels satisfying to use
- 60 FPS performance maintained
- No critical bugs or crashes

---

## Alpha 2: Progression System
**Target Timeline:** 2-3 weeks  
**Validation Goal:** Progression feels rewarding and balanced

**Scope:**
- XP system (orb collection, level thresholds)
- Weapon upgrade system (3 upgrade levels)
- 3 weapons total: Phagocytosis Burst, Antibody Dart, Cytokine Spray
- Spike Virus enemy type
- Basic UI (health bar, XP bar, level indicator)
- Level-up upgrade selection modal

**Success Criteria:**
- Clear progression feedback to player
- Weapon upgrades provide meaningful power increases
- Enemy difficulty scales appropriately
- UI is intuitive and responsive

---

## Alpha 3: Full Weapon Set + UI
**Target Timeline:** 3-4 weeks  
**Validation Goal:** Combat variety and UI polish

**Scope:**
- All 7 weapons from PRD implemented
- All 7 power-ups from PRD
- Complete HUD (timer, score, weapon icons, power-up timers)
- Cluster Virus and Parasite enemies
- Pause system
- Audio system integration
- Weapon tier system (Common/Rare/Epic)

**Success Criteria:**
- Each weapon feels unique and viable
- Power-ups provide meaningful tactical choices
- UI provides all necessary information clearly
- Audio enhances gameplay experience

---

## Alpha 4: Enemy Variety + Bosses
**Target Timeline:** 3-4 weeks  
**Validation Goal:** Combat depth and boss encounters

**Scope:**
- All enemy types from PRD (including Armor Virus)
- Enemy resistance system implementation
- First 2 bosses: Viral Behemoth, Cytokine Overlord
- Advanced spawn patterns and difficulty scaling
- Damage type system (Viral/Toxic/Physical)
- Enhanced visual effects and animations
- Threat indicators for off-screen enemies

**Success Criteria:**
- Each enemy type requires different tactical approaches
- Boss fights are challenging but fair
- Visual clarity maintained during intense combat
- Difficulty curve supports 15+ minute survival

---

## Alpha 5: Polish + Meta-progression
**Target Timeline:** 4-5 weeks  
**Validation Goal:** Complete game experience ready for release

**Scope:**
- Remaining 2 bosses: Hemophage Prime, Parasitic Hive
- Achievement system (15 achievements from PRD)
- Meta-progression (Genetic Material currency, unlocks)
- Statistics tracking and leaderboards
- Accessibility options (colorblind support, reduced motion)
- Performance optimizations (object pooling, culling)
- GitHub Pages deployment configuration
- Final balancing and polish

**Success Criteria:**
- Complete 20-minute survival experience
- Meta-progression provides long-term engagement
- Performance targets met on target hardware
- Ready for public release

---

## Milestone Dependencies
- Alpha 1 → Alpha 2: Core systems must be stable
- Alpha 2 → Alpha 3: Progression system validated
- Alpha 3 → Alpha 4: Combat foundation complete  
- Alpha 4 → Alpha 5: Core gameplay loop finalized

## Testing Strategy Per Alpha
- **Alpha 1-2**: Focus on core mechanics and feel
- **Alpha 3**: Balance testing across all weapons
- **Alpha 4**: Difficulty curve and boss encounter tuning
- **Alpha 5**: Full regression testing and performance validation