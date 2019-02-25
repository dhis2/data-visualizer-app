import {
    appendDimensionItemNamesToAnalyticalObject,
    appendPathsToOrgUnits,
    prepareCurrentAnalyticalObject,
    removeUnnecessaryAttributesFromAnalyticalObject,
} from '../currentAnalyticalObject';

describe('currentAnalyticalObject', () => {
    let mockCurrent;
    let mockMetadata;
    let mockUi;

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
        };
        mockMetadata = {
            Uvn6LCg7dVU: { name: 'ANC 1 Coverage' },
            qhqAxPSTUXp: { name: 'Koinadugu' },
            Vth0fbpFcsO: { name: 'Kono' },
            2017: { name: '2017' },
        };
        mockUi = {
            parentGraphMap: {
                qhqAxPSTUXp: 'ImspTQPwCqd',
                Vth0fbpFcsO: 'ImspTQPwCqd',
            },
        };
    });

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
                                path: 'ImspTQPwCqd',
                            },
                            {
                                id: 'Vth0fbpFcsO',
                                path: 'ImspTQPwCqd',
                            },
                        ],
                    },
                ],
            };

            expect(appendPathsToOrgUnits(mockCurrent, mockUi)).toEqual(
                expected
            );
        });

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
            };

            expect(
                appendPathsToOrgUnits(mockCurrentWithoutOuDimension, mockUi)
            ).toEqual(mockCurrentWithoutOuDimension);
        });
    });

    describe('appendDimensionItemNamesToAnalyticalObject', () => {
        it('appends dimension item names to analytical object', () => {
            const testDimensionItemNamesAreUndefined = dimension => {
                dimension.items.forEach(item => {
                    expect(item.name).toBeUndefined();
                });
            };

            const testDimensionItemNamesAreNotUndefined = dimension => {
                dimension.items.forEach(item => {
                    expect(item.name).not.toBeUndefined();
                    expect(item.name).toEqual(mockMetadata[item.id].name);
                });
            };

            mockCurrent.columns.forEach(testDimensionItemNamesAreUndefined);
            mockCurrent.filters.forEach(testDimensionItemNamesAreUndefined);
            mockCurrent.rows.forEach(testDimensionItemNamesAreUndefined);

            const processed = appendDimensionItemNamesToAnalyticalObject(
                mockCurrent,
                mockMetadata
            );

            processed.columns.forEach(testDimensionItemNamesAreNotUndefined);
            processed.filters.forEach(testDimensionItemNamesAreNotUndefined);
            processed.rows.forEach(testDimensionItemNamesAreNotUndefined);
        });
    });

    describe('removeUnnecessaryAttributesFromAnalyticalObject', () => {
        it('removes unnecessary attributes', () => {
            const unprocessed = {
                id: 'SOME_ID',
                name: 'Analytical object typical name',
                displayName: 'Analytical object typical name',
                key: 'value',
            };
            const processed = removeUnnecessaryAttributesFromAnalyticalObject(
                unprocessed
            );
            const keysToRemove = ['id', 'name', 'displayName'];

            keysToRemove.forEach(key => {
                expect(unprocessed[key]).not.toBeUndefined();
            });

            keysToRemove.forEach(key => {
                expect(processed[key]).toBeUndefined();
            });
        });
    });

    describe('prepareCurrentAnalyticalObject', () => {
        it('appends org unit paths, dimension item names and removes attributes and ', () => {
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
                filters: [
                    {
                        dimension: 'ou',
                        items: [
                            {
                                id: 'qhqAxPSTUXp',
                                name: 'Koinadugu',
                                path: 'ImspTQPwCqd',
                            },
                            {
                                id: 'Vth0fbpFcsO',
                                name: 'Kono',
                                path: 'ImspTQPwCqd',
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
            };

            const result = prepareCurrentAnalyticalObject(
                mockCurrent,
                mockMetadata,
                mockUi
            );

            expect(expected).toEqual(result);
        });
    });
});
