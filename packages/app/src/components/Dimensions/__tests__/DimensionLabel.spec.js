import React from 'react';
import { shallow } from 'enzyme';
import { DimensionLabel } from '../DimensionLabel';

describe('The DimensionList component ', () => {
    let props;
    let shallowDimLabel;
    const dimLabel = () => {
        if (!shallowDimLabel) {
            shallowDimLabel = shallow(<DimensionLabel {...props} />);
        }
        return shallowDimLabel;
    };
    beforeEach(() => {
        props = {
            id: 'idstring',
            type: 'COLUMN',
            name: 'labelname',
            isSelected: false,
            isDeactivated: false,
            openDialog: jest.fn(),
            children: [],
        };
        shallowDimLabel = undefined;
    });

    it('noop', () => {
        expect(1).toEqual(1);
    });

    it('renders a <div>', () => {
        expect(
            dimLabel()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a <div> containing everything else', () => {
        const wrappingDiv = dimLabel()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(dimLabel().children());
    });

    it('should open a dialog when the label is presssed', () => {
        dimLabel()
            .props()
            .onClick();

        expect(props.openDialog).toHaveBeenCalled();
    });

    it('should open a dialog when user press the "Enter" key on a focused DimensionLabel', () => {
        const mockEvent = {
            key: 'Enter',
            ctrlKey: false,
        };

        dimLabel()
            .props()
            .onKeyPress(mockEvent);

        expect(props.openDialog).toHaveBeenCalled();
    });

    it('should not open the Period Selector dialog if current layout is equal to YearOnYear/ prop isDeactivated = true', () => {
        props.isDeactivated = true;

        dimLabel()
            .props()
            .onClick();

        expect(props.openDialog).toHaveBeenCalledTimes(0);
    });
});
