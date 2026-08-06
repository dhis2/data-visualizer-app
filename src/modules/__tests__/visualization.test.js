import { getOptionNamesByType } from '../options/config.js'
import { default as options } from '../options.js'
import {
    getSaveableVisualization,
    getVisualizationWithFilteredOptionsByType,
    visTypes,
} from '../visualization.js'

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

describe('getVisualizationWithFilteredOptionsByType', () => {
    it('filters the visualization leaving only the supported options by type', () => {
        visTypes.forEach((visType) => {
            const vis = {
                type: visType,
                __other: 'just for testing',
                ...Object.entries(options).reduce(
                    (acc, [optionName, { defaultValue }]) => {
                        acc[optionName] = defaultValue
                        return acc
                    },
                    {}
                ),
            }

            const filteredVis = getVisualizationWithFilteredOptionsByType(vis)
            const sortFn = (a, b) => a.localeCompare(b)

            expect(Object.keys(filteredVis).sort(sortFn)).toEqual(
                ['type', '__other', ...getOptionNamesByType(vis.type)].sort(
                    sortFn
                )
            )
        })
    })
})
