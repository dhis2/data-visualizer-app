import React from 'react'
import { shallow } from 'enzyme'
import InterpretationsComponent from '@dhis2/d2-ui-interpretations'
import { Interpretations } from '../Interpretations'

describe('Interpretations component', () => {
    let props
    let context
    let shallowComponent

    const component = (customProps = {}, customContext = {}) => {
        props = {
            ...props,
            ...customProps,
        }

        context = {
            ...context,
            ...customContext,
        }

        if (!shallowComponent) {
            shallowComponent = shallow(<Interpretations {...props} />, {
                context,
            })
        }

        return shallowComponent
    }

    beforeEach(() => {
        props = { id: null, type: null }
        shallowComponent = undefined
    })

    it('renders nothing with null id', () => {
        expect(component().find(InterpretationsComponent).exists()).toBe(false)
    })

    it('renders <InterpretationsComponent /> when id is not null', () => {
        props = { id: 'SOME_ID', type: 'chart' }
        context = { d2: {} }

        expect(
            component(props, context).find(InterpretationsComponent).exists()
        ).toBe(true)
    })
})
