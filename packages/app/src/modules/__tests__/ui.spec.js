import { getParentGraphMapFromVisualization } from '../ui';

describe('ui', () => {
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

    describe('getParentGraphMapFromVisualization', () => {
        it('generates parent graph map from visualization', () => {
            const { parentGraphMap } = mockUi;
            const mockCurrentWirhOrgUnitPaths = {
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

            expect(
                getParentGraphMapFromVisualization(mockCurrentWirhOrgUnitPaths)
            ).toEqual(parentGraphMap);
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
                getParentGraphMapFromVisualization(
                    mockCurrentWithoutOuDimension
                )
            ).toEqual({});
        });
    });
});
