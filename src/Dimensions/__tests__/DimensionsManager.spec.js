import React from 'react';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog';
import DimensionsManager from '../DimensionsManager';

describe('DimensionsManager', () => {
    let props;
    let shallowDimensionsManager;
    const dimensionsManager = () => {
        if (!shallowDimensionsManager) {
            shallowDimensionsManager = shallow(
                <DimensionsManager {...props} />
            );
        }
        return shallowDimensionsManager;
    };
    beforeEach(() => {
        props = {
            index: undefined,
            dialogIsOpen: false,
            toggleDialog: undefined,
        };
        shallowDimensionsManager = undefined;
    });
    it('renders a Dialog copmonent', () => {
        expect(dimensionsManager().find(Dialog).length).toBe(1);
    });
});
