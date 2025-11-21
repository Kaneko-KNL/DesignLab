import { DesignState } from '@/store/designStore';
import { Layout, Part } from '@/types/layout';

export function generateDesignYaml(design: DesignState, layout?: Layout | null, parts?: Part[]): string {
  let yaml = `# DesignLab Export
# Generated at: ${new Date().toISOString()}

meta:
  name: "${design.meta.name}"
  author: "${design.meta.author}"
  
design:
  type: ${design.type}
  
theme:
  colors:
    background: "${design.theme.colors.background}"
    text: "${design.theme.colors.text}"
    primary: "${design.theme.colors.primary}"
    secondary: "${design.theme.colors.secondary}"
    accent: "${design.theme.colors.accent}"
    surface: "${design.theme.colors.surface}"
  
  typography:
    fontHeading: "${design.theme.fontHeading}"
    fontBody: "${design.theme.fontBody}"
  
  styling:
    radius: "${design.theme.radius}"
    shadow: "${design.theme.shadow}"
  
  backgroundEffect:
    type: "${design.theme.backgroundEffect?.type || 'none'}"
    animation: ${design.theme.backgroundEffect?.animation ?? false}
    interactive: ${design.theme.backgroundEffect?.interactive ?? false}

languages:
  ja:
    enabled: ${design.typography.languages.ja.enabled}
    font: "${design.typography.languages.ja.font}"
  en:
    enabled: ${design.typography.languages.en.enabled}
    font: "${design.typography.languages.en.font}"
`;

  // Add layout information if provided
  if (layout) {
    yaml += `\nlayout:
  siteType: ${layout.siteType}
  gridTemplateColumns: "${layout.gridTemplateColumns}"
  gridTemplateRows: "${layout.gridTemplateRows}"
  gap: "${layout.gap}"
  areas:
`;
    for (const area of layout.areas) {
      yaml += `    - id: ${area.id}
      label: "${area.label}"
      gridArea: "${area.gridArea}"
`;
    }
  }

  // Add parts information if provided
  if (parts && parts.length > 0) {
    yaml += `\nparts:
`;
    for (const part of parts) {
      yaml += `  - id: ${part.id}
    type: ${part.type}
    label: "${part.label}"
    areaId: ${part.areaId}
    props:
`;
      for (const [key, value] of Object.entries(part.props || {})) {
        const formattedValue = typeof value === 'string' ? `"${value}"` : value;
        yaml += `      ${key}: ${formattedValue}
`;
      }
    }
  }

  return yaml;
}

export function downloadYaml(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.yaml`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
