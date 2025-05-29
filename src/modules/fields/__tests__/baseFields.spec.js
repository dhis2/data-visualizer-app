import { getAllFieldObjectsByType, BASE_FIELD_NAME } from '../baseFields.js'

describe('getAllFieldObjectsByType', () => {
    it('returns all field objects for a given type', () => {
        const fields = getAllFieldObjectsByType('reportTable', true)
        expect(Array.isArray(fields)).toBe(true)
        expect(fields.some((f) => f[BASE_FIELD_NAME] === 'cumulative')).toBe(
            true
        )
    })

    it('returns an empty array for unknown type', () => {
        const fields = getAllFieldObjectsByType('unknownType', true)
        expect(fields).toEqual([])
    })
})
