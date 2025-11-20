import { DesignState } from '@/store/designStore';

export function generateDesignYaml(state: DesignState): string {
  const { meta, theme } = state;

  // Manual YAML generation to avoid heavy dependencies for now
  // In a real app, we might use 'js-yaml'

  return `design_system:
  meta:
    name: "${meta.name}"
    author: "${meta.author}"
    last_modified: "${new Date().toISOString()}"
  theme:
    type: "${state.type}"
    colors:
      background: "${theme.colors.background}"
      text: "${theme.colors.text}"
      primary: "${theme.colors.primary}"
      accent: "${theme.colors.accent}"
      surface: "${theme.colors.surface}"
    typography:
      base_size: "16px"
      font_family: "Inter, sans-serif"
    components:
      radius: "${theme.radius}"
      shadow: "${theme.shadow}"
`;
}

export function downloadYaml(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.yaml') ? filename : `${filename}.yaml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
