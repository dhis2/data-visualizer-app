import React from 'react';
import { shallow } from 'enzyme';

import PositiveNumberBaseType from '../Options/PositiveNumberBaseType';
import { RangeAxisSteps } from '../Options/RangeAxisSteps';

describe('DV > Options > RangeAxisSteps', () => {
    let props;
    let shallowRangeAxisSteps;

    const rangeAxisSteps = props => {
        shallowRangeAxisSteps = shallow(<RangeAxisSteps {...props} />);

        return shallowRangeAxisSteps;
    };

    beforeEach(() => {
        props = {
            showHelperText: false,
        };

        shallowRangeAxisSteps = undefined;
    });

    it('renders a <PositiveNumberBaseType />', () => {
        expect(rangeAxisSteps(props).find(PositiveNumberBaseType)).toHaveLength(
            1
        );
    });

    it('sets the label prop to what passed in the option prop', () => {
        expect(
            rangeAxisSteps(props)
                .find(PositiveNumberBaseType)
                .props().option.label
        ).toEqual('Range axis tick steps');
    });

    it('does not show the helper text when showHelperText is false', () => {
        expect(
            rangeAxisSteps(props)
                .find(PositiveNumberBaseType)
                .props().option.helperText
        ).toBe(null);
    });

    it('shows the helper text when showHelperText is true', () => {
        props.showHelperText = true;

        expect(
            rangeAxisSteps(props)
                .find(PositiveNumberBaseType)
                .props().option.helperText
        ).toEqual(
            'Number of axis tick steps, including the min and max. A value of 2 or lower will be ignored.'
        );
    });
});
