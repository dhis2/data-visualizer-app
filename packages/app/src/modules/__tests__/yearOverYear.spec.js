import { seriesOptions } from '../yearOverYear'

const intVal = val => parseInt(val, 10)
describe('yearOverYear', () => {
    it('has matching year number and string', () => {
        const lastOption = seriesOptions[seriesOptions.length - 1]
        expect(lastOption.id).toEqual(lastOption.getName())
    })

    it('has sequential years', () => {
        const lastOption = seriesOptions[seriesOptions.length - 1]
        const secondLastOption = seriesOptions[seriesOptions.length - 2]

        expect(intVal(lastOption.getName())).toEqual(
            intVal(secondLastOption.getName()) - 1
        )
    })
})
