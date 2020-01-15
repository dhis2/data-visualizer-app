import React from 'react'
import { shallow } from 'enzyme'
import { StartScreen } from '../StartScreen'

describe('StartScreen', () => {
    let props
    let shallowStartScreen
    const canvas = () => {
        if (!shallowStartScreen) {
            shallowStartScreen = shallow(<StartScreen {...props} />)
        }
        return shallowStartScreen
    }

    beforeEach(() => {
        props = {
            loading: false,
            error: null,
            classes: {},
        }
        shallowStartScreen = undefined
    })

    it('renders a div', () => {
        expect(canvas().find('div').length).toBeGreaterThan(0)
    })

    it('renders the provided error message', () => {
        const theError = 'Error 718: I am not a teapot'
        props.error = theError
        expect(
            canvas()
                .find('p')
                .last()
                .text()
        ).toEqual(theError)
    })
})
