import { matchVisualizationWithType } from '../utils.js'

let visualizations

describe('utils', () => {
    describe('matchVisualizationWithType', () => {
        beforeEach(() => {
            visualizations = [
                {
                    position: 1,
                    views: 10,
                    id: 'aaa111',
                    created: '2020-01-01',
                },
                {
                    position: 2,
                    views: 9,
                    id: 'bbb222',
                    created: '2020-01-02',
                },
                {
                    position: 3,
                    views: 8,
                    id: 'ccc333',
                    created: '2020-01-03',
                },
            ]
        })
        it('all visualizations are matched with a type', () => {
            const types = [
                {
                    id: 'aaa111',
                    type: 'typeX',
                },
                {
                    id: 'bbb222',
                    type: 'typeY',
                },
                {
                    id: 'ccc333',
                    type: 'typeZ',
                },
            ]
            const expectedResult = [
                {
                    position: 1,
                    views: 10,
                    id: 'aaa111',
                    created: '2020-01-01',
                    type: 'typeX',
                },
                {
                    position: 2,
                    views: 9,
                    id: 'bbb222',
                    created: '2020-01-02',
                    type: 'typeY',
                },
                {
                    position: 3,
                    views: 8,
                    id: 'ccc333',
                    created: '2020-01-03',
                    type: 'typeZ',
                },
            ]
            expect(matchVisualizationWithType(visualizations, types)).toEqual(
                expectedResult
            )
        })
        it('only visualizations with a type are returned', () => {
            const types = [
                {
                    id: 'aaa111',
                    type: 'typeX',
                },
                {
                    id: 'bbb222',
                    type: 'typeY',
                },
            ]
            const expectedResult = [
                {
                    position: 1,
                    views: 10,
                    id: 'aaa111',
                    created: '2020-01-01',
                    type: 'typeX',
                },
                {
                    position: 2,
                    views: 9,
                    id: 'bbb222',
                    created: '2020-01-02',
                    type: 'typeY',
                },
            ]
            expect(matchVisualizationWithType(visualizations, types)).toEqual(
                expectedResult
            )
        })
    })
})
