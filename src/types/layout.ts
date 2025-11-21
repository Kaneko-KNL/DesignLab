export type SiteType =
    | 'landing-page'
    | 'blog'
    | 'corporate'
    | 'mobile'
    | 'dashboard'
    | 'application';

export type LayoutAreaId =
    | 'header'
    | 'navigation'
    | 'hero'
    | 'mainContent'
    | 'sidebar'
    | 'gallery'
    | 'footer';

export interface LayoutArea {
    id: LayoutAreaId;
    label: string;
    components: string[]; // IDs of parts allowed in this area
    styles?: React.CSSProperties;
    gridArea?: string;
}

export interface Layout {
    id: string;
    siteType: SiteType;
    areas: LayoutArea[];
    gridTemplateAreas: string[];
    gridTemplateColumns: string;
    gridTemplateRows: string;
    gap: string;
}

export interface Part {
    id: string;
    type: string;
    label: string;
    areaId: LayoutAreaId;
    props?: Record<string, unknown>;
    styles?: React.CSSProperties;
}

export interface PartCollection {
    [key: string]: Part[];
}

export interface GridSpec {
    columns: number;
    rows: string;
    areas: string[];
    gap: string;
}

export interface ResponsiveRules {
    mobile: Partial<Layout>;
    tablet: Partial<Layout>;
    desktop: Partial<Layout>;
}
