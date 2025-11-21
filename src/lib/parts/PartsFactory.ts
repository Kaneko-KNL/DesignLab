import { Part, LayoutAreaId } from '@/types/layout';
import { getPartDefinition } from '@/lib/parts/PartsCatalog';

export class PartsFactory {
    public static createPart(type: string, areaId: LayoutAreaId): Part {
        const definition = getPartDefinition(type);

        if (!definition) {
            throw new Error(`Unknown part type: ${type}`);
        }

        return {
            id: crypto.randomUUID(),
            type,
            label: definition.label,
            areaId,
            props: { ...definition.defaultProps },
            styles: {},
        };
    }

    public static createPartWithProps(type: string, areaId: LayoutAreaId, props: Record<string, unknown>): Part {
        const part = this.createPart(type, areaId);
        part.props = { ...part.props, ...props };
        return part;
    }
}
