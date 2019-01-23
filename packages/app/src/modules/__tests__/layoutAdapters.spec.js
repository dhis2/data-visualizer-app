import { FIXED_DIMENSIONS } from '../fixedDimensions';
import { pieLayoutAdapter, yearOverYearLayoutAdapter } from '../layoutAdapters';
import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
} from '../layout';

const dxId = FIXED_DIMENSIONS.dx.id;
const peId = FIXED_DIMENSIONS.pe.id;
const ouId = FIXED_DIMENSIONS.ou.id;
const someId = 'someId';
const otherId = 'otherId';

describe('pieLayoutAdapter', () => {
    it('should move all column and row dimensions to filter except the first column dimension', () => {
        const initialState = {
            [AXIS_NAME_COLUMNS]: [dxId, someId],
            [AXIS_NAME_ROWS]: [peId, otherId],
            [AXIS_NAME_FILTERS]: [ouId],
        };

        const actualState = pieLayoutAdapter(initialState);

        const expectedState = {
            [AXIS_NAME_COLUMNS]: [dxId],
            [AXIS_NAME_ROWS]: [],
            [AXIS_NAME_FILTERS]: [ouId, someId, peId, otherId],
        };

        expect(actualState).toEqual(expectedState);
    });

    it('should move the first row dimension to series and the rest to filter', () => {
        const initialState = {
            [AXIS_NAME_COLUMNS]: [],
            [AXIS_NAME_ROWS]: [dxId, peId, someId],
            [AXIS_NAME_FILTERS]: [ouId],
        };

        const actualState = pieLayoutAdapter(initialState);

        const expectedState = {
            [AXIS_NAME_COLUMNS]: [dxId],
            [AXIS_NAME_ROWS]: [],
            [AXIS_NAME_FILTERS]: [ouId, peId, someId],
        };

        expect(actualState).toEqual(expectedState);
    });
});

describe('yearOverYearLayoutAdapter', () => {
    it('should remove the "pe" dimension and move all other dimensions to filter', () => {
        const initialState = {
            [AXIS_NAME_COLUMNS]: [dxId, someId],
            [AXIS_NAME_ROWS]: [peId, otherId],
            [AXIS_NAME_FILTERS]: [ouId],
        };

        const actualState = yearOverYearLayoutAdapter(initialState);

        const expectedState = {
            [AXIS_NAME_COLUMNS]: [],
            [AXIS_NAME_ROWS]: [],
            [AXIS_NAME_FILTERS]: [ouId, dxId, someId, otherId],
        };

        expect(actualState).toEqual(expectedState);
    });
});
