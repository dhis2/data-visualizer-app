import { getRetransfer } from '../layout.js'

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

            expect(getRetransfer(layout, transfer, 'RADAR')).toMatchObject({
                pe: {
                    axisId: 'filters',
                },
            })
        })

        it('transfers "pe" to filters axis when filter dimension moved to rows', () => {
            const transfer = {
                abc: { axisId: 'rows' },
            }

            expect(getRetransfer(layout, transfer, 'RADAR')).toMatchObject({
                pe: {
                    axisId: 'filters',
                },
            })
        })
    })
})
