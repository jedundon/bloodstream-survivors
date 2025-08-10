# Deployment Guide

## GitHub Pages Setup

### Repository Configuration
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Configure custom domain (optional)

### Build and Deploy Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Type check
      run: npm run type-check
    
    - name: Build for production
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Vite Configuration for GitHub Pages

### vite.config.ts
```typescript
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    base: isProduction ? '/bloodstream-survivors/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            phaser: ['phaser']
          }
        }
      }
    },
    server: {
      port: 5173,
      host: true
    }
  };
});
```

## Asset Path Configuration

### Relative Path Strategy
All asset loading must use relative paths:

```typescript
// Good: relative paths work on GitHub Pages
this.load.atlas('game-atlas', './assets/sprites/game-atlas.png', './assets/sprites/game-atlas.json');

// Bad: absolute paths break on GitHub Pages  
this.load.atlas('game-atlas', '/assets/sprites/game-atlas.png', '/assets/sprites/game-atlas.json');
```

### Base URL Helper
```typescript
const getAssetPath = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}assets/${path}`.replace(/\/+/g, '/');
};
```

## Production Optimizations

### Build Optimizations
```json
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "vite build --mode analyze",
    "optimize": "npm run optimize:images && npm run build"
  }
}
```

### Asset Compression
- Enable gzip compression in build pipeline
- Optimize images before build
- Minify JSON configuration files
- Tree-shake unused Phaser features

### Caching Strategy
```typescript
// Service worker for asset caching (optional)
const CACHE_NAME = 'bloodstream-survivors-v1';
const ASSETS_TO_CACHE = [
  './assets/sprites/game-atlas.png',
  './assets/sprites/fx-atlas.png',
  './assets/sprites/mastery-atlas.png',
  './assets/audio/bloodstream-ambience.ogg',
  './assets/audio/combo-sounds.ogg',
  './assets/audio/telegraph-warnings.ogg'
];
```

## Environment Configuration

### Development vs Production
```typescript
const config = {
  development: {
    debug: true,
    showFPS: true,
    godMode: false
  },
  production: {
    debug: false,
    showFPS: false,
    godMode: false
  }
};
```

### Feature Flags
```typescript
interface FeatureFlags {
  enableAnalytics: boolean;
  enableCheatCodes: boolean;
  enablePerformanceMetrics: boolean;
  enableDamageTypeIndicators: boolean;
  enableComboSystem: boolean;
  enableTelegraphSystem: boolean;
  enableThreatIndicators: boolean;
  enableWeaponMasteryEffects: boolean;
}
```

## Deployment Checklist

### Pre-Deploy Validation
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] ESLint warnings resolved
- [ ] Asset optimization complete
- [ ] Performance benchmarks met
- [ ] Cross-browser testing complete

### Post-Deploy Verification
- [ ] Game loads correctly on GitHub Pages URL
- [ ] All assets loading without 404 errors
- [ ] Audio playing correctly
- [ ] Save/load functionality working
- [ ] Performance acceptable on target devices
- [ ] Damage type visual effects rendering correctly
- [ ] Combo system displaying and calculating properly
- [ ] Enemy telegraph warnings visible and timed correctly
- [ ] Threat indicators pointing to off-screen enemies
- [ ] Weapon mastery effects activating at max level

## Troubleshooting Common Issues

### Asset Loading Failures
- Check console for 404 errors
- Verify asset paths are relative
- Ensure case sensitivity matches file names
- Check GitHub Pages build logs

### Performance Issues
- Monitor bundle size with `npm run build:analyze`
- Check for memory leaks in browser DevTools
- Verify object pooling is working correctly
- Profile frame rate during intense gameplay