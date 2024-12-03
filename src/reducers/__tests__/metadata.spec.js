import {
    USER_ORG_UNIT,
    USER_ORG_UNIT_CHILDREN,
    USER_ORG_UNIT_GRANDCHILDREN,
} from '@dhis2/analytics'
import reducer, { DEFAULT_METADATA, ADD_METADATA } from '../metadata.js'

const currentState = {
    uid1: {
        name: 'Jethro Q. Walrustitty',
    },
}

const metadataToAdd = {
    uid2: {
        name: 'Tarquin Fin-tim-lin-bin-whin-bim-lim-bus-stop-Ftang-Ftang-Ole-Biscuitbarrel',
    },
}

describe('reducer: metadata', () => {
    it('should return the default state', () => {
        const actualState = reducer(DEFAULT_METADATA, { type: 'NO_MATCH' })

        expect(actualState).toEqual(DEFAULT_METADATA)
    })

    it(`${ADD_METADATA}: should add metadata`, () => {
        const actualState = reducer(currentState, {
            type: ADD_METADATA,
            value: metadataToAdd,
        })

        const expectedState = {
            ...currentState,
            ...metadataToAdd,
        }

        expect(actualState).toEqual(expectedState)
    })

    it(`${ADD_METADATA}: should not overwrite default metadata`, () => {
        const ids = [
            USER_ORG_UNIT,
            USER_ORG_UNIT_CHILDREN,
            USER_ORG_UNIT_GRANDCHILDREN,
            'LAST_12_MONTHS',
        ]

        const unwantedMetadata = ids.reduce((meta, id) => {
            meta[id] = {
                id,
                name: id,
            }
            return meta
        }, {})

        const actualState = reducer(DEFAULT_METADATA, {
            type: ADD_METADATA,
            value: unwantedMetadata,
        })

        ids.forEach((id) => {
            expect(actualState[id].name).toEqual(DEFAULT_METADATA[id].name)
            expect(actualState[id].name).not.toEqual(unwantedMetadata[id].name)
        })
    })
})
