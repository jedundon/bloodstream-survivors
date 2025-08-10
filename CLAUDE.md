# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
```

## Project Architecture

This is a Phaser 3 TypeScript game using Vite for bundling, targeting GitHub Pages deployment.

### Core Architecture Patterns
- **Scene Management**: Boot → Preload → Menu → Gameplay → Pause flow
- **Component Systems**: Modular weapon, enemy, and upgrade systems
- **Data-Driven**: All game stats loaded from JSON configuration files
- **Object Pooling**: Performance-critical for projectiles, enemies, and pickups
- **Event-Driven**: Uses Phaser EventEmitter for system communication

### Key Directories
- `src/scenes/`: Phaser scene classes (BootScene, GameplayScene, etc.)
- `src/systems/`: Core game systems (WeaponSystem, EnemySpawner, etc.)
- `src/components/`: Reusable game entities (Player, Projectile, Enemy)
- `src/data/`: JSON configuration files for weapons, enemies, levels
- `src/types/`: TypeScript interfaces and type definitions
- `assets/`: Game assets organized by type (sprites, audio, data)

### Performance Requirements
- Maintain 60 FPS target
- Use object pooling for all dynamic entities
- Batch sprite operations with texture atlases
- Delta-time based movement and animations

### Testing Strategy
- Unit tests for game logic and calculations
- Integration tests for system interactions
- Manual testing for gameplay feel and balance

### Deployment
- Build artifacts go to `dist/`
- Deployed to GitHub Pages with relative asset paths
- Assets must be optimized for web delivery

## Documentation and Task Management

When working on this project, Claude should actively reference these key documents:

### Primary References (Always Check First)
- **`docs/bloodstream_survivors_prd.md`**: Complete product requirements and specifications
  - Use for exact feature requirements, stats, and mechanics
  - Reference specific sections/line numbers when implementing features
  - All numerical values (damage, HP, timers) must match PRD exactly

### Architecture and Implementation Guides
- **`docs/ARCHITECTURE.md`**: System design patterns and code organization
- **`docs/PHASER_PATTERNS.md`**: Framework-specific best practices
- **`docs/GAME_SYSTEMS.md`**: Detailed implementation guidance for core systems
- **`docs/DATA_SCHEMAS.md`**: JSON structure requirements for game data
- **`docs/TESTING_GUIDE.md`**: Testing approach and examples

### Task Management and Development Process
- **`.github/development-workflow.md`**: Development workflow for incremental builds
- **`.github/milestones.md`**: Alpha build scope and validation criteria
- **`.github/alpha-1-issues.md`**: Detailed Alpha 1 task breakdown
- **`.github/alpha-2-5-issues.md`**: Advanced feature task breakdown

### Implementation Guidelines
1. **Always check PRD first** for exact specifications before implementing any feature
2. **Reference architecture docs** to understand system integration patterns
3. **Follow alpha milestone scope** - only implement features assigned to current alpha
4. **Use exact numerical values** from PRD (no guessing or approximation)
5. **Check existing issues** in `.github/` files to understand task breakdown and dependencies
6. **Validate against acceptance criteria** defined in issue templates

### When Adding New Features
1. Check if feature exists in PRD specifications
2. Review relevant architecture documentation
3. Check if GitHub issue exists for this feature
4. Follow component patterns established in existing code
5. Implement exact requirements, no scope creep
6. Test against acceptance criteria from issue templates

### Data-Driven Development
All game configuration should be loaded from JSON files in `assets/data/`:
- Weapon stats and upgrade paths
- Enemy specifications and behaviors  
- Level progression and XP thresholds
- Power-up effects and durations
- Never hardcode values that exist in PRD