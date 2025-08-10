# Bloodstream Survivors

A top-down arena survival game where you play as a white blood cell defending against viral invaders in the bloodstream. Built with Phaser 3 and TypeScript.

## Quick Start

```bash
npm install
npm run dev
```

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
```

## Project Structure

```
src/
├── scenes/          # Phaser game scenes
├── systems/         # Game systems (weapons, enemies, etc.)
├── components/      # Reusable game components
├── data/           # Game data (weapons, enemies, levels)
├── utils/          # Utility functions
└── types/          # TypeScript type definitions

assets/
├── sprites/        # Game sprites and atlases
├── audio/          # Sound effects and music
└── data/           # JSON configuration files
```

## Technical Stack

- **Engine**: Phaser 3 (WebGL)
- **Language**: TypeScript
- **Bundler**: Vite
- **Target**: GitHub Pages deployment
- **Physics**: Phaser Arcade Physics

## Key Features

- Automatic weapon targeting system
- Three damage types (viral, toxic, physical) with enemy resistances
- Weapon tier system (common, rare, epic) with mastery effects
- Combo system with kill streak multipliers
- Visual feedback with damage numbers and threat indicators
- Enemy telegraph system for attack warnings
- Object pooling for performance
- Data-driven weapon and enemy configuration
- Boss battles with weak point mechanics
- Meta-progression system
- 20-minute survival gameplay loop

## Getting Started

1. Follow the setup guide in `docs/SETUP.md` for first-time development
2. Read the PRD (`docs/bloodstream_survivors_prd.md`) for game design details
3. Review `docs/ARCHITECTURE.md` for system design overview
4. Check `docs/GAME_SYSTEMS.md` for implementation specifications
5. Follow `docs/PHASER_PATTERNS.md` for coding best practices

## Performance Requirements

- Target: 60 FPS
- Object pooling for all dynamic entities
- Texture atlas batching
- Efficient particle systems