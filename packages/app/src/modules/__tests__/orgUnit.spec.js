import { removeLastPathSegment, getOuPath } from '../orgUnit.js'

describe('removeLastPathSegment', () => {
    it('handles a root path', () => {
        const path = '/'

        expect(removeLastPathSegment(path)).toEqual(path)
    })

    it('handles a path with single segment', () => {
        const path = '/abc'

        expect(removeLastPathSegment(path)).toEqual(path)
    })

    it('handles a path with multiple segments', () => {
        const path = 'ABC/def/GHI'

        expect(removeLastPathSegment(path)).toEqual('ABC/def')
    })
})

describe('getOrgUnitPath', () => {
    it('handles root org units', () => {
        const id = 'ROOT_ID'
        const metadata = {}
        const parentGraphMap = { ROOT_ID: '' }

        expect(getOuPath(id, metadata, parentGraphMap)).toEqual('/ROOT_ID')
    })

    it('returns path for org unit defined in metadata', () => {
        const path = 'path'
        const id = 'ORG_UNIT_ID'
        const metadata = {
            [id]: { path },
        }

        expect(getOuPath(id, metadata)).toEqual(path)
    })

    it('returns proper path for org unit not defined in metadata, but in parent graph', () => {
        const id = 'ORG_UNIT_ID'
        const path = 'path'
        const metadata = {}
        const parentGraphMap = { [id]: path }

        expect(getOuPath(id, metadata, parentGraphMap)).toEqual(
            `/${path}/${id}`
        )
    })
})
