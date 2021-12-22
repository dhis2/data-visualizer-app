import { seriesOptions } from '../yearOverYear.js'

describe('yearOverYear', () => {
    it('year has matching id and name', () => {
        const lastOption = seriesOptions[seriesOptions.length - 1]
        expect(lastOption.id).toEqual(lastOption.getName())
    })

    it('has sequential years', () => {
        const lastOption = seriesOptions[seriesOptions.length - 1]
        const secondLastOption = seriesOptions[seriesOptions.length - 2]

        expect(parseInt(lastOption.getName(), 10)).toEqual(
            parseInt(secondLastOption.getName(), 10) - 1
        )
    })
})
