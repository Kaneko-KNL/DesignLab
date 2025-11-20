"use client";

import React, { useState } from 'react';
import { Save, Sparkles } from 'lucide-react';
import styles from './Workspace.module.css';
import clsx from 'clsx';
import { useDesignStore } from '@/store/designStore';
import { useLanguageStore } from '@/store/languageStore';
import { PreviewButton, PreviewCard, PreviewInput, PreviewBadge, PreviewSection, PreviewHero, PreviewArticle, PreviewDashboard, PreviewForm } from '@/components/preview/PreviewComponents';
import { PreviewToast, PreviewAlert, PreviewModal, PreviewTooltip } from '@/components/preview/PreviewFeedback';
import { PreviewDrawer, PreviewBottomSheet } from '@/components/preview/PreviewNavigation';
import { PreviewSpinner, PreviewProgress, PreviewSkeleton } from '@/components/preview/PreviewStatus';
import { PreviewTypography } from '@/components/preview/PreviewTypography';
import { generateDesignYaml, downloadYaml } from '@/lib/yaml';

const TABS = ['all', 'lp', 'blog', 'corporate', 'mobile', 'dashboard', 'app'] as const;

export default function Workspace() {
    const [activeTab, setActiveTab] = useState<string>('all');
    const { meta, theme } = useDesignStore();
    const { t } = useLanguageStore();

    const handleSave = () => {
        const yaml = generateDesignYaml(useDesignStore.getState());
        downloadYaml(yaml, meta.name);
    };

    const handlePromptize = () => {
        const yaml = generateDesignYaml(useDesignStore.getState());
        navigator.clipboard.writeText(yaml);
        alert('Design prompt copied to clipboard!');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'lp':
                return (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <PreviewHero />
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <PreviewButton />
                            <PreviewButton />
                        </div>
                        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <PreviewCard />
                            <PreviewCard />
                            <PreviewCard />
                        </div>
                    </div>
                );
            case 'blog':
                return (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
                        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>Design Blog</h1>
                        <PreviewArticle />
                        <PreviewArticle />
                        <div style={{
                            padding: '32px',
                            backgroundColor: theme.colors.surface,
                            borderRadius: theme.radius,
                            border: `1px solid ${theme.colors.primary}20`
                        }}>
                            <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Subscribe to Newsletter</h3>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <PreviewInput />
                                <PreviewButton />
                            </div>
                        </div>
                    </div>
                );
            case 'corporate':
                return (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '16px' }}>Our Company</h1>
                            <p style={{ fontSize: '18px', opacity: 0.8 }}>Leading the industry with innovation</p>
                        </div>
                        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <PreviewCard />
                            <PreviewCard />
                            <PreviewCard />
                        </div>
                        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                            <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>Contact Us</h2>
                            <PreviewForm />
                        </div>
                    </div>
                );
            case 'dashboard':
                return (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '28px', fontWeight: 600 }}>Dashboard</h1>
                            <PreviewBadge />
                        </div>
                        <PreviewDashboard />
                        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Tasks Progress</h3>
                                <PreviewProgress />
                            </div>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Recent Activity</h3>
                                <PreviewAlert />
                            </div>
                        </div>
                    </div>
                );
            case 'app':
                return (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '500px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Welcome</h1>
                            <p style={{ opacity: 0.7 }}>Sign in to continue</p>
                        </div>
                        <PreviewForm />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <PreviewToast />
                            <PreviewAlert />
                        </div>
                        <PreviewModal />
                    </div>
                );
            case 'mobile':
                return (
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '40px 0'
                    }}>
                        <div style={{
                            width: '375px',
                            height: '667px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '36px',
                            padding: '12px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: theme.colors.background,
                                borderRadius: '28px',
                                overflow: 'auto',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '140px',
                                    height: '28px',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '0 0 20px 20px',
                                    zIndex: 10
                                }} />
                                <div style={{
                                    padding: '40px 20px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px'
                                }}>
                                    <div style={{
                                        padding: '16px',
                                        backgroundColor: theme.colors.surface,
                                        borderRadius: theme.radius,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Mobile App</h2>
                                        <PreviewBadge />
                                    </div>
                                    <PreviewSkeleton />
                                    <PreviewCard />
                                    <div style={{ marginTop: 'auto' }}>
                                        <PreviewBottomSheet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'all':
            default:
                return (
                    <>
                        <div style={{ marginBottom: '32px', width: '100%' }}>
                            <h3 style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'rgba(0, 0, 0, 0.6)',
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
    };

    return (
        <main className={styles.workspace}>
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
                    <span className={styles.filename}>
                        {meta.name}
                        {meta.isDirty && <span className={styles.dirty}>*</span>}
                    </span>
                    <button className={styles.actionBtn} onClick={handleSave}>
                        <Save size={16} />
                        <span>{t.workspace.actions.save}</span>
                    </button>
                    <button className={clsx(styles.actionBtn, styles.primaryBtn)} onClick={handlePromptize}>
                        <Sparkles size={16} />
                        <span>{t.workspace.actions.promptize}</span>
                    </button>
                </div>
            </div>

            <div className={styles.previewArea}>
                <div className={styles.previewContent}>
                    <div className={styles.canvas} style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                        padding: '40px',
                        width: '100%',
                        minHeight: '100%',
                        borderRadius: '8px'
                    }}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </main>
    );
}
