import { shallow } from 'enzyme'
import React from 'react'
import { TooltipContent } from '../TooltipContent'

describe('TooltipContent', () => {
    let props
    let shallowTooltip
    const tooltip = () => {
        if (!shallowTooltip) {
            shallowTooltip = shallow(<TooltipContent {...props} />)
        }
        return shallowTooltip
    }

    beforeEach(() => {
        props = {
            dimensionId: 'abc',
            metadata: {},
            itemIds: [],
        }
        shallowTooltip = undefined
    })

    it('renders a <ul>', () => {
        expect(tooltip().find('ul').length).toEqual(1)
    })

    describe('no items provided', () => {
        it('renders a default list item', () => {
            const items = tooltip().find('li')

            expect(items.length).toEqual(1)
        })
    })

    describe('items are provided', () => {
        it('renders list items for the provided items', () => {
            props.itemIds = ['aaa', 'bbb']

            const items = tooltip().find('li')

            expect(items.length).toEqual(props.itemIds.length)
            expect(items.first().text()).toBe('aaa')
        })

        describe('metadata is provided', () => {
            it('renders list items for the provided items', () => {
                props.itemIds = ['aaa', 'bbb']
                props.metadata = {
                    aaa: { name: 'The aaa dimension' },
                    bbb: { name: 'The bbb dimension' },
                }

                const items = tooltip().find('li')

                expect(items.length).toEqual(props.itemIds.length)
                expect(items.first().text()).toBe('The aaa dimension')
            })
        })
    })
})
