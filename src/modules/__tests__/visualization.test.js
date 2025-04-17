import { getSaveableVisualization } from '../visualization.js'

describe('getSaveableVisualization', () => {
    it('removes non-savable options from the visualization object', () => {
        const visualization = {
            colorSet: 'value1',
            approvalLevel: 'value2',
            fontSize: 'value3',
            name: 'my visualization',
        }

        const result = getSaveableVisualization(visualization)

        const expectedResult = {
            colorSet: 'value1',
            fontSize: 'value3',
            name: 'my visualization',
        }
        expect(result).toEqual(expectedResult)
    })

    it('returns an empty object if all options are non-savable', () => {
        const visualization = {
            approvalLevel: 'value2',
        }

        const result = getSaveableVisualization(visualization)

        expect(result).toEqual({})
    })

    it('does not modify the original visualization object', () => {
        const visualization = {
            colorSet: 'value1',
            approvalLevel: 'value2',
            fontSize: 'value3',
            name: 'my visualization',
        }

        getSaveableVisualization(visualization)

        expect(visualization).toEqual({
            colorSet: 'value1',
            approvalLevel: 'value2',
            fontSize: 'value3',
            name: 'my visualization',
        })
    })
})
