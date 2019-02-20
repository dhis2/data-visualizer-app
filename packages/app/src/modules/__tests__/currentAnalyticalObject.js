import {
    appendDimensionItemNamesToAnalyticalObject,
    prepareCurrentAnalyticalObject,
    removeUnnecessaryAttributesFromAnalyticalObject,
} from '../currentAnalyticalObject';

describe('prepareCurrentAnalyticalObject', () => {
    it('removes unnecessary attributes', () => {
        const current = {
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
        const metadata = {
            Uvn6LCg7dVU: { name: 'ANC 1 Coverage' },
            qhqAxPSTUXp: { name: 'Koinadugu' },
            Vth0fbpFcsO: { name: 'Kono' },
            2017: { name: '2017' },
        };
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
                        },
                        {
                            id: 'Vth0fbpFcsO',
                            name: 'Kono',
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

        const result = prepareCurrentAnalyticalObject(current, metadata);

        expect(expected).toEqual(result);
    });
});

describe('appendDimensionItemNamesToAnalyticalObject', () => {
    it('appends dimension item names to analytical object', () => {
        const current = {
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
        const metadata = {
            Uvn6LCg7dVU: { name: 'ANC 1 Coverage' },
            qhqAxPSTUXp: { name: 'Koinadugu' },
            Vth0fbpFcsO: { name: 'Kono' },
            2017: { name: '2017' },
        };

        const testDimensionItemNamesAreUndefined = dimension => {
            dimension.items.forEach(item => {
                expect(item.name).toBeUndefined();
            });
        };

        const testDimensionItemNamesAreNotUndefined = dimension => {
            dimension.items.forEach(item => {
                expect(item.name).not.toBeUndefined();
                expect(item.name).toEqual(metadata[item.id].name);
            });
        };

        current.columns.forEach(testDimensionItemNamesAreUndefined);
        current.filters.forEach(testDimensionItemNamesAreUndefined);
        current.rows.forEach(testDimensionItemNamesAreUndefined);

        const processed = appendDimensionItemNamesToAnalyticalObject(
            metadata,
            current
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
