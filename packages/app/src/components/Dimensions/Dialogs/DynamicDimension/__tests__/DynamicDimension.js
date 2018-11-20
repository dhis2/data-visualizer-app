import React from 'react';
import { shallow } from 'enzyme';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { DynamicDimension } from '../DynamicDimension';

describe('The Period Dimension component ', () => {
    let props;
    let shallowSelector;

    const dynamicSelector = () => {
        if (!shallowSelector) {
            shallowSelector = shallow(<DynamicDimension {...props} />);
        }
        return shallowSelector;
    };

    beforeEach(() => {
        props = {
            selectedItems: [],
            addItems: jest.fn(),
            removeItems: jest.fn(),
            addMetadata: jest.fn(),
        };
        shallowSelector = undefined;
    });

    it('renders a <Fragment> containing everything else', () => {
        const wrappingFragment = dynamicSelector()
            .find('Fragment')
            .first();

        expect(wrappingFragment.children()).toEqual(
            dynamicSelector().children()
        );
    });

    it('renders a <DialogTitle /> and <DialogContent /> component', () => {
        const dynamicWrapper = dynamicSelector();

        expect(dynamicWrapper.find(DialogTitle).length).toEqual(1);
        expect(dynamicWrapper.find(DialogContent).length).toEqual(1);
    });
});
