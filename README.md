# DesignLab

**DesignLab** is an intelligent web design system that automatically generates beautiful, responsive layouts using AI-powered design principles. Create stunning websites with just a few clicks.

![Version](https://img.shields.io/badge/version-0.1.1-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎨 **AI-Powered Layout Generation** - Automatically generates optimal layouts based on site type
- 🧩 **Rich Component Library** - Pre-built components for heroes, features, content, and footers
- 🎯 **Drag & Drop Editor** - Intuitive interface for customizing layouts
- 🌈 **Smart Color System** - Automatic color palette generation with harmony rules
- 🎭 **Animated Background Effects** - 10+ customizable effects with color modes and parameters
- 📱 **Responsive Design** - Built-in viewport switching (desktop, tablet, mobile)
- 💾 **Multiple Export Formats** - Export to YAML or React components
- ⚡ **Real-time Preview** - See changes instantly as you design
- ♿ **Accessibility First** - Keyboard navigation and ARIA support
- 🔄 **Undo/Redo** - Full history management for all edits

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Kaneko-KNL/DesignLab.git
cd DesignLab

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Documentation

- [User Guide](docs/USER_GUIDE.md) - Learn how to use DesignLab
- [API Reference](docs/API_REFERENCE.md) - Developer documentation
- [Architecture](docs/ARCHITECTURE.md) - System design and architecture
- [Deployment Guide](docs/DEPLOYMENT.md) - How to deploy DesignLab

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit
- **Build Tool**: Turbopack

## 📁 Project Structure

```
DesignLab/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── common/       # Shared components (Toast, ErrorBoundary, etc.)
│   │   ├── editor/       # Editor components (PropertyPanel, etc.)
│   │   ├── layout/       # Layout components (Workspace, Header, etc.)
│   │   ├── parts/        # Design parts library
│   │   └── preview/      # Preview components
│   ├── lib/              # Utility libraries
│   │   ├── animation/    # Animation presets
│   │   ├── export/       # Export functionality
│   │   ├── layout/       # Layout engine
│   │   └── parts/        # Parts catalog and factory
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript type definitions
│   └── hooks/            # Custom React hooks
├── docs/                 # Documentation
└── public/               # Static assets
```

## 🎯 Usage

### Creating a Design

1. Select a site type (LP, Blog, Corporate, etc.)
2. The layout engine automatically generates an optimal structure
3. Customize colors, typography, and components
4. Add or remove parts using drag & drop
5. Export your design as YAML or React components

### Keyboard Shortcuts

- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📦 Build & Deploy

```bash
# Create production build
npm run build

# The build output will be in .next/
# Deploy to Vercel, Netlify, or your preferred platform
```

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Kaneko-KNL**

- GitHub: [@Kaneko-KNL](https://github.com/Kaneko-KNL)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by modern design systems
- Color theory based on HSL color space

---

**DesignLab** - Empowering designers and developers to create beautiful web experiences effortlessly.
