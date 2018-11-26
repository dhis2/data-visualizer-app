import { parseError } from '../error';

describe('parseError', () => {
    let error;

    beforeEach(() => {
        error = {
            message: 'test',
            httpStatusCode: 409,
            httpStatus: 'Conflict',
            status: 'ERROR',
        };
    });

    it('should return an object with type and message', () => {
        const expectedResult = {
            type: 'warning',
            message: 'test',
        };

        expect(parseError(error)).toEqual(expectedResult);
    });

    it('should return a warning type error when HTTP status code is not 500', () => {
        const expectedResult = {
            type: 'warning',
            message: 'test',
        };

        expect(parseError(error)).toEqual(expectedResult);
    });

    it('should return a error type when HTTP status code is 500', () => {
        error.httpStatusCode = 500;

        const expectedResult = {
            type: 'error',
            message: 'test',
        };

        expect(parseError(error)).toEqual(expectedResult);
    });
});
