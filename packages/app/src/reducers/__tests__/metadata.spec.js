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
})
