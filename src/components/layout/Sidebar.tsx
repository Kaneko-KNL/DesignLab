"use client";

import React from 'react';
import { Plus, Grid, BookOpen, HardDrive } from 'lucide-react';
import styles from './Sidebar.module.css';
import clsx from 'clsx';
import { useLanguageStore } from '@/store/languageStore';
import { useUiStore } from '@/store/uiStore';

export default function Sidebar() {
    const { t } = useLanguageStore();
    const { activeView, setActiveView } = useUiStore();

    const handleDriveClick = () => {
        alert("Google Drive integration coming soon!");
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.nav}>
                <NavItem
                    icon={<Plus size={24} />}
                    label={t.nav.new}
                    active={activeView === 'workspace'}
                    onClick={() => setActiveView('workspace')}
                />
                <NavItem
                    icon={<Grid size={24} />}
                    label={t.nav.explorer}
                    active={activeView === 'explorer'}
                    onClick={() => setActiveView('explorer')}
                />
                <NavItem
                    icon={<BookOpen size={24} />}
                    label={t.nav.learn}
                    active={activeView === 'learn'}
                    onClick={() => setActiveView('learn')}
                />
                <div className={styles.divider} />
                <NavItem
                    icon={<HardDrive size={24} />}
                    label={t.nav.drive}
                    onClick={handleDriveClick}
                />
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
    return (
        <button
            className={clsx(styles.navItem, active && styles.active)}
            aria-label={label}
            title={label}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}
