import { getPropsByKeys, arrayToIdMap } from '../util';

describe('util', () => {
    describe('getPropsByKeys', () => {
        it('should return props, if they exist, on the source object based on a list of keys', () => {
            const sourceObj = {
                a: 1,
            };
            const keys = ['a', 'b'];
            const expectedState = { a: 1 };
            const actualState = getPropsByKeys(sourceObj, keys);

            expect(actualState).toEqual(expectedState);
        });
    });

    describe('arrayToIdMap', () => {
        it('should return an object keyed by id', () => {
            const key1 = 'abc';
            const key2 = 'def';
            const obj1 = { id: key1, name: 'pinky' };
            const obj2 = { id: key2, name: 'lefty' };
            const arr = [obj1, obj2];

            const actual = arrayToIdMap(arr);

            expect(actual[key1]).toEqual(obj1);
        });
    });
});
