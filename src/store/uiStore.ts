import { create } from 'zustand';

export type ViewType = 'workspace' | 'explorer' | 'learn';

interface UiState {
    activeView: ViewType;
    setActiveView: (view: ViewType) => void;
}

export const useUiStore = create<UiState>((set) => ({
    activeView: 'workspace',
    setActiveView: (view) => set({ activeView: view }),
}));
