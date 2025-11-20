"use client";

import React from 'react';
import { Settings, User, Languages } from 'lucide-react';
import styles from './Header.module.css';
import { useLanguageStore } from '@/store/languageStore';

export default function Header() {
    const { language, setLanguage, t } = useLanguageStore();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ja' : 'en');
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logo}>DL</div>
                <h1 className={styles.title}>DesignLab</h1>
                <span className={styles.version}>v0.1.0</span>
            </div>
            <div className={styles.right}>
                <button className={styles.langBtn} onClick={toggleLanguage} title="Switch Language">
                    <Languages size={16} />
                    <span className={styles.langText}>{language.toUpperCase()}</span>
                </button>
                <button className={styles.iconBtn} aria-label={t.header.settings} title={t.header.settings}>
                    <Settings size={20} />
                </button>
                <button className={styles.iconBtn} aria-label={t.header.profile} title={t.header.profile}>
                    <User size={20} />
                </button>
            </div>
        </header>
    );
}
