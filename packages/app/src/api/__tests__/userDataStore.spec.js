import { prepareCurrentAnalyticalObject } from '../userDataStore';

describe('prepareCurrentAnalyticalObject', () => {
    it('removes corresponding attributes', () => {
        const unprocessed = {
            id: 'SOME_ID',
            name: 'Analytical object typical name',
            displayName: 'Analytical object typical name',
            key: 'value',
        };
        const processed = prepareCurrentAnalyticalObject(unprocessed);
        const keysToRemove = ['id', 'name', 'displayName'];

        keysToRemove.forEach(key => {
            expect(unprocessed[key]).not.toBeUndefined();
        });

        keysToRemove.forEach(key => {
            expect(processed[key]).toBeUndefined();
        });
    });
});
