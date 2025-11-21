# Changelog

All notable changes to DesignLab will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-11-21

### Added
- **Animated Background Effects System**
  - 10 different effect types: gradient, pattern, shapes, glow, blobs, lines, waves, spotlight, parallax, noise
  - Color mode selection (Light/Dark/Concept) for each effect
  - Effect-specific parameters with 2 customizable sliders per effect
  - Real-time preview and smooth animations
- **Enhanced Color Management**
  - Concept color palette generation (5 harmonious colors)
  - Unused concept colors automatically applied to background effects
  - Brightness-based color adjustment for light/dark modes
- **UI Improvements**
  - Dynamic parameter controls in Design Panel
  - Effect-specific slider labels with units (px, s, °, etc.)
  - Improved visual feedback for effect changes

### Fixed
- Background effects visibility and layering issues
- Shapes effect opacity increased from 0.1 to 0.35 for better visibility
- Waves effect edge clipping resolved with `overflow: visible`
- Blob SVG shapes redesigned for symmetrical balance
- CSS syntax errors in workspace and effects stylesheets
- Layout issues with vertical flex-direction restoration

### Changed
- Project name updated from "temp_app" to "designlab"
- Background effect parameters now use CSS variables for dynamic control
- Blob effect uses multiple small blobs instead of single complex path
- Animation durations and sizes controlled by user parameters

## [0.1.0] - 2025-11-20

### Added
- Initial release of DesignLab
- AI-powered layout generation system
- Rich component library (Hero, Features, Content, Footer)
- Drag & drop editor with selection system
- Smart color palette generation
- Responsive viewport switching
- YAML and React component export
- Typography management system
- Undo/redo functionality
- Keyboard navigation and ARIA support
- Performance optimizations with memoization
- Error boundary implementation
- Toast notification system

[0.1.1]: https://github.com/Kaneko-KNL/DesignLab/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/Kaneko-KNL/DesignLab/releases/tag/v0.1.0
