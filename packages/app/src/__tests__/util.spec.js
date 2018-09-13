import { getPropsByKeys } from '../util';

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
