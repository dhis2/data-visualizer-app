import { AXIS_NAMES } from '../layout';
import { getAxesFromUi } from '../current';

const [COLUMNS, ROWS, FILTERS] = AXIS_NAMES;

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

const emptyId = 'empty';

const ui = {
    layout: {
        [COLUMNS]: [dxId, otherId],
        [ROWS]: [peId, emptyId],
        [FILTERS]: [ouId],
    },
    itemsByDimension: {
        [dxId]: dx.items.map(i => i.id),
        [otherId]: other.items.map(i => i.id),
        [peId]: pe.items.map(i => i.id),
        [ouId]: ou.items.map(i => i.id),
    },
};

describe('getAxesFromUi', () => {
    it('should return a layout object (columns, rows, filters) with dimensions (id and item objects) that are not empty', () => {
        const expectedState = {
            columns: [dx, other],
            rows: [pe],
            filters: [ou],
        };
        const actualState = getAxesFromUi(ui);

        expect(actualState).toEqual(expectedState);
    });
});
