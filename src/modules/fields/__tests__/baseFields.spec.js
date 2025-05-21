import { getAllFieldObjectsByType, BASE_FIELD_NAME } from '../baseFields.js'

describe('getAllFieldObjectsByType', () => {
    it('returns all field objects for a given type', () => {
        const fields = getAllFieldObjectsByType('reportTable', true)
        expect(Array.isArray(fields)).toBe(true)
        expect(fields.some((f) => f[BASE_FIELD_NAME] === 'cumulative')).toBe(
            true
        )
    })

    it('includes the subscribers field when withSubscribers is true', () => {
        const fields = getAllFieldObjectsByType(
            'reportTable_chart_eventReport_eventChart',
            true
        )
        expect(fields.some((f) => f[BASE_FIELD_NAME] === 'subscribers')).toBe(
            true
        )
    })

    it('removes the subscribers field when withSubscribers is false', () => {
        const fields = getAllFieldObjectsByType(
            'reportTable_chart_eventReport_eventChart',
            false
        )
        expect(fields.some((f) => f[BASE_FIELD_NAME] === 'subscribers')).toBe(
            false
        )
    })

    it('returns an empty array for unknown type', () => {
        const fields = getAllFieldObjectsByType('unknownType', true)
        expect(fields).toEqual([])
    })
})
