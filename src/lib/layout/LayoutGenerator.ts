import { Layout, SiteType, LayoutArea, GridSpec } from '@/types/layout';

export class LayoutGenerator {
    private static instance: LayoutGenerator;

    private constructor() { }

    public static getInstance(): LayoutGenerator {
        if (!LayoutGenerator.instance) {
            LayoutGenerator.instance = new LayoutGenerator();
        }
        return LayoutGenerator.instance;
    }

    public generate(siteType: SiteType): Layout {
        const areas = this.getAreasForSiteType(siteType);
        const gridSpec = this.calculateGrid(siteType);

        return {
            id: crypto.randomUUID(),
            siteType,
            areas,
            gridTemplateAreas: gridSpec.areas,
            gridTemplateColumns: gridSpec.columns > 1 ? `repeat(${gridSpec.columns}, 1fr)` : '1fr',
            gridTemplateRows: gridSpec.rows,
            gap: gridSpec.gap,
        };
    }

    private getAreasForSiteType(siteType: SiteType): LayoutArea[] {
        const commonAreas: LayoutArea[] = [
            { id: 'header', label: 'Header', components: [], gridArea: 'header' },
            { id: 'footer', label: 'Footer', components: [], gridArea: 'footer' },
        ];

        switch (siteType) {
            case 'landing-page':
                return [
                    ...commonAreas,
                    { id: 'hero', label: 'Hero Section', components: [], gridArea: 'hero' },
                    { id: 'section1', label: 'Section 1', components: [], gridArea: 'sect1' },
                    { id: 'section2', label: 'Section 2', components: [], gridArea: 'sect2' },
                    { id: 'section3', label: 'Section 3', components: [], gridArea: 'sect3' },
                    { id: 'section4', label: 'Section 4', components: [], gridArea: 'sect4' },
                    { id: 'section5', label: 'Section 5', components: [], gridArea: 'sect5' },
                ];
            case 'blog':
                return [
                    ...commonAreas,
                    { id: 'mainContent', label: 'Articles', components: [], gridArea: 'main' },
                    { id: 'sidebar', label: 'Sidebar', components: [], gridArea: 'sidebar' },
                ];
            case 'corporate':
                return [
                    ...commonAreas,
                    { id: 'hero', label: 'Hero', components: [], gridArea: 'hero' },
                    { id: 'mainContent', label: 'Services', components: [], gridArea: 'main' },
                ];
            case 'dashboard':
                return [
                    { id: 'sidebar', label: 'Navigation', components: [], gridArea: 'sidebar' },
                    { id: 'header', label: 'Top Bar', components: [], gridArea: 'header' },
                    { id: 'mainContent', label: 'Dashboard', components: [], gridArea: 'main' },
                ];
            case 'mobile':
            case 'application':
                return [
                    { id: 'header', label: 'Header', components: [], gridArea: 'header' },
                    { id: 'mainContent', label: 'Content', components: [], gridArea: 'main' },
                    { id: 'navigation', label: 'Tab Bar', components: [], gridArea: 'nav' },
                ];
            default:
                return commonAreas;
        }
    }

    private calculateGrid(siteType: SiteType): GridSpec {
        switch (siteType) {
            case 'landing-page':
                return {
                    columns: 1,
                    rows: 'auto auto auto auto auto auto auto auto',
                    areas: [
                        '"header"',
                        '"hero"',
                        '"sect1"',
                        '"sect2"',
                        '"sect3"',
                        '"sect4"',
                        '"sect5"',
                        '"footer"'
                    ],
                    gap: '0px'
                };
            case 'corporate':
                return {
                    columns: 1,
                    rows: 'auto auto 1fr auto',
                    areas: [
                        '"header"',
                        '"hero"',
                        '"main"',
                        '"footer"'
                    ],
                    gap: '0px'
                };
            case 'blog':
                return {
                    columns: 12,
                    rows: 'auto 1fr auto',
                    areas: [
                        '"header header header header header header header header header header header header"',
                        '"main main main main main main main main sidebar sidebar sidebar sidebar"',
                        '"footer footer footer footer footer footer footer footer footer footer footer footer"'
                    ],
                    gap: '24px'
                };
            case 'dashboard':
                return {
                    columns: 12,
                    rows: '60px 1fr',
                    areas: [
                        '"sidebar sidebar header header header header header header header header header header"',
                        '"sidebar sidebar main main main main main main main main main main"'
                    ],
                    gap: '0px'
                };
            case 'mobile':
            case 'application':
                return {
                    columns: 1,
                    rows: '60px 1fr 60px',
                    areas: [
                        '"header"',
                        '"main"',
                        '"nav"'
                    ],
                    gap: '0px'
                };
            default:
                return {
                    columns: 1,
                    rows: 'auto 1fr auto',
                    areas: ['"header"', '"main"', '"footer"'],
                    gap: '16px'
                };
        }
    }
}
