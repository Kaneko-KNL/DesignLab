# DesignLab API Reference

This document provides detailed information about DesignLab's core APIs, interfaces, and functions.

## Table of Contents

1. [State Management](#state-management)
2. [Layout Engine](#layout-engine)
3. [Parts System](#parts-system)
4. [Export Functions](#export-functions)
5. [Utility Functions](#utility-functions)
6. [Type Definitions](#type-definitions)

## State Management

### Design Store (`useDesignStore`)

Manages design theme, typography, and metadata.

#### State Interface

```typescript
interface DesignState {
    type: DesignType;
    theme: DesignTheme;
    meta: {
        name: string;
        author: string;
        isDirty: boolean;
    };
    typography: {
        languages: {
            ja: { enabled: boolean; font: string };
            en: { enabled: boolean; font: string };
        };
    };
}
```

#### Actions

**`setDesignType(type: DesignType): void`**

Sets the design type and applies corresponding preset styles.

```typescript
const setDesignType = useDesignStore(state => state.setDesignType);
setDesignType('modern');
```

**`setColors(colors: ColorPalette): void`**

Updates the entire color palette.

```typescript
const setColors = useDesignStore(state => state.setColors);
setColors({
    background: '#ffffff',
    text: '#1a1a1a',
    primary: '#4f46e5',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    surface: '#f3f4f6'
});
```

**`setColor(key: keyof ColorPalette, value: string): void`**

Updates a single color in the palette.

```typescript
const setColor = useDesignStore(state => state.setColor);
setColor('primary', '#9d26d9');
```

**`randomizeColors(): void`**

Generates and applies a new random color palette.

```typescript
const randomizeColors = useDesignStore(state => state.randomizeColors);
randomizeColors();
```

#### Selectors

```typescript
// Optimized selectors for performance
const theme = useDesignStore(selectTheme);
const meta = useDesignStore(selectMeta);
const type = useDesignStore(selectType);
const typography = useDesignStore(selectTypography);
```

### Layout Store (`useLayoutStore`)

Manages layout structure, parts, and edit history.

#### State Interface

```typescript
interface LayoutState {
    currentLayout: Layout | null;
    parts: Record<string, Part>;
    activeSiteType: SiteType;
    selectedPartId: string | null;
    history: {
        past: HistoryEntry[];
        future: HistoryEntry[];
    };
}
```

#### Actions

**`generateLayout(siteType: SiteType): void`**

Generates a new layout based on the site type.

```typescript
const generateLayout = useLayoutStore(state => state.generateLayout);
generateLayout('landing-page');
```

**`addPart(part: Part, areaId: LayoutAreaId): void`**

Adds a new part to the specified layout area.

```typescript
const addPart = useLayoutStore(state => state.addPart);
addPart(newPart, 'main');
```

**`updatePart(partId: string, updates: Partial<Part>): void`**

Updates properties of an existing part.

```typescript
const updatePart = useLayoutStore(state => state.updatePart);
updatePart('part-123', { props: { text: 'New Text' } });
```

**`movePart(partId: string, newAreaId: LayoutAreaId): void`**

Moves a part to a different layout area.

```typescript
const movePart = useLayoutStore(state => state.movePart);
movePart('part-123', 'sidebar');
```

**`undo(): void` / `redo(): void`**

Navigate through edit history.

```typescript
const { undo, redo } = useLayoutStore(state => ({
    undo: state.undo,
    redo: state.redo
}));
```

#### Selectors

```typescript
const currentLayout = useLayoutStore(selectCurrentLayout);
const parts = useLayoutStore(selectParts);
const selectedPartId = useLayoutStore(selectSelectedPartId);
const history = useLayoutStore(selectHistory);
```

## Layout Engine

### LayoutGenerator

Generates layout structures based on site type.

#### Methods

**`generate(siteType: SiteType): Layout`**

Generates a complete layout for the given site type.

```typescript
import { LayoutGenerator } from '@/lib/layout/LayoutGenerator';

const generator = new LayoutGenerator();
const layout = generator.generate('landing-page');
```

**`calculateGrid(areas: LayoutArea[]): GridSpec`**

Calculates grid specifications for the given areas.

```typescript
const gridSpec = generator.calculateGrid(areas);
// Returns: { columns, rows, gridTemplateAreas, gridTemplateColumns, gridTemplateRows }
```

## Parts System

### PartsCatalog

Registry of available component parts.

#### Structure

```typescript
interface PartDefinition {
    component: React.ComponentType<unknown>;
    defaultProps: Record<string, unknown>;
    category: 'base' | 'hero' | 'features' | 'content' | 'footer';
}

const PARTS_CATALOG: Record<PartType, PartDefinition>;
```

#### Usage

```typescript
import { PARTS_CATALOG } from '@/lib/parts/PartsCatalog';

const buttonDef = PARTS_CATALOG['button'];
const Component = buttonDef.component;
const props = buttonDef.defaultProps;
```

### PartsFactory

Creates new part instances.

#### Methods

**`createPart(type: PartType): Part`**

Creates a part with default properties.

```typescript
import { PartsFactory } from '@/lib/parts/PartsFactory';

const factory = new PartsFactory();
const button = factory.createPart('button');
```

**`createPartWithProps(type: PartType, props: Record<string, unknown>): Part`**

Creates a part with custom properties.

```typescript
const customButton = factory.createPartWithProps('button', {
    text: 'Click Me',
    variant: 'primary',
    size: 'large'
});
```

## Export Functions

### YAML Export

**`generateDesignYaml(design: DesignState, layout: Layout, parts: Part[]): string`**

Generates YAML representation of the design.

```typescript
import { generateDesignYaml } from '@/lib/yaml';

const yaml = generateDesignYaml(designState, layout, partsArray);
```

**`downloadYaml(yaml: string, filename: string): void`**

Downloads YAML as a file.

```typescript
import { downloadYaml } from '@/lib/yaml';

downloadYaml(yamlContent, 'my-design.yaml');
```

### React Export

**`ReactExporter.exportToReact(design: DesignState, layout: Layout, parts: Part[]): string`**

Generates React component code.

```typescript
import { ReactExporter } from '@/lib/export/ReactExporter';

const reactCode = ReactExporter.exportToReact(designState, layout, partsArray);
```

## Utility Functions

### Color Generation

**`generateRandomPalette(): ColorPalette`**

Generates a harmonious random color palette.

```typescript
import { generateRandomPalette } from '@/lib/colors';

const palette = generateRandomPalette();
```

**`hslToHex(h: number, s: number, l: number): string`**

Converts HSL to HEX color.

```typescript
import { hslToHex } from '@/lib/colors';

const hex = hslToHex(240, 100, 50); // Returns '#0000ff'
```

### Debounced Callback

**`useDebouncedCallback<T>(callback: T, delay: number): T`**

Creates a debounced version of a callback.

```typescript
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

const debouncedSave = useDebouncedCallback((value) => {
    saveToServer(value);
}, 500);
```

## Type Definitions

### Core Types

```typescript
// Site types
type SiteType = 
    | 'landing-page' 
    | 'blog' 
    | 'corporate' 
    | 'dashboard' 
    | 'app' 
    | 'mobile';

// Design types
type DesignType = 
    | 'modern' 
    | 'classic' 
    | 'nature' 
    | 'cyber' 
    | 'minimal'
    | 'glass' 
    | 'restaurant' 
    | 'hotel' 
    | 'medical' 
    | 'nursery'
    | 'news' 
    | 'paper' 
    | 'wiki';

// Layout area IDs
type LayoutAreaId = 
    | 'header' 
    | 'hero' 
    | 'main' 
    | 'sidebar' 
    | 'footer';

// Part types
type PartType = 
    | 'button' 
    | 'card' 
    | 'heading' 
    | 'text' 
    | 'image'
    | 'hero-simple' 
    | 'hero-split'
    | 'feature-grid' 
    | 'feature-list'
    | 'content-block' 
    | 'gallery'
    | 'footer-simple' 
    | 'footer-multi-column';
```

### Layout Types

```typescript
interface Layout {
    id: string;
    siteType: SiteType;
    areas: LayoutArea[];
    gridSpec: GridSpec;
}

interface LayoutArea {
    id: LayoutAreaId;
    label: string;
    gridArea: string;
    parts: string[]; // Part IDs
}

interface GridSpec {
    columns: number;
    rows: number;
    gridTemplateAreas: string[];
    gridTemplateColumns: string;
    gridTemplateRows: string;
}
```

### Part Types

```typescript
interface Part {
    id: string;
    type: PartType;
    areaId: LayoutAreaId;
    props: Record<string, unknown>;
    styles?: React.CSSProperties;
}
```

### Theme Types

```typescript
interface ColorPalette {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
}

interface DesignTheme {
    colors: ColorPalette;
    radius: string;
    shadow: string;
    fontHeading: string;
    fontBody: string;
}
```

## Constants

Import from `@/lib/constants`:

```typescript
import {
    ANIMATION_DURATION,
    BREAKPOINTS,
    VIEWPORT_WIDTHS,
    DEBOUNCE_DELAY,
    DEFAULT_COLORS,
    TOAST_DURATION,
    Z_INDEX
} from '@/lib/constants';
```

## Error Handling

### ErrorBoundary

Wrap components with ErrorBoundary for graceful error handling:

```typescript
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

<ErrorBoundary fallback={<CustomErrorUI />}>
    <YourComponent />
</ErrorBoundary>
```

## Toast Notifications

### useToast Hook

```typescript
import { useToast } from '@/components/common/Toast';

const { showToast } = useToast();

// Show success
showToast('Design saved successfully!', 'success');

// Show error
showToast('Failed to export design', 'error');

// Show info
showToast('Generating layout...', 'info');
```

---

For more information, see the [User Guide](USER_GUIDE.md) and [Architecture](ARCHITECTURE.md) documentation.
