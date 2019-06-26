import {
    AXIS_NAME_COLUMNS,
    AXIS_NAME_ROWS,
    AXIS_NAME_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/analytics';

import { pieLayoutAdapter, yearOverYearLayoutAdapter } from '../layoutAdapters';

const someId = 'someId';
const otherId = 'otherId';

describe('pieLayoutAdapter', () => {
    it('should move all column and row dimensions to filter except the first column dimension', () => {
        const initialState = {
            [AXIS_NAME_COLUMNS]: [DIMENSION_ID_DATA, someId],
            [AXIS_NAME_ROWS]: [DIMENSION_ID_PERIOD, otherId],
            [AXIS_NAME_FILTERS]: [DIMENSION_ID_ORGUNIT],
        };

        const actualState = pieLayoutAdapter(initialState);

        const expectedState = {
            [AXIS_NAME_COLUMNS]: [DIMENSION_ID_DATA],
            [AXIS_NAME_ROWS]: [],
            [AXIS_NAME_FILTERS]: [
                DIMENSION_ID_ORGUNIT,
                someId,
                DIMENSION_ID_PERIOD,
                otherId,
            ],
        };

        expect(actualState).toEqual(expectedState);
    });

    it('should move the first row dimension to series and the rest to filter', () => {
        const initialState = {
            [AXIS_NAME_COLUMNS]: [],
            [AXIS_NAME_ROWS]: [DIMENSION_ID_DATA, DIMENSION_ID_PERIOD, someId],
            [AXIS_NAME_FILTERS]: [DIMENSION_ID_ORGUNIT],
        };

        const actualState = pieLayoutAdapter(initialState);

        const expectedState = {
            [AXIS_NAME_COLUMNS]: [DIMENSION_ID_DATA],
            [AXIS_NAME_ROWS]: [],
            [AXIS_NAME_FILTERS]: [
                DIMENSION_ID_ORGUNIT,
                DIMENSION_ID_PERIOD,
                someId,
            ],
        };

        expect(actualState).toEqual(expectedState);
    });
});

describe('yearOverYearLayoutAdapter', () => {
    it('should remove the "pe" dimension and move all other dimensions to filter', () => {
        const initialState = {
            [AXIS_NAME_COLUMNS]: [DIMENSION_ID_DATA, someId],
            [AXIS_NAME_ROWS]: [DIMENSION_ID_PERIOD, otherId],
            [AXIS_NAME_FILTERS]: [DIMENSION_ID_ORGUNIT],
        };

        const actualState = yearOverYearLayoutAdapter(initialState);

        const expectedState = {
            [AXIS_NAME_COLUMNS]: [],
            [AXIS_NAME_ROWS]: [],
            [AXIS_NAME_FILTERS]: [
                DIMENSION_ID_ORGUNIT,
                DIMENSION_ID_DATA,
                someId,
                otherId,
            ],
        };

        expect(actualState).toEqual(expectedState);
    });
});
