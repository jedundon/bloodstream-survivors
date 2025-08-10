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