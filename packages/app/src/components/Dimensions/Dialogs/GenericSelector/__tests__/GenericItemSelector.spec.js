import React from 'react';
import { shallow } from 'enzyme';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { FIXED_DIMENSIONS } from '../../../../../modules/fixedDimensions';
import { GenericItemSelector } from '../GenericItemSelector';

const peId = FIXED_DIMENSIONS.pe.id;

describe('The Period Dimension component ', () => {
    let props;
    let shallowSelector;

    const genericSelector = () => {
        if (!shallowSelector) {
            shallowSelector = shallow(<GenericItemSelector {...props} />);
        }
        return shallowSelector;
    };

    beforeEach(() => {
        props = {
            selectedItems: {},
            addItems: jest.fn(),
            removeItems: jest.fn(),
            addMetadata: jest.fn(),
        };
        shallowSelector = undefined;
    });

    it('renders a <Fragment> containing everything else', () => {
        const wrappingFragment = genericSelector()
            .find('Fragment')
            .first();

        expect(wrappingFragment.children()).toEqual(
            genericSelector().children()
        );
    });

    it('renders a <DialogTitle /> and <DialogContent /> component', () => {
        const genericWrapper = genericSelector();

        expect(genericWrapper.find(DialogTitle).length).toEqual(1);
        expect(genericWrapper.find(DialogContent).length).toEqual(1);
    });
});
