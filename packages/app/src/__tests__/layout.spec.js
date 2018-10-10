import {
    AXIS_NAMES,
    getAllDimensions,
    getItemIdsByDimension,
    getDimensionIdsByAxis,
} from '../layout.js';

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

const visualization = {
    [COLUMNS]: [dx, other],
    [ROWS]: [pe],
    [FILTERS]: [ou],
};

describe('getAllDimensions', () => {
    it('should return an array of all dimensions in the visualization', () => {
        const expectedState = [dx, other, pe, ou];
        const actualState = getAllDimensions(visualization);

        expect(actualState).toEqual(expectedState);
    });
});

describe('getItemIdsByDimension', () => {
    it('should return an object with item ids by dimension id from a visualization', () => {
        const expectedState = {
            [dxId]: [dxItem1, dxItem2],
            [otherId]: [otherItem1],
            [peId]: [peItem1],
            [ouId]: [ouItem1],
        };
        const actualState = getItemIdsByDimension(visualization);

        expect(actualState).toEqual(expectedState);
    });
});

describe('getDimensionIdsByAxis', () => {
    it('should return an object with dimension ids by axis name', () => {
        const expectedState = {
            [COLUMNS]: [dxId, otherId],
            [ROWS]: [peId],
            [FILTERS]: [ouId],
        };
        const actualState = getDimensionIdsByAxis(visualization);

        expect(actualState).toEqual(expectedState);
    });
});
