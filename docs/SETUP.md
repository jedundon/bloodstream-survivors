# Development Setup Guide

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## First-Time Setup

### 1. Clone and Install
```bash
# Clone the repository
git clone [repository-url]
cd bloodstream-survivors

# Install dependencies
npm install
```

### 2. Verify Installation
```bash
# Check that all tools work
npm run type-check
npm run lint
npm test
```

### 3. Start Development
```bash
# Start development server
npm run dev
```

The game will open at `http://localhost:5173`

## Recommended IDE Setup

### VS Code Extensions
- **TypeScript Hero**: Auto-import management
- **ESLint**: Code linting and formatting
- **Phaser 3 Snippets**: Game development helpers
- **GitLens**: Enhanced git integration
- **Bracket Pair Colorizer**: Better code visibility

### VS Code Settings
Add to your `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

## Development Workflow

### Making Changes
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes following the patterns in `docs/PHASER_PATTERNS.md`
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Test manually: `npm run dev`
6. Commit with clear message following `docs/CONTRIBUTING.md`

### Testing Your Changes
```bash
# Run all tests
npm test

# Run tests in watch mode while developing
npm run test:watch

# Generate coverage report
npm run test:coverage

# Check TypeScript compilation
npm run type-check
```

## Common Issues and Solutions

### 1. Port Already in Use
If port 5173 is busy:
```bash
# Kill process using the port
npx kill-port 5173

# Or start on different port
npm run dev -- --port 3000
```

### 2. Asset Loading Errors
- Ensure all asset paths use relative paths (no leading `/`)
- Check that file names match exactly (case-sensitive)
- Verify assets exist in correct directories

### 3. TypeScript Errors
- Run `npm run type-check` for detailed error information
- Check that all imports use correct paths
- Ensure interfaces match the schemas in `docs/DATA_SCHEMAS.md`

### 4. Performance Issues During Development
- Use browser DevTools Performance tab
- Check object pooling is working correctly
- Monitor memory usage during gameplay
- Verify 60 FPS target is maintained

## Project Structure Overview

```
bloodstream-survivors/
├── src/
│   ├── scenes/         # Phaser game scenes
│   ├── systems/        # Game systems (weapons, enemies, etc.)
│   ├── components/     # Reusable game components
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript interfaces
├── assets/
│   ├── sprites/        # Game sprites and atlases
│   ├── audio/          # Sound effects and music
│   └── data/           # JSON configuration files
├── tests/              # Test files
├── docs/               # Project documentation
└── dist/               # Build output (auto-generated)
```

## Next Steps

1. Read `docs/bloodstream_survivors_prd.md` to understand the game design
2. Review `docs/ARCHITECTURE.md` for system architecture
3. Check `docs/GAME_SYSTEMS.md` for implementation details
4. Follow `docs/PHASER_PATTERNS.md` for best practices
5. See `docs/CONTRIBUTING.md` for development workflow

## Getting Help

- Check documentation in the `docs/` folder
- Review existing code patterns in `src/`
- Run `npm run lint` and `npm run type-check` to catch issues early
- Use browser DevTools for debugging game behavior

## Quick Feature Development Example

1. **Add a new weapon**: 
   - Define config in `assets/data/weapons.json`
   - Create weapon class in `src/components/`
   - Add to weapon system in `src/systems/WeaponSystem.ts`
   - Write tests in `tests/weapons/`

2. **Add a new enemy**:
   - Define config in `assets/data/enemies.json`
   - Create enemy class in `src/components/`
   - Update spawn system in `src/systems/EnemySpawner.ts`
   - Write tests in `tests/enemies/`