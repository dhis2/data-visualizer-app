import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/analytics';

import { getAxesFromUi } from '../current';

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
        [AXIS_NAME_COLUMNS]: [DIMENSION_ID_DATA, otherId],
        [AXIS_NAME_ROWS]: [DIMENSION_ID_PERIOD, emptyId],
        [AXIS_NAME_FILTERS]: [DIMENSION_ID_ORGUNIT],
    },
    itemsByDimension: {
        [DIMENSION_ID_DATA]: dxItems,
        [otherId]: otherItems,
        [DIMENSION_ID_PERIOD]: peItems,
        [DIMENSION_ID_ORGUNIT]: ouItems,
    },
};

describe('getAxesFromUi', () => {
    it('should return a layout object (columns, rows, filters) with dimensions (id and item objects) that are not empty', () => {
        const expectedState = {
            columns: [
                {
                    dimension: DIMENSION_ID_DATA,
                    items: [{ id: dxItem1id }, { id: dxItem2id }],
                },
                { dimension: otherId, items: [{ id: otherItemId }] },
            ],
            rows: [
                { dimension: DIMENSION_ID_PERIOD, items: [{ id: peItemId }] },
            ],
            filters: [
                { dimension: DIMENSION_ID_ORGUNIT, items: [{ id: ouItemId }] },
            ],
        };
        const actualState = getAxesFromUi(ui);

        expect(actualState).toEqual(expectedState);
    });
});
