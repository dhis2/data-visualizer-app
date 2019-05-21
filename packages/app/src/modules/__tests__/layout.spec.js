import { AXIS_NAMES, getItemIdsByDimension } from '../layout';
import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/d2-ui-analytics';

const [COLUMNS, ROWS, FILTERS] = AXIS_NAMES;

const dxId = DIMENSION_ID_DATA;
const peId = DIMENSION_ID_PERIOD;
const ouId = DIMENSION_ID_ORGUNIT;

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

const peItem1Id = 'peItem1';
const pe = {
    dimension: peId,
    items: [{ id: peItem1Id }],
};

const ouItem1Id = 'ouItem1';
const ou = {
    dimension: ouId,
    items: [{ id: ouItem1Id }],
};

const visualization = {
    [COLUMNS]: [dx, other],
    [ROWS]: [pe],
    [FILTERS]: [ou],
};

describe('getItemIdsByDimension', () => {
    it('should return an object with item ids by dimension id from a visualization', () => {
        const expectedState = {
            [dxId]: [dxItem1Id, dxItem2Id],
            [otherId]: [otherItem1Id],
            [peId]: [peItem1Id],
            [ouId]: [ouItem1Id],
        };
        const actualState = getItemIdsByDimension(visualization);

        expect(actualState).toEqual(expectedState);
    });
});
