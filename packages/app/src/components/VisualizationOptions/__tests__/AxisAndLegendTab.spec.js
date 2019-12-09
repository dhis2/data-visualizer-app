import React from 'react'
import { shallow } from 'enzyme'
import FormGroup from '@material-ui/core/FormGroup'
import RangeAxisMinValue from '../Options/RangeAxisMinValue'
import RangeAxisSteps from '../Options/RangeAxisSteps'
import { AxisAndLegendTab } from '../AxisAndLegendTab'

describe('The Axis & Legend tab', () => {
    let shallowAxesComponent
    const props = { classes: {} }

    const axesAndLegendsTab = () => {
        if (!shallowAxesComponent) {
            shallowAxesComponent = shallow(<AxisAndLegendTab {...props} />)
        }
        return shallowAxesComponent
    }

    beforeEach(() => {
        shallowAxesComponent = undefined
    })

    it('renders a FormGroup containing everything else', () => {
        const wrappingDiv = axesAndLegendsTab()
            .find(FormGroup)
            .first()

        expect(wrappingDiv.children().length).toBe(5)
    })

    ;[
        RangeAxisSteps,
        RangeAxisMinValue,
        'RangeAxisMaxValue',
        'RangeAxisDecimals',
        'RangeAxisLabel',
        'DomainAxisLabel',
    ].forEach(component => {
        it(`should render a ${component} component`, () => {
            expect(axesAndLegendsTab().find(component).length).toBe(1)
        })
    })
})
