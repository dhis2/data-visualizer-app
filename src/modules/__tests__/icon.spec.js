// icons.test.js
import { getIconName, getIconUrl } from '../icon.js'

describe('getIconName', () => {
    test.each([
        [null, null],
        [undefined, null],
        ['', null],
        ['   ', null],
    ])('returns null for falsy/blank input: %p', (input, expected) => {
        expect(getIconName(input)).toBe(expected)
    })

    test('extracts the name from a normal DHIS2 icon URL', () => {
        const input =
            'https://test.e2e.dhis2.org/anly-42/api/icons/3g_positive/icon.svg'
        expect(getIconName(input)).toBe('3g_positive')
    })

    test('extracts the name from a weird path as long as it ends with /<name>/icon.svg', () => {
        const input =
            'https://dhis2.org/dhis/whatever/reallylongstringapi/icons/3g_positive/icon.svg'
        expect(getIconName(input)).toBe('3g_positive')
    })

    test('extracts the final segment before /icon.svg even with many segments', () => {
        const input = 'https://example.com/a/b/c/d/icons/3g_positive/icon.svg'
        expect(getIconName(input)).toBe('3g_positive')
    })

    test('returns the input unchanged when it is already an icon name', () => {
        expect(getIconName('3g_positive')).toBe('3g_positive')
    })

    test('does not strip .svg if the raw input is a name with an extension', () => {
        expect(getIconName('3g_positive.svg')).toBe('3g_positive.svg')
    })

    test('returns the input unchanged if URL does not end with /icon.svg', () => {
        const input =
            'https://example.com/api/icons/3g_positive/icon.svg?cache=1'
        // Regex won’t match because it requires string end ($); function falls back to returning input
        expect(getIconName(input)).toBe(input)
    })
})

describe('getIconUrl', () => {
    const baseUrl = 'https://play.im.dhis2.org/dev'

    test('reconstructs URL from a plain icon name', () => {
        expect(getIconUrl('3g_positive', baseUrl)).toBe(
            'https://play.im.dhis2.org/dev/api/icons/3g_positive/icon.svg'
        )
    })

    test('reconstructs URL from a full URL by extracting the name', () => {
        const input = 'https://host/anything/icons/3g_positive/icon.svg'
        expect(getIconUrl(input, baseUrl)).toBe(
            'https://play.im.dhis2.org/dev/api/icons/3g_positive/icon.svg'
        )
    })

    test('returns null when getIconName returns null', () => {
        expect(getIconUrl('   ', baseUrl)).toBeNull()
        expect(getIconUrl(null, baseUrl)).toBeNull()
    })

    test('documents behavior when baseUrl has a trailing slash (double slash before api)', () => {
        const baseWithSlash = 'https://test.e2e.dhis2.org/anly-42/'
        // Current implementation does not normalize; this test documents that behavior.
        expect(getIconUrl('3g_positive', baseWithSlash)).toBe(
            'https://test.e2e.dhis2.org/anly-42//api/icons/3g_positive/icon.svg'
        )
    })

    test('passes through unexpected values from getIconName', () => {
        // Because getIconName returns input if it doesn't match /<name>/icon.svg$, an odd input like this
        // will be treated as the "name" and interpolated.
        const odd = '3g_positive.svg'
        expect(getIconUrl(odd, baseUrl)).toBe(
            'https://play.im.dhis2.org/dev/api/icons/3g_positive.svg/icon.svg'
        )
    })
})
