import { getRetransfer } from '../layout'

const layout = {
    columns: ['dx'],
    rows: ['pe'],
    filters: ['ou', 'abc'],
}

describe('layout', () => {
    describe('getRetransfer', () => {
        it('transfers "pe" to filters axis when new dimension added', () => {
            const transfer = {
                xyz: { axisId: 'rows' },
            }

            expect(getRetransfer(layout, transfer, 'AREA')).toMatchObject({
                pe: {
                    axisId: 'filters',
                },
            })
        })

        it('transfers "pe" to filters axis when filter dimension moved to rows', () => {
            const transfer = {
                abc: { axisId: 'rows' },
            }

            expect(getRetransfer(layout, transfer, 'AREA')).toMatchObject({
                pe: {
                    axisId: 'filters',
                },
            })
        })

        it('does not transfer "pe" to filters when a new category is added', () => {
            const transfer = {
                xyz: { axisId: 'rows' },
            }

            expect(getRetransfer(layout, transfer, 'COLUMN')).toMatchObject({})
        })
    })
})
