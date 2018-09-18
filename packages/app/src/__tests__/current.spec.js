import { AXIS_KEYS } from '../layout';
import { getAxesFromUi } from '../current';

const [COLUMNS, ROWS, FILTERS] = AXIS_KEYS;

const dxId = 'dx';
const dxItem1Id = 'dxItem1';
const dxItem2Id = 'dxItem2';
const dx = {
    dimension: dxId,
    items: [{ id: dxItem1Id }, { id: dxItem2Id }],
};

const otherId = 'other';
const otherItem1Id = 'otherItem1';
const other = {
    dimension: otherId,
    items: [{ id: otherItem1Id }],
};

const peId = 'pe';
const peItem1Id = 'peItem1';
const pe = {
    dimension: peId,
    items: [{ id: peItem1Id }],
};

const ouId = 'ou';
const ouItem1Id = 'ouItem1';
const ou = {
    dimension: ouId,
    items: [{ id: ouItem1Id }],
};

const ui = {
    layout: {
        [COLUMNS]: [dx.dimension, other.dimension],
        [ROWS]: [pe.dimension],
        [FILTERS]: [ou.dimension],
    },
    itemsByDimension: {
        [dx.dimension]: dx.items.map(i => i.id),
        [other.dimension]: other.items.map(i => i.id),
        [ou.dimension]: ou.items.map(i => i.id),
        [pe.dimension]: pe.items.map(i => i.id),
    },
};

describe('getAxesFromUi', () => {
    it('should return an object with rows, columns, filters keys with dimension and list of item objects as value', () => {
        const expectedState = {
            rows: [pe],
            columns: [dx, other],
            filters: [ou],
        };
        const actualState = getAxesFromUi(ui);

        expect(actualState).toEqual(expectedState);
    });
});
