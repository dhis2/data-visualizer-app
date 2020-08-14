import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/analytics'

import {
    defaultLayoutAdapter,
    dualCategoryLayoutAdapter,
    pieLayoutAdapter,
    yearOverYearLayoutAdapter,
} from '../layoutAdapters'

const someId = 'someId'
const otherId = 'otherId'

describe('defaultLayoutAdapter', () => {
    it('should move all extra dimensions in columns and rows to filters', () => {
        const initialState = {
            [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA, someId],
            [AXIS_ID_ROWS]: [],
            [AXIS_ID_FILTERS]: [
                DIMENSION_ID_PERIOD,
                DIMENSION_ID_ORGUNIT,
                otherId,
            ],
        }

        const actualState = defaultLayoutAdapter(initialState)

        const expectedState = {
            [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA],
            [AXIS_ID_ROWS]: [],
            [AXIS_ID_FILTERS]: [
                DIMENSION_ID_PERIOD,
                DIMENSION_ID_ORGUNIT,
                otherId,
                someId,
            ],
        }

        expect(actualState).toEqual(expectedState)
    })
})

describe('dualCategoryLayoutAdapter', () => {
    it('should keep the 2nd category in rows and move the others to filters (if any),', () => {
        const initialState = {
            [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA],
            [AXIS_ID_ROWS]: [DIMENSION_ID_PERIOD, otherId, someId],
            [AXIS_ID_FILTERS]: [DIMENSION_ID_ORGUNIT],
        }

        const actualState = dualCategoryLayoutAdapter(initialState)

        const expectedState = {
            [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA],
            [AXIS_ID_ROWS]: [DIMENSION_ID_PERIOD, otherId],
            [AXIS_ID_FILTERS]: [DIMENSION_ID_ORGUNIT, someId],
        }

        expect(actualState).toEqual(expectedState)
    })
})

describe('pieLayoutAdapter', () => {
    it('should move all column and row dimensions to filter except the first column dimension', () => {
        const initialState = {
            [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA, someId],
            [AXIS_ID_ROWS]: [DIMENSION_ID_PERIOD, otherId],
            [AXIS_ID_FILTERS]: [DIMENSION_ID_ORGUNIT],
        }

        const actualState = pieLayoutAdapter(initialState)

        const expectedState = {
            [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA],
            [AXIS_ID_ROWS]: [],
            [AXIS_ID_FILTERS]: [
                DIMENSION_ID_ORGUNIT,
                someId,
                DIMENSION_ID_PERIOD,
                otherId,
            ],
        }

        expect(actualState).toEqual(expectedState)
    })

    it('should move the first row dimension to series and the rest to filter', () => {
        const initialState = {
            [AXIS_ID_COLUMNS]: [],
            [AXIS_ID_ROWS]: [DIMENSION_ID_DATA, DIMENSION_ID_PERIOD, someId],
            [AXIS_ID_FILTERS]: [DIMENSION_ID_ORGUNIT],
        }

        const actualState = pieLayoutAdapter(initialState)

        const expectedState = {
            [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA],
            [AXIS_ID_ROWS]: [],
            [AXIS_ID_FILTERS]: [
                DIMENSION_ID_ORGUNIT,
                DIMENSION_ID_PERIOD,
                someId,
            ],
        }

        expect(actualState).toEqual(expectedState)
    })
})

describe('yearOverYearLayoutAdapter', () => {
    it('should remove the "pe" dimension and move all other dimensions to filter', () => {
        const initialState = {
            [AXIS_ID_COLUMNS]: [DIMENSION_ID_DATA, someId],
            [AXIS_ID_ROWS]: [DIMENSION_ID_PERIOD, otherId],
            [AXIS_ID_FILTERS]: [DIMENSION_ID_ORGUNIT],
        }

        const actualState = yearOverYearLayoutAdapter(initialState)

        const expectedState = {
            [AXIS_ID_COLUMNS]: [],
            [AXIS_ID_ROWS]: [],
            [AXIS_ID_FILTERS]: [
                DIMENSION_ID_ORGUNIT,
                DIMENSION_ID_DATA,
                someId,
                otherId,
            ],
        }

        expect(actualState).toEqual(expectedState)
    })
})
