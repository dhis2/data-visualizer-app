import { AXIS_NAMES } from '../layout';
import { getAxesFromUi } from '../current';

const [COLUMNS, ROWS, FILTERS] = AXIS_NAMES;

const dxId = 'dx';
const dxItem1 = { id: 'dxItem1id' };
const dxItem2 = { id: 'dxItem2id' };
const dx = {
    dimension: dxId,
    items: [dxItem1, dxItem2],
};

const otherId = 'other';
const otherItem1 = { id: 'otherItem1id' };
const other = {
    dimension: otherId,
    items: [otherItem1],
};

const peId = 'pe';
const peItem1 = { id: 'peItem1id' };
const pe = {
    dimension: peId,
    items: [peItem1],
};

const ouId = 'ou';
const ouItem1 = { id: 'ouItem1id' };
const ou = {
    dimension: ouId,
    items: [ouItem1],
};

const emptyId = 'empty';

const ui = {
    layout: {
        [COLUMNS]: [dxId, otherId],
        [ROWS]: [peId, emptyId],
        [FILTERS]: [ouId],
    },
    itemsByDimension: {
        [dxId]: dx.items,
        [otherId]: other.items,
        [peId]: pe.items,
        [ouId]: ou.items,
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
