import React from 'react';
import { Part } from '@/types/layout';
import { PARTS_CATALOG } from '@/lib/parts/PartsCatalog';
import { useDesignStore } from '@/store/designStore';

interface PartRendererProps {
    part: Part;
}

export const PartRenderer: React.FC<PartRendererProps> = React.memo(({ part }) => {
    const theme = useDesignStore((state) => state.theme);
    const definition = PARTS_CATALOG[part.type];

    if (!definition) {
        return <div>Unknown part type: {part.type}</div>;
    }

    const Component = definition.component as React.ComponentType<{ theme: typeof theme;[key: string]: unknown }>;
    const props = { ...definition.defaultProps, ...part.props, theme };

    return <Component {...props} />;
});

PartRenderer.displayName = 'PartRenderer';
