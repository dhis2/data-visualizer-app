import { AXIS_NAMES } from '../layout';
import { getAxesFromUi } from '../current';
import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/d2-ui-analytics';

const [COLUMNS, ROWS, FILTERS] = AXIS_NAMES;

const dxId = DIMENSION_ID_DATA;
const peId = DIMENSION_ID_PERIOD;
const ouId = DIMENSION_ID_ORGUNIT;

const dxItem1id = 'dxItem1id';
const dxItem2id = 'dxItem2id';
const dxItems = [dxItem1id, dxItem2id];

const otherId = 'other';
const otherItemId = 'otherItem1id';
const otherItems = [otherItemId];

const peItemId = 'peItem1id';
const peItems = [peItemId];

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
