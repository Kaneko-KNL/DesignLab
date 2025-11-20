"use client";

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DesignPanel from './DesignPanel';
import Workspace from './Workspace';
import ExplorerView from '@/components/views/ExplorerView';
import LearnView from '@/components/views/LearnView';
import styles from './MainLayout.module.css';
import { useUiStore } from '@/store/uiStore';

export default function MainLayout() {
    const { activeView } = useUiStore();

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <Sidebar />
                <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    {activeView === 'workspace' && <Workspace />}
                    {activeView === 'explorer' && <ExplorerView />}
                    {activeView === 'learn' && <LearnView />}
                </div>
                <div className={styles.panel}>
                    <DesignPanel />
                </div>
            </div>
        </div>
    );
}
