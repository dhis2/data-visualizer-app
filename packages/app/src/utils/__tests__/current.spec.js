import { AXIS_NAMES } from '../utils/layout';
import { getAxesFromUi } from '../current';

const [COLUMNS, ROWS, FILTERS] = AXIS_NAMES;

const dxId = 'dx';
const dxItem1id = 'dxItem1id';
const dxItem2id = 'dxItem2id';
const dxItems = [dxItem1id, dxItem2id];

const otherId = 'other';
const otherItemId = 'otherItem1id';
const otherItems = [otherItemId];

const peId = 'pe';
const peItemId = 'peItem1id';
const peItems = [peItemId];

const ouId = 'ou';
const ouItemId = 'ouItem1id';
const ouItems = [ouItemId];

const emptyId = 'empty';

const ui = {
    layout: {
        [COLUMNS]: [dxId, otherId],
        [ROWS]: [peId, emptyId],
        [FILTERS]: [ouId],
    },
    itemsByDimension: {
        [dxId]: dxItems,
        [otherId]: otherItems,
        [peId]: peItems,
        [ouId]: ouItems,
    },
};

describe('getAxesFromUi', () => {
    it('should return a layout object (columns, rows, filters) with dimensions (id and item objects) that are not empty', () => {
        const expectedState = {
            columns: [
                {
                    dimension: dxId,
                    items: [{ id: dxItem1id }, { id: dxItem2id }],
                },
                { dimension: otherId, items: [{ id: otherItemId }] },
            ],
            rows: [{ dimension: peId, items: [{ id: peItemId }] }],
            filters: [{ dimension: ouId, items: [{ id: ouItemId }] }],
        };
        const actualState = getAxesFromUi(ui);

        expect(actualState).toEqual(expectedState);
    });
});
