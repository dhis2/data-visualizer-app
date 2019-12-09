import React from 'react'
import { shallow } from 'enzyme'

import TextBaseOption from '../Options/TextBaseOption'
import { RangeAxisSteps } from '../Options/RangeAxisSteps'

describe('DV > Options > RangeAxisSteps', () => {
    let props
    let shallowRangeAxisSteps

    const rangeAxisSteps = props => {
        shallowRangeAxisSteps = shallow(<RangeAxisSteps {...props} />)

        return shallowRangeAxisSteps
    }

    beforeEach(() => {
        props = {
            showHelperText: false,
        }

        shallowRangeAxisSteps = undefined
    })

    it('renders a <TextBaseOption />', () => {
        expect(rangeAxisSteps(props).find(TextBaseOption)).toHaveLength(1)
    })

    it('sets the label prop to what passed in the option prop', () => {
        expect(
            rangeAxisSteps(props)
                .find(TextBaseOption)
                .props().option.label
        ).toEqual('Range axis tick steps')
    })

    it('does not show the helper text when showHelperText is false', () => {
        expect(
            rangeAxisSteps(props)
                .find(TextBaseOption)
                .props().option.helperText
        ).toBe(null)
    })

    it('shows the helper text when showHelperText is true', () => {
        props.showHelperText = true

        expect(
            rangeAxisSteps(props)
                .find(TextBaseOption)
                .props().option.helperText
        ).toEqual(`Tick steps may extend the chart beyond 'Range axis max'`)
    })
})
