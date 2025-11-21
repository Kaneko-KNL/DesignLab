import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Layout, SiteType, Part, LayoutAreaId } from '@/types/layout';
import { LayoutGenerator } from '@/lib/layout/LayoutGenerator';

interface LayoutState {
    currentLayout: Layout | null;
    activeSiteType: SiteType;
    parts: Record<string, Part>;
    selectedPartId: string | null;
    history: {
        past: { layout: Layout; parts: Record<string, Part> }[];
        future: { layout: Layout; parts: Record<string, Part> }[];
    };

    // Actions
    setSiteType: (type: SiteType) => void;
    generateLayout: () => void;
    addPart: (part: Part) => void;
    removePart: (partId: string) => void;
    updatePart: (partId: string, updates: Partial<Part>) => void;
    selectPart: (partId: string | null) => void;
    movePart: (partId: string, targetAreaId: string, newIndex: number) => void;
    undo: () => void;
    redo: () => void;
}

export const useLayoutStore = create<LayoutState>()(
    immer((set, get) => ({
        currentLayout: null,
        activeSiteType: 'landing-page',
        parts: {},
        selectedPartId: null,
        history: {
            past: [],
            future: [],
        },

        setSiteType: (type: SiteType) => {
            set((state) => {
                state.activeSiteType = type;
                state.selectedPartId = null;
                state.history = { past: [], future: [] };
            });
            get().generateLayout();
        },

        generateLayout: () => {
            const { activeSiteType } = get();
            const generator = LayoutGenerator.getInstance();
            const layout = generator.generate(activeSiteType);

            set((state) => {
                state.currentLayout = layout;
                state.selectedPartId = null;
                state.history = { past: [], future: [] };
            });
        },

        addPart: (part: Part) => {
            set((state) => {
                if (state.currentLayout) {
                    state.history.past.push({
                        layout: JSON.parse(JSON.stringify(state.currentLayout)),
                        parts: JSON.parse(JSON.stringify(state.parts))
                    });
                    state.history.future = [];
                }

                state.parts[part.id] = part;
                const area = state.currentLayout?.areas.find(a => a.id === part.areaId);
                if (area) {
                    area.components.push(part.id);
                }
            });
        },

        removePart: (partId: string) => {
            set((state) => {
                if (state.currentLayout) {
                    state.history.past.push({
                        layout: JSON.parse(JSON.stringify(state.currentLayout)),
                        parts: JSON.parse(JSON.stringify(state.parts))
                    });
                    state.history.future = [];
                }

                delete state.parts[partId];
                if (state.selectedPartId === partId) {
                    state.selectedPartId = null;
                }
                state.currentLayout?.areas.forEach(area => {
                    area.components = area.components.filter(id => id !== partId);
                });
            });
        },

        updatePart: (partId: string, updates: Partial<Part>) => {
            set((state) => {
                if (state.currentLayout) {
                    state.history.past.push({
                        layout: JSON.parse(JSON.stringify(state.currentLayout)),
                        parts: JSON.parse(JSON.stringify(state.parts))
                    });
                    state.history.future = [];
                }

                if (state.parts[partId]) {
                    state.parts[partId] = { ...state.parts[partId], ...updates };
                }
            });
        },

        selectPart: (partId: string | null) => {
            set((state) => {
                state.selectedPartId = partId;
            });
        },

        movePart: (partId: string, targetAreaId: string, newIndex: number) => {
            set((state) => {
                if (!state.currentLayout) return;

                state.history.past.push({
                    layout: JSON.parse(JSON.stringify(state.currentLayout)),
                    parts: JSON.parse(JSON.stringify(state.parts))
                });
                state.history.future = [];

                state.currentLayout.areas.forEach(area => {
                    area.components = area.components.filter(id => id !== partId);
                });

                const targetArea = state.currentLayout.areas.find(a => a.id === targetAreaId);
                if (targetArea) {
                    targetArea.components.splice(newIndex, 0, partId);
                }

                if (state.parts[partId]) {
                    state.parts[partId].areaId = targetAreaId as LayoutAreaId;
                }
            });
        },

        undo: () => {
            set((state) => {
                if (state.history.past.length === 0) return;

                const previous = state.history.past.pop();
                if (previous && state.currentLayout) {
                    state.history.future.push({
                        layout: JSON.parse(JSON.stringify(state.currentLayout)),
                        parts: JSON.parse(JSON.stringify(state.parts))
                    });
                    state.currentLayout = previous.layout;
                    state.parts = previous.parts;
                }
            });
        },

        redo: () => {
            set((state) => {
                if (state.history.future.length === 0) return;

                const next = state.history.future.pop();
                if (next && state.currentLayout) {
                    state.history.past.push({
                        layout: JSON.parse(JSON.stringify(state.currentLayout)),
                        parts: JSON.parse(JSON.stringify(state.parts))
                    });
                    state.currentLayout = next.layout;
                    state.parts = next.parts;
                }
            });
        }
    }))
);

// Selector utilities for optimized subscriptions
export const selectCurrentLayout = (state: LayoutState) => state.currentLayout;
export const selectParts = (state: LayoutState) => state.parts;
export const selectSelectedPartId = (state: LayoutState) => state.selectedPartId;
export const selectHistory = (state: LayoutState) => state.history;
export const selectActiveSiteType = (state: LayoutState) => state.activeSiteType;

