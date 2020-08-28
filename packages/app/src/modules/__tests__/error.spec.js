import { getErrorVariantByStatusCode } from '../error'

describe('getErrorVariantByStatusCode', () => {
    let error

    beforeEach(() => {
        error = {
            message: 'test',
            httpStatusCode: 409,
            httpStatus: 'Conflict',
            status: 'ERROR',
        }
    })

    it('should return type warning by default', () => {
        const expectedResult = 'warning'

        expect(getErrorVariantByStatusCode(error.httpStatusCode)).toEqual(
            expectedResult
        )
    })

    it('should return type warning when HTTP status code is not 500', () => {
        const expectedResult = 'warning'

        expect(getErrorVariantByStatusCode(error.httpStatusCode)).toEqual(
            expectedResult
        )
    })

    it('should return type error when HTTP status code is 500', () => {
        error.httpStatusCode = 500

        const expectedResult = 'error'

        expect(getErrorVariantByStatusCode(error.httpStatusCode)).toEqual(
            expectedResult
        )
    })
})
