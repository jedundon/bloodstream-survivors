# Asset Pipeline and Management

## Asset Organization

```
assets/
├── sprites/
│   ├── atlases/           # Texture atlases for batched rendering
│   │   ├── game-atlas.png
│   │   └── game-atlas.json
│   ├── ui/               # UI elements and HUD components
│   └── backgrounds/      # Background and environment art
├── audio/
│   ├── sfx/             # Sound effects
│   ├── music/           # Background music
│   └── ui/              # UI sound effects
└── data/
    ├── weapons.json
    ├── enemies.json
    └── progression.json
```

## Sprite Atlas Generation

### TexturePacker Configuration
```json
{
  "smartupdate": true,
  "trimmode": "Trim",
  "format": "RGBA8888",
  "algorithm": "MaxRects",
  "dataformat": "phaser3",
  "padding": 2,
  "extrude": 1,
  "scale": 1
}
```

### Atlas Organization Strategy
- **game-atlas**: Core gameplay sprites (player, enemies, projectiles)
- **ui-atlas**: HUD elements, buttons, icons, tier indicators
- **fx-atlas**: Particle textures, damage type effects, telegraph warnings
- **boss-atlas**: Large boss sprites (separate for memory management)
- **mastery-atlas**: Weapon mastery effects and enhanced visuals

## Asset Optimization

### Sprite Guidelines
- Maximum texture size: 2048x2048 for compatibility
- Use PNG format with transparency
- Optimize with tools like TinyPNG before atlas generation
- Keep sprite dimensions power-of-2 when possible

### Audio Guidelines
```
SFX: 22.05kHz, 16-bit, mono, OGG format
Music: 44.1kHz, 16-bit, stereo, OGG format
Combo/Telegraph SFX: 22.05kHz, 16-bit, mono, OGG format
Max file size: 500KB per audio file
```

### Audio System Requirements
**New Audio Categories:**
- **Combo System**: Ascending pitch sounds for kill streaks
- **Telegraph Warnings**: Alert sounds for enemy attack warnings
- **Damage Type Audio**: Distinct sound signatures per damage type
- **Mastery Effects**: Audio enhancement when weapons reach max level

### Performance Targets
- Total asset bundle: < 10MB for fast loading
- Individual textures: < 1MB each
- Audio files: < 500KB each

## Loading Strategy

### Preload Scene Implementation
```typescript
class PreloadScene extends Phaser.Scene {
  preload() {
    // Critical assets first
    this.load.atlas('game-atlas', 'sprites/game-atlas.png', 'sprites/game-atlas.json');
    
    // Non-critical assets with progress tracking
    this.load.on('progress', this.updateProgressBar, this);
    
    // Audio with fallback formats
    this.load.audio('bgm', ['audio/music/bloodstream.ogg', 'audio/music/bloodstream.mp3']);
  }
}
```

### Lazy Loading Pattern
```typescript
// Load boss assets when needed
loadBossAssets(bossId: string): Promise<void> {
  return new Promise((resolve) => {
    this.load.once('complete', resolve);
    this.load.atlas(`boss-${bossId}`, `sprites/bosses/${bossId}.png`, `sprites/bosses/${bossId}.json`);
    this.load.start();
  });
}
```

## Asset Creation Guidelines

### Sprite Design
- **Player**: 32x32px white blood cell with clear silhouette
- **Enemies**: 24x24px to 48x48px viruses with distinct shapes
- **Projectiles**: 8x8px to 16x16px with damage-type specific colors
- **Bosses**: 128x128px to 256x256px with multiple weak points
- **Particles**: 4x4px to 8x8px for damage type effects (viral, toxic, physical)
- **UI Elements**: Tier borders (common/rare/epic), threat arrows, combo indicators
- **Telegraph Effects**: Warning indicators, targeting circles, charge-up animations

### Visual Style
- Vector-inspired art with clean lines
- High contrast for visibility during intense action
- Particle-friendly sprites (simple shapes for multiplication)
- Color palette focused on medical/biological theme
- **Damage Type Colors**: Purple (viral), Green (toxic), White (physical)
- **Tier Indicators**: White borders (common), Blue glow (rare), Purple particles (epic)
- **Accessibility**: High contrast mode alternatives for all visual effects

### Animation Frames
- **Player**: 4-frame idle breathing animation, combo glow states
- **Enemies**: 2-frame floating/pulsing animation, telegraph warning states
- **Projectiles**: Static sprites with damage-type particle trails
- **Bosses**: 8-frame complex animations with weak point highlights
- **Damage Numbers**: 3-frame fade animation per damage type
- **Mastery Effects**: 6-frame weapon evolution animations
- **Telegraph Warnings**: 4-frame pulsing alert animations

## Build Pipeline Integration

### Vite Asset Handling
```typescript
// vite.config.ts
export default defineConfig({
  assetsInclude: ['**/*.json', '**/*.atlas'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
```

### Asset Validation
```bash
# Check atlas generation
npm run validate-atlases

# Optimize images
npm run optimize-images

# Validate JSON schemas
npm run validate-data
```

## Deployment Considerations

### GitHub Pages Optimization
- All asset paths must be relative
- Compress assets for faster loading
- Use WebP format where supported with PNG fallbacks
- Implement asset caching headers

### CDN Strategy (Future)
```typescript
const ASSET_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://cdn.example.com/bloodstream-survivors/'
  : './assets/';
```