# DesignLab User Guide

Welcome to DesignLab! This guide will help you get started with creating beautiful web designs.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Interface Overview](#interface-overview)
3. [Creating Your First Design](#creating-your-first-design)
4. [Working with Layouts](#working-with-layouts)
5. [Customizing Components](#customizing-components)
6. [Color and Typography](#color-and-typography)
7. [Exporting Your Design](#exporting-your-design)
8. [Keyboard Shortcuts](#keyboard-shortcuts)
9. [Tips and Best Practices](#tips-and-best-practices)

## Getting Started

### Launching DesignLab

1. Open your terminal
2. Navigate to the DesignLab directory
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Interface Overview

The DesignLab interface consists of four main areas:

#### 1. Header (Top Bar)
- **Site Type Selector**: Choose from LP, Blog, Corporate, Dashboard, App, or Mobile
- **Export Menu**: Export your design as YAML or React components
- **Responsive Controls**: Switch between Desktop, Tablet, and Mobile views
- **Undo/Redo Buttons**: Navigate through your edit history

#### 2. Left Sidebar (Design Panel)
- **Design Tab**: Select design styles (Modern, Classic, Nature, etc.)
- **Typography Tab**: Configure fonts and language settings
- **Components Tab**: Browse available UI components
- **Feedback Tab**: View notifications and alerts

#### 3. Center Canvas (Workspace)
- **Layout Preview**: See your design in real-time
- **Drag & Drop**: Rearrange components by dragging
- **Component Selection**: Click to select and edit parts

#### 4. Right Sidebar (Property Panel)
- **Properties Tab**: Edit selected component properties
- **Global Styles Tab**: Adjust theme colors

## Creating Your First Design

### Step 1: Choose a Site Type

1. Click the site type selector in the header
2. Select your desired type (e.g., "LP" for Landing Page)
3. The layout engine automatically generates an optimal structure

### Step 2: Select a Design Style

1. Open the **Design** tab in the left sidebar
2. Click on a design style (Modern, Classic, Nature, etc.)
3. The theme colors and styling will update automatically

### Step 3: Customize Colors

1. Click the **Randomize** button to generate a new color palette
2. Or switch to the **Global Styles** tab in the right sidebar
3. Click on any color to open the color picker
4. Adjust colors to match your brand

### Step 4: Add Components

1. Open the **Components** tab in the left sidebar
2. Browse available components (Buttons, Cards, Headings, etc.)
3. Click **Add Random Part** to add a component to your layout
4. Components are automatically placed in appropriate layout areas

## Working with Layouts

### Understanding Layout Areas

DesignLab uses a grid-based layout system with predefined areas:

- **Header**: Top navigation and branding
- **Hero**: Main visual section
- **Main**: Primary content area
- **Sidebar**: Secondary content (if applicable)
- **Footer**: Bottom information and links

### Drag and Drop

1. Click and hold on any component in the canvas
2. Drag it to a new position
3. Drop it in the desired location
4. The layout automatically adjusts

### Responsive Design

1. Click the viewport selector in the header
2. Choose Desktop (100%), Tablet (768px), or Mobile (375px)
3. Preview how your design looks on different screen sizes

## Customizing Components

### Selecting a Component

- Click on any component in the canvas
- The selected component will be highlighted
- Properties appear in the right sidebar

### Editing Properties

1. Select a component
2. Open the **Properties** tab in the right sidebar
3. Modify available properties:
   - Text content
   - Colors
   - Sizes
   - Alignment
   - Styles

### Example: Editing a Button

1. Click on a button component
2. In the Properties panel:
   - Change `text` to your desired label
   - Select `variant` (primary, secondary, outline)
   - Choose `size` (small, medium, large)

## Color and Typography

### Global Theme Colors

Access global colors in the **Global Styles** tab:

- **Background**: Page background color
- **Text**: Primary text color
- **Primary**: Main brand color
- **Secondary**: Secondary brand color
- **Accent**: Highlight color
- **Surface**: Card and panel backgrounds

### Typography Settings

1. Open the **Typography** tab in the left sidebar
2. Configure language support:
   - **Japanese**: Enable/disable and select font
   - **English**: Enable/disable and select font

## Exporting Your Design

### Export as YAML

1. Click the **Export** button in the header
2. Select **Export as YAML**
3. A `.yaml` file will download containing:
   - Design metadata
   - Theme configuration
   - Layout structure
   - Component definitions

### Export as React

1. Click the **Export** button in the header
2. Select **Export as React**
3. A `.tsx` file will download containing:
   - React component code
   - CSS module styles
   - Ready to use in your Next.js project

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Z` | Undo last action |
| `Ctrl/Cmd + Shift + Z` | Redo last undone action |

## Tips and Best Practices

### Color Selection

- **Use the Randomize button** to explore different color combinations
- **Maintain contrast** between background and text colors
- **Limit your palette** to 3-5 main colors for cohesion

### Layout Design

- **Start with a site type** that matches your goal
- **Use the grid system** to maintain alignment
- **Test responsive views** to ensure mobile compatibility

### Component Usage

- **Group related content** in the same layout area
- **Use appropriate components** for each section (Hero for top, ContentBlock for main content)
- **Keep it simple** - fewer, well-designed components are better than many cluttered ones

### Performance

- **Avoid excessive nesting** of components
- **Use the undo/redo** feature to experiment safely
- **Export regularly** to save your progress

### Workflow

1. **Plan first**: Decide on site type and overall structure
2. **Design second**: Choose colors and typography
3. **Customize third**: Add and arrange components
4. **Test fourth**: Check responsive views
5. **Export last**: Download your final design

## Troubleshooting

### Layout Not Updating

- Try switching to a different site type and back
- Refresh the page if necessary

### Components Not Appearing

- Check that you're adding components to the correct layout area
- Some site types have different available areas

### Export Not Working

- Ensure you have components in your layout
- Check browser console for any errors
- Try a different browser if issues persist

## Getting Help

- Check the [API Reference](API_REFERENCE.md) for technical details
- Review the [Architecture](ARCHITECTURE.md) for system understanding
- Submit issues on GitHub for bugs or feature requests

---

Happy designing with DesignLab! 🎨
