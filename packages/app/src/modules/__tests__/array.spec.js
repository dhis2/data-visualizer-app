import { toArray } from '../array';

describe('toArray', () => {
    it('should return an array with the param as item', () => {
        const param = 'text';
        expect(toArray(param)).toEqual([param]);
    });

    it('should return the param as it is already an array', () => {
        const param = ['text'];
        expect(toArray(param)).toBe(param);
    });
});
