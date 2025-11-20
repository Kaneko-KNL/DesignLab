import { create } from 'zustand';

export type Language = 'en' | 'ja';

interface Translations {
    nav: {
        new: string;
        explorer: string;
        learn: string;
        drive: string;
    };
    header: {
        settings: string;
        profile: string;
    };
    workspace: {
        tabs: {
            all: string;
            lp: string;
            blog: string;
            corporate: string;
            mobile: string;
            dashboard: string;
            app: string;
        };
        actions: {
            save: string;
            promptize: string;
        };
        preview: {
            core: string;
            containers: string;
            placeholder: string;
            selectType: string;
        };
    };
    panel: {
        designType: string;
        colorPalette: string;
        randomize: string;
        colors: {
            background: string;
            text: string;
            primary: string;
            accent: string;
            surface: string;
        };
    };
}

const translations: Record<Language, Translations> = {
    en: {
        nav: {
            new: 'New',
            explorer: 'Explorer',
            learn: 'Learn',
            drive: 'Drive',
        },
        header: {
            settings: 'Settings',
            profile: 'Profile',
        },
        workspace: {
            tabs: {
                all: 'ALL',
                lp: 'LP',
                blog: 'Blog',
                corporate: 'Corporate',
                mobile: 'Mobile',
                dashboard: 'Dashboard',
                app: 'App',
            },
            actions: {
                save: 'Save',
                promptize: 'Prompt-ize',
            },
            preview: {
                core: 'Core Elements',
                containers: 'Containers',
                placeholder: 'Preview for',
                selectType: 'Select a design type to see changes',
            },
        },
        panel: {
            designType: 'Design Type',
            colorPalette: 'Color Palette',
            randomize: 'Randomize',
            colors: {
                background: 'Background',
                text: 'Text',
                primary: 'Primary',
                accent: 'Accent',
                surface: 'Surface',
            },
        },
    },
    ja: {
        nav: {
            new: '新規作成',
            explorer: 'エクスプローラー',
            learn: '学習',
            drive: 'ドライブ',
        },
        header: {
            settings: '設定',
            profile: 'プロフィール',
        },
        workspace: {
            tabs: {
                all: 'すべて',
                lp: 'LP',
                blog: 'ブログ',
                corporate: 'コーポレート',
                mobile: 'モバイル',
                dashboard: 'ダッシュボード',
                app: 'アプリ',
            },
            actions: {
                save: '保存',
                promptize: 'プロンプト化',
            },
            preview: {
                core: '基本要素',
                containers: 'コンテナ',
                placeholder: 'プレビュー: ',
                selectType: 'デザインタイプを選択して変更を確認',
            },
        },
        panel: {
            designType: 'デザインタイプ',
            colorPalette: 'カラーパレット',
            randomize: 'ランダム生成',
            colors: {
                background: '背景色',
                text: '文字色',
                primary: '強調色',
                accent: 'アクセント',
                surface: 'サーフェス',
            },
        },
    },
};

interface LanguageState {
    language: Language;
    t: Translations;
    setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: 'ja', // Default to Japanese as requested
    t: translations.ja,
    setLanguage: (lang) => set({ language: lang, t: translations[lang] }),
}));
