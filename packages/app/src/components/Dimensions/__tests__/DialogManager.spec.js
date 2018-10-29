import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '@material-ui/core/Dialog';
import {
    DialogManager,
    defaultState,
    dimensionComponents,
} from '../DialogManager';

describe('The DialogManager component ', () => {
    let props;
    let shallowDialog;

    const dialogManager = (customProps = {}) => {
        props = {
            ...props,
            ...customProps,
        };

        if (!shallowDialog) {
            shallowDialog = shallow(<DialogManager {...props} />);
        }
        return shallowDialog;
    };

    beforeEach(() => {
        props = {
            dialogIsOpen: false,
            id: null,
            toggleDialog: jest.fn(),
        };
        shallowDialog = undefined;
    });

    it('renders a null when id is equal to null ', () => {
        expect(dialogManager().length).toEqual(1);
    });

    it('renders a <Dialog> id is not equal to a falsy value', () => {
        props.id = 'dx';

        const wrappingDialog = dialogManager()
            .find(Dialog)
            .first();

        expect(wrappingDialog.length).toEqual(1);
    });

    it('has default state', () => {
        const actualState = dialogManager().state();

        expect(actualState).toEqual(defaultState);
    });

    it('updates state properly for lazy mounting', () => {
        const dimensionIds = Object.keys(dimensionComponents(props));
        const component = dialogManager();

        dimensionIds.forEach((dimensionId, index) => {
            component.setProps({
                ...props,
                id: dimensionId,
            });

            expect(component.state()).toEqual({
                ...component.state(),
                mounted: dimensionIds.slice(0, index + 1),
            });
        });
    });
});
