import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '@material-ui/core/MenuItem';
import { DimensionOptions } from '../DimensionOptions';
import ContextMenu from '../ContextMenu';

describe('The DimensionOptions component ', () => {
    let props;
    let shallowDimOptions;
    const dimOptions = () => {
        if (!shallowDimOptions) {
            shallowDimOptions = shallow(<DimensionOptions {...props} />);
        }
        return shallowDimOptions;
    };

    beforeEach(() => {
        props = {
            id: 'IdString',
            type: 'COLLUMN',
            anchorEl: {},
            isSelected: false,
            currentLayout: {},
            items: [],
            onAddDimension: jest.fn(),
            openDialog: jest.fn(),
            onCloseMenu: jest.fn(),
        };
        shallowDimOptions = undefined;
    });

    it('renders a <ContextMenu /> ', () => {
        const contextMenu = dimOptions().find(ContextMenu);

        expect(contextMenu.length).toEqual(1);
    });

    it('passes only 1 element as menuItems to <ContextMenu /> if prop isSelected is true and prop type is equal to YearOnYear', () => {
        props.isSelected = true;
        props.type = 'YEAR_OVER_YEAR_LINE';

        const contextMenu = dimOptions().find(ContextMenu);

        expect(contextMenu.dive().find(MenuItem).length).toEqual(1);
    });

    it('passes 3 elements as menuItems if prop "type" is NOT equal to YearOnYear', () => {
        const contextMenu = dimOptions().find(ContextMenu);

        expect(contextMenu.dive().find(MenuItem).length).toEqual(3);
    });
});
