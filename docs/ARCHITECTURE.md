# DesignLab Architecture

This document describes the system architecture, design decisions, and technical implementation of DesignLab.

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Component Hierarchy](#component-hierarchy)
3. [State Management](#state-management)
4. [Data Flow](#data-flow)
5. [Layout Engine](#layout-engine)
6. [Design Decisions](#design-decisions)

## High-Level Architecture

DesignLab follows a modern React architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App Router                   │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│   Components   │  │    Stores   │  │   Lib/Utils     │
│                │  │             │  │                 │
│ - Layout       │  │ - Design    │  │ - Layout Engine │
│ - Editor       │  │ - Layout    │  │ - Parts System  │
│ - Parts        │  │             │  │ - Export        │
│ - Preview      │  │             │  │ - Colors        │
└────────────────┘  └─────────────┘  └─────────────────┘
```

### Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **State**: Zustand (lightweight, performant)
- **Styling**: Tailwind CSS v4 + CSS Modules
- **DnD**: @dnd-kit (modern, accessible)
- **Build**: Turbopack (fast, efficient)

## Component Hierarchy

### Application Structure

```
App
├── MainLayout
│   ├── Header
│   │   ├── SiteTypeSelector
│   │   ├── ExportMenu
│   │   ├── ResponsiveControls
│   │   └── UndoRedoButtons
│   ├── DesignPanel (Left Sidebar)
│   │   ├── DesignTab
│   │   ├── TypographyTab
│   │   ├── ComponentsTab
│   │   └── FeedbackTab
│   ├── Workspace (Center Canvas)
│   │   ├── LayoutRenderer
│   │   │   ├── DroppableArea (per layout area)
│   │   │   │   └── DraggablePart (per part)
│   │   │   │       └── PartRenderer
│   │   │   │           └── [Actual Component]
│   │   └── DndContext
│   └── PropertyPanel (Right Sidebar)
│       ├── PropertiesTab
│       └── GlobalStylePanel
└── ErrorBoundary
```

### Component Responsibilities

#### Layout Components
- **MainLayout**: Overall app structure
- **Header**: Top navigation and controls
- **Workspace**: Main editing canvas
- **DesignPanel**: Left sidebar for design options
- **PropertyPanel**: Right sidebar for editing

#### Editor Components
- **DraggablePart**: Wraps parts with drag functionality
- **DroppableArea**: Defines drop zones in layout
- **PropertyPanel**: Edits selected part properties
- **ResponsivePanel**: Viewport size controls
- **GlobalStylePanel**: Theme color editing

#### Parts Components
- **Base**: Button, Card, Heading, Text, Image
- **Hero**: HeroSimple, HeroSplit
- **Features**: FeatureGrid, FeatureList
- **Content**: ContentBlock, Gallery
- **Footer**: FooterSimple, FooterMultiColumn

## State Management

### Store Architecture

DesignLab uses Zustand for state management with two main stores:

```
┌──────────────────────────────────────────────────────┐
│                    Application State                  │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────┐      ┌─────────────────┐       │
│  │  Design Store   │      │  Layout Store   │       │
│  ├─────────────────┤      ├─────────────────┤       │
│  │ - type          │      │ - currentLayout │       │
│  │ - theme         │      │ - parts         │       │
│  │ - meta          │      │ - activeSiteType│       │
│  │ - typography    │      │ - selectedPartId│       │
│  │                 │      │ - history       │       │
│  │ Actions:        │      │                 │       │
│  │ - setDesignType │      │ Actions:        │       │
│  │ - setColors     │      │ - generateLayout│       │
│  │ - setColor      │      │ - addPart       │       │
│  │ - randomize     │      │ - updatePart    │       │
│  └─────────────────┘      │ - movePart      │       │
│                           │ - undo/redo     │       │
│                           └─────────────────┘       │
└──────────────────────────────────────────────────────┘
```

### State Flow

1. **User Action** → Component event handler
2. **Component** → Store action
3. **Store** → State update
4. **State** → Component re-render
5. **Component** → UI update

### Performance Optimizations

- **Selectors**: Optimized selectors prevent unnecessary re-renders
- **React.memo**: Applied to frequently re-rendered components
- **Debouncing**: Used for expensive operations (property updates)

## Data Flow

### Layout Generation Flow

```
User selects site type
        │
        ▼
generateLayout(siteType)
        │
        ▼
LayoutGenerator.generate()
        │
        ├─→ getAreasForSiteType()
        │   └─→ Returns layout areas
        │
        ├─→ calculateGrid(areas)
        │   └─→ Returns grid specifications
        │
        └─→ Creates Layout object
                │
                ▼
        Store updates currentLayout
                │
                ▼
        LayoutRenderer re-renders
                │
                ▼
        UI displays new layout
```

### Part Addition Flow

```
User clicks "Add Random Part"
        │
        ▼
PartsFactory.createPart(type)
        │
        ├─→ Generates unique ID
        ├─→ Gets default props from catalog
        └─→ Returns Part object
                │
                ▼
addPart(part, areaId)
        │
        ├─→ Adds to parts record
        ├─→ Updates area's parts array
        └─→ Saves to history
                │
                ▼
        LayoutRenderer re-renders
                │
                ▼
        New part appears in UI
```

### Drag & Drop Flow

```
User drags part
        │
        ▼
DndContext.onDragStart
        │
        ▼
DndContext.onDragEnd
        │
        ├─→ Determines new area
        └─→ movePart(partId, newAreaId)
                │
                ├─→ Updates part's areaId
                ├─→ Updates area arrays
                └─→ Saves to history
                        │
                        ▼
                LayoutRenderer re-renders
                        │
                        ▼
                Part appears in new location
```

## Layout Engine

### Design Philosophy

The Layout Engine automatically generates optimal layouts based on site type, following these principles:

1. **Convention over Configuration**: Sensible defaults for each site type
2. **Grid-Based**: Uses CSS Grid for flexible, responsive layouts
3. **Area-Centric**: Layouts defined by semantic areas (header, hero, main, etc.)
4. **Composable**: Parts can be added to any compatible area

### Layout Generation Algorithm

```typescript
function generate(siteType: SiteType): Layout {
    // 1. Get areas for site type
    const areas = getAreasForSiteType(siteType);
    
    // 2. Calculate grid specifications
    const gridSpec = calculateGrid(areas);
    
    // 3. Create layout object
    return {
        id: generateId(),
        siteType,
        areas,
        gridSpec
    };
}
```

### Grid Calculation

The grid system uses a 12-column layout with automatic row sizing:

- **Columns**: Always 12 (standard grid system)
- **Rows**: Calculated based on number of areas
- **Template Areas**: Generated from area grid positions
- **Template Columns**: `repeat(12, 1fr)`
- **Template Rows**: `auto` for each row

### Supported Site Types

| Site Type | Areas | Grid Layout |
|-----------|-------|-------------|
| Landing Page | header, hero, main, footer | 4 rows, full-width |
| Blog | header, main, sidebar, footer | 4 rows, 8-4 split |
| Corporate | header, hero, main, footer | 4 rows, full-width |
| Dashboard | header, sidebar, main | 2 rows, 3-9 split |
| App | header, sidebar, main | 2 rows, 2-10 split |
| Mobile | header, main, footer | 3 rows, full-width |

## Design Decisions

### Why Zustand over Redux?

- **Simplicity**: Less boilerplate, easier to understand
- **Performance**: No context provider, direct subscriptions
- **Size**: Smaller bundle size (~1KB vs ~10KB)
- **TypeScript**: Better type inference out of the box

### Why @dnd-kit over react-dnd?

- **Modern**: Built for React 18+
- **Accessible**: ARIA support built-in
- **Performant**: Uses transform instead of position
- **Flexible**: Easier to customize behavior

### Why CSS Grid over Flexbox?

- **2D Layout**: Grid handles both rows and columns
- **Named Areas**: Semantic area names improve readability
- **Responsive**: Easy to change layout at breakpoints
- **Alignment**: Better control over item placement

### Why Tailwind CSS v4?

- **Performance**: Faster build times with new engine
- **Modern**: Latest CSS features
- **Customization**: Easy to extend and configure
- **DX**: Excellent developer experience

### Component Memoization Strategy

- **PartRenderer**: Memoized to prevent re-renders when parent updates
- **DraggablePart**: Not memoized (needs to respond to drag state)
- **DroppableArea**: Not memoized (needs to respond to drop state)

### History Management

- **Snapshot Strategy**: Full state snapshots for simplicity
- **Limit**: 50 past + 50 future entries
- **Trigger**: On layout changes and part modifications
- **Exclusions**: UI state (selected part, viewport) not saved

## Security Considerations

### XSS Prevention

- All user input is sanitized
- React's built-in XSS protection
- No `dangerouslySetInnerHTML` usage

### Data Validation

- TypeScript for compile-time type safety
- Runtime validation for external data
- Zod schemas for API responses (future)

## Performance Metrics

### Bundle Size

- **Initial Load**: ~200KB (gzipped)
- **Main Bundle**: ~150KB
- **Vendor Bundle**: ~50KB

### Lighthouse Scores (Target)

- **Performance**: >90
- **Accessibility**: >95
- **Best Practices**: >95
- **SEO**: >90

## Future Enhancements

### Planned Features

1. **Collaborative Editing**: Real-time multi-user editing
2. **Version Control**: Git-like versioning for designs
3. **Component Library**: User-created component sharing
4. **AI Suggestions**: ML-powered design recommendations
5. **A/B Testing**: Built-in variant testing

### Technical Debt

1. **Testing**: Add comprehensive unit and E2E tests
2. **Documentation**: JSDoc comments for all public APIs
3. **Accessibility**: Full WCAG 2.1 AA compliance
4. **Performance**: Further bundle size optimization

---

For implementation details, see the [API Reference](API_REFERENCE.md).
