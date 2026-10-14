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

describe('getSaveableVisualization (series colours prototype)', () => {
    it('strips per-item colours and UI-only colour options', () => {
        const result = getSaveableVisualization({
            series: [{ dimensionItem: 'a', axis: 1, color: '#ffffff' }],
            fillType: 'PATTERN',
            colorMode: 'PALETTE',
            colorPalette: 'BY_AXIS',
            useItemColors: true,
            singleColor: '#ff0000',
        })
        expect(result.series).toEqual([{ dimensionItem: 'a', axis: 1 }])
        expect(result).not.toHaveProperty('fillType')
        expect(result).not.toHaveProperty('colorMode')
        expect(result).not.toHaveProperty('colorPalette')
        expect(result).not.toHaveProperty('useItemColors')
        expect(result).not.toHaveProperty('singleColor')
    })
})
