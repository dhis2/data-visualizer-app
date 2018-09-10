import {
    AXIS_KEYS,
    getAllDimensions,
    getItemIdsByDimensionMap,
    getItemIdsByDimension,
    getDimensionIdsByAxis,
} from '../layout.js';

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

describe('getItemIdsByDimensionMap', () => {
    it('should return an object with item ids by dimension id from an array of dimensions', () => {
        const expectedState = {
            [dxId]: [dxItem1Id, dxItem2Id],
            [otherId]: [otherItem1Id],
            [peId]: [peItem1Id],
            [ouId]: [ouItem1Id],
        };
        const allDimensions = getAllDimensions(visualization);
        const actualState = getItemIdsByDimensionMap(allDimensions);

        expect(actualState).toEqual(expectedState);
    });
});

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
