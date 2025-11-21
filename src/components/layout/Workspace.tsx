// Updated: 2025-11-21 08:33
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Save, Sparkles, FileDown, ChevronDown } from 'lucide-react';
import styles from './Workspace.module.css';
import clsx from 'clsx';
import { useDesignStore } from '@/store/designStore';
import { useLanguageStore } from '@/store/languageStore';
import { useLayoutStore } from '@/store/layoutStore';
import { SiteType } from '@/types/layout';
import { PreviewButton, PreviewCard, PreviewInput, PreviewBadge, PreviewSection, PreviewHero, PreviewArticle, PreviewDashboard, PreviewForm } from '@/components/preview/PreviewComponents';
import { PreviewToast, PreviewAlert, PreviewModal, PreviewTooltip } from '@/components/preview/PreviewFeedback';
import { PreviewDrawer, PreviewBottomSheet } from '@/components/preview/PreviewNavigation';
import { PreviewSpinner, PreviewProgress, PreviewSkeleton } from '@/components/preview/PreviewStatus';
import { PreviewTypography } from '@/components/preview/PreviewTypography';
import { generateDesignYaml, downloadYaml } from '@/lib/yaml';
import { getContrastMutedColor } from '@/lib/colors';
import { LayoutRenderer } from './LayoutRenderer';
import { PropertyPanel } from '@/components/editor/PropertyPanel';
import { ResponsivePanel, Viewport, getViewportWidth } from '@/components/editor/ResponsivePanel';
import { ReactExporter } from '@/lib/export/ReactExporter';
import { BackgroundEffects } from '../effects/BackgroundEffects';

const TABS = ['all', 'lp', 'blog', 'corporate', 'mobile', 'dashboard', 'app'] as const;

const TAB_TO_SITE_TYPE: Record<string, SiteType> = {
    lp: 'landing-page',
    blog: 'blog',
    corporate: 'corporate',
    mobile: 'mobile',
    dashboard: 'dashboard',
    app: 'application'
};

export default function Workspace() {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [viewport, setViewport] = useState<Viewport>('desktop');
    const [exportMenuOpen, setExportMenuOpen] = useState(false);
    const { meta, theme } = useDesignStore();
    const { t } = useLanguageStore();
    const { currentLayout, setSiteType, selectPart, selectedPartId } = useLayoutStore();
    const prevSiteTypeRef = useRef<SiteType | null>(null);

    // Update siteType when changing tabs (except 'all')
    useEffect(() => {
        if (activeTab !== 'all' && activeTab in TAB_TO_SITE_TYPE) {
            const siteType = TAB_TO_SITE_TYPE[activeTab];
            if (prevSiteTypeRef.current !== siteType) {
                setSiteType(siteType);
                prevSiteTypeRef.current = siteType;
            }
        }
    }, [activeTab, setSiteType]);

    // Deselect part when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-part]') && !target.closest('[data-property-panel]')) {
                selectPart(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [selectPart]);

    const handleSave = () => {
        const yaml = generateDesignYaml(useDesignStore.getState());
        downloadYaml(yaml, meta.name);
    };

    const handlePromptize = () => {
        const yaml = generateDesignYaml(useDesignStore.getState());
        navigator.clipboard.writeText(yaml);
        alert('Design prompt copied to clipboard!');
    };

    const handleExportReact = () => {
        try {
            const designState = useDesignStore.getState();
            const layoutState = useLayoutStore.getState();
            const partsList = Object.values(layoutState.parts);

            const exported = ReactExporter.exportToReact(
                designState,
                layoutState.currentLayout,
                partsList
            );

            const blob = new Blob([exported.component], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = exported.fileName;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export React component');
        }
    };

    const renderContent = () => {
        if (activeTab === 'all') {
            return (
                <>
                    <div style={{ marginBottom: '32px', width: '100%' }}>
                        <h3 style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: getContrastMutedColor(theme.colors.background),
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>Typography</h3>
                        <PreviewTypography />
                    </div>

                    <PreviewSection title={t.workspace.preview.core}>
                        <PreviewButton />
                        <PreviewInput />
                        <PreviewBadge />
                        <PreviewTooltip />
                    </PreviewSection>

                    <PreviewSection title={t.workspace.preview.containers}>
                        <PreviewCard />
                        <PreviewArticle />
                    </PreviewSection>

                    <PreviewSection title="Feedback">
                        <PreviewToast />
                        <PreviewAlert />
                        <PreviewModal />
                    </PreviewSection>

                    <PreviewSection title="Navigation">
                        <PreviewDrawer />
                        <PreviewBottomSheet />
                    </PreviewSection>

                    <PreviewSection title="Status">
                        <PreviewSpinner />
                        <PreviewProgress />
                        <PreviewSkeleton />
                    </PreviewSection>

                    <PreviewSection title="Sections">
                        <PreviewHero />
                        <PreviewDashboard />
                        <PreviewForm />
                    </PreviewSection>
                </>
            );
        }

        // For other tabs, show LayoutRenderer
        return <LayoutRenderer />;
    };

    return (
        <main className={styles.workspace} style={{ backgroundColor: theme.colors.background, transition: 'background-color 0.3s ease' }}>
            <BackgroundEffects />
            <div className={styles.toolbar}>
                <div className={styles.tabs}>
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            className={clsx(styles.tab, activeTab === tab && styles.activeTab)}
                            onClick={() => setActiveTab(tab)}
                        >
                            {t.workspace.tabs[tab]}
                        </button>
                    ))}
                </div>
                <div className={styles.actions}>
                    {activeTab !== 'all' && (
                        <ResponsivePanel
                            currentViewport={viewport}
                            onViewportChange={setViewport}
                        />
                    )}
                    <span className={styles.filename}>
                        {meta.name}
                        {meta.isDirty && <span className={styles.dirty}>*</span>}
                    </span>
                    <button className={styles.actionBtn} onClick={handleSave}>
                        <Save size={16} />
                        <span>{t.workspace.actions.save}</span>
                    </button>
                    <div style={{ position: 'relative' }}>
                        <button
                            className={clsx(styles.actionBtn, styles.primaryBtn)}
                            onClick={() => setExportMenuOpen(!exportMenuOpen)}
                        >
                            <FileDown size={16} />
                            <span>Export</span>
                            <ChevronDown size={14} />
                        </button>
                        {exportMenuOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '4px',
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                zIndex: 50,
                                minWidth: '150px'
                            }}>
                                <button
                                    onClick={() => {
                                        handlePromptize();
                                        setExportMenuOpen(false);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        textAlign: 'left'
                                    }}
                                >
                                    <Sparkles size={16} />
                                    <span>YAML</span>
                                </button>
                                <button
                                    onClick={() => {
                                        handleExportReact();
                                        setExportMenuOpen(false);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        textAlign: 'left'
                                    }}
                                >
                                    <FileDown size={16} />
                                    <span>React Component</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={clsx(styles.previewArea, activeTab !== 'all' && styles.layoutPreview)}>
                    {renderContent()}
                </div>
                {activeTab !== 'all' && (
                    <div className={styles.propertyPanel}>
                        {selectedPartId ? (
                            <PropertyPanel />
                        ) : (
                            <div className={styles.emptyPropertyPanel}>
                                <p>Select an element to edit properties</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
