import React from 'react';
import { shallow } from 'enzyme';
import FormGroup from '@material-ui/core/FormGroup';

import { AxesAndLegendsTab } from '../AxesAndLegendsTab';

describe('The Axis & Legend tab', () => {
    let shallowAxesComponent;

    const axesAndLegendsTab = () => {
        if (!shallowAxesComponent) {
            shallowAxesComponent = shallow(<AxesAndLegendsTab />);
        }
        return shallowAxesComponent;
    };

    beforeEach(() => {
        shallowAxesComponent = undefined;
    });

    it('renders a FormGroup containing everything else', () => {
        const wrappingDiv = axesAndLegendsTab()
            .find(FormGroup)
            .first();

        expect(wrappingDiv.children().length).toBe(8);
    });

    [
        'RangeAxisMinValue',
        'RangeAxisMaxValue',
        'RangeAxisSteps',
        'RangeAxisDecimals',
        'RangeAxisLabel',
        'DomainAxisLabel',
        'HideLegend',
        'Title',
        'HideTitle',
        'Subtitle',
        'HideSubtitle',
    ].forEach(component => {
        it(`should render a ${component} component`, () => {
            expect(axesAndLegendsTab().find(component).length).toBe(1);
        });
    });
});
