import {
    appendCompleteParentGraphMap,
    appendDimensionItemNamesToAnalyticalObject,
    appendPathsToOrgUnits,
    getPathForOrgUnit,
    prepareCurrentAnalyticalObject,
    removeUnnecessaryAttributesFromAnalyticalObject,
} from '../currentAnalyticalObject'

describe('currentAnalyticalObject', () => {
    let mockCurrent
    let mockMetadata
    let mockUi

    beforeEach(() => {
        mockCurrent = {
            id: 'SOME_ID',
            name: 'Analytical object typical name',
            displayName: 'Analytical object typical name',
            key: 'value',
            columns: [
                {
                    dimension: 'dx',
                    items: [
                        {
                            id: 'Uvn6LCg7dVU',
                        },
                    ],
                },
            ],
            filters: [
                {
                    dimension: 'ou',
                    items: [
                        {
                            id: 'qhqAxPSTUXp',
                        },
                        {
                            id: 'Vth0fbpFcsO',
                        },
                    ],
                },
            ],
            rows: [
                {
                    dimension: 'pe',
                    items: [
                        {
                            id: '2017',
                        },
                    ],
                },
            ],
        }
        mockMetadata = {
            Uvn6LCg7dVU: { name: 'ANC 1 Coverage' },
            qhqAxPSTUXp: { name: 'Koinadugu' },
            Vth0fbpFcsO: { name: 'Kono' },
            2017: { name: '2017' },
        }
        mockUi = {
            parentGraphMap: {
                qhqAxPSTUXp: 'ImspTQPwCqd',
                Vth0fbpFcsO: 'ImspTQPwCqd',
            },
        }
    })

    describe('getPathForOrgUnit', () => {
        it('generates path for orgunit using ui.parentGraphMap', () => {
            const orgUnit = { id: 'SOME_ID' }
            const parentGraphMap = { SOME_ID: 'ORG_UNIT/SUB_ORG_UNIT' }
            const expectedPath = '/ORG_UNIT/SUB_ORG_UNIT/SOME_ID'

            expect(getPathForOrgUnit(orgUnit, parentGraphMap)).toEqual(
                expectedPath
            )
        })

        it('handles root org unit case', () => {
            const orgUnit = { id: 'ROOT_SIERRA_LEONE_ORG_UNIT' }
            const parentGraphMap = {
                ROOT_SIERRA_LEONE_ORG_UNIT: '',
            }
            const expectedPath = '/ROOT_SIERRA_LEONE_ORG_UNIT'

            expect(getPathForOrgUnit(orgUnit, parentGraphMap)).toEqual(
                expectedPath
            )
        })

        it('returns undefined if parentGraphMap does not contain specified parent path', () => {
            const orgUnit = 'USER_ORG_UNIT_CHILDREN'
            const parentGraphMap = {}

            expect(getPathForOrgUnit(orgUnit, parentGraphMap)).toBeUndefined()
        })
    })

    describe('appendPathsToOrgUnits', () => {
        it('appends org unit paths to current analytical object', () => {
            const expected = {
                ...mockCurrent,
                filters: [
                    {
                        dimension: 'ou',
                        items: [
                            {
                                id: 'qhqAxPSTUXp',
                                path: '/ImspTQPwCqd/qhqAxPSTUXp',
                            },
                            {
                                id: 'Vth0fbpFcsO',
                                path: '/ImspTQPwCqd/Vth0fbpFcsO',
                            },
                        ],
                    },
                ],
            }

            expect(appendPathsToOrgUnits(mockCurrent, mockUi)).toEqual(expected)
        })

        it('handles visualization without "ou" dimension', () => {
            const mockCurrentWithoutOuDimension = {
                ...mockCurrent,
                rows: [],
                columns: [
                    {
                        dimension: 'J5jldMd8OHv',
                        items: [{ id: 'uYxK4wmcPqA' }, { id: 'RXL3lPSK8oG' }],
                    },
                ],
                filters: [
                    {
                        dimension: 'pe',
                        items: [{ id: 'LAST_YEAR' }],
                    },
                    {
                        dimension: 'dx',
                        items: [{ id: 'hfdmMSPBgLG' }],
                    },
                ],
            }

            expect(
                appendPathsToOrgUnits(mockCurrentWithoutOuDimension, mockUi)
            ).toEqual(mockCurrentWithoutOuDimension)
        })
    })

    describe('appendDimensionItemNamesToAnalyticalObject', () => {
        const testDimensionItemNamesAreUndefined = dimension => {
            dimension.items.forEach(item => {
                expect(item.name).toBeUndefined()
            })
        }

        const testDimensionItemNamesAreNotUndefined = dimension => {
            dimension.items.forEach(item => {
                expect(item.name).not.toBeUndefined()
                expect(item.name).toEqual(mockMetadata[item.id].name)
            })
        }

        it('appends dimension item names to analytical object', () => {
            mockCurrent.columns.forEach(testDimensionItemNamesAreUndefined)
            mockCurrent.filters.forEach(testDimensionItemNamesAreUndefined)
            mockCurrent.rows.forEach(testDimensionItemNamesAreUndefined)

            const processed = appendDimensionItemNamesToAnalyticalObject(
                mockCurrent,
                mockMetadata
            )

            processed.columns.forEach(testDimensionItemNamesAreNotUndefined)
            processed.filters.forEach(testDimensionItemNamesAreNotUndefined)
            processed.rows.forEach(testDimensionItemNamesAreNotUndefined)
        })

        it('passes dimension items without names as they are without skipping them', () => {
            mockCurrent.columns.forEach(testDimensionItemNamesAreUndefined)
            mockCurrent.filters.forEach(testDimensionItemNamesAreUndefined)
            mockCurrent.rows.forEach(testDimensionItemNamesAreUndefined)

            mockMetadata = {}

            const processed = appendDimensionItemNamesToAnalyticalObject(
                mockCurrent,
                mockMetadata
            )

            expect(processed).toEqual(mockCurrent)
        })
    })

    describe('removeUnnecessaryAttributesFromAnalyticalObject', () => {
        it('removes unnecessary attributes', () => {
            const unprocessed = {
                id: 'SOME_ID',
                name: 'Analytical object typical name',
                displayName: 'Analytical object typical name',
                key: 'value',
            }
            const processed =
                removeUnnecessaryAttributesFromAnalyticalObject(unprocessed)
            const keysToRemove = ['id', 'name', 'displayName']

            keysToRemove.forEach(key => {
                expect(unprocessed[key]).not.toBeUndefined()
            })

            keysToRemove.forEach(key => {
                expect(processed[key]).toBeUndefined()
            })
        })
    })

    describe('appendCompleteParentGraphMap', () => {
        it('appends complete parent graph map property', () => {
            const parentGraphMap = {
                SOME_ORG_UNIT_ID: 'SOME_ORG_UNIT_PARENT',
            }
            const expected = {
                ...mockCurrent,
                parentGraphMap: {
                    ...mockCurrent.parentGraphMap,
                    SOME_ORG_UNIT_ID: 'SOME_ORG_UNIT_PARENT',
                },
            }

            expect(
                appendCompleteParentGraphMap(mockCurrent, { parentGraphMap })
            ).toEqual(expected)
        })
    })

    describe('prepareCurrentAnalyticalObject', () => {
        it('prepares current analytical object for user data store', () => {
            const expected = {
                key: 'value',
                columns: [
                    {
                        dimension: 'dx',
                        items: [
                            {
                                id: 'Uvn6LCg7dVU',
                                name: 'ANC 1 Coverage',
                            },
                        ],
                    },
                ],
                parentGraphMap: {
                    qhqAxPSTUXp: 'ImspTQPwCqd',
                    Vth0fbpFcsO: 'ImspTQPwCqd',
                },
                filters: [
                    {
                        dimension: 'ou',
                        items: [
                            {
                                id: 'qhqAxPSTUXp',
                                name: 'Koinadugu',
                                path: '/ImspTQPwCqd/qhqAxPSTUXp',
                            },
                            {
                                id: 'Vth0fbpFcsO',
                                name: 'Kono',
                                path: '/ImspTQPwCqd/Vth0fbpFcsO',
                            },
                        ],
                    },
                ],
                rows: [
                    {
                        dimension: 'pe',
                        items: [
                            {
                                id: '2017',
                                name: '2017',
                            },
                        ],
                    },
                ],
            }

            const result = prepareCurrentAnalyticalObject(
                mockCurrent,
                mockMetadata,
                mockUi
            )

            expect(expected).toEqual(result)
        })
    })
})
