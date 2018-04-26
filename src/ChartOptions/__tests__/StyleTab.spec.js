import React from 'react';
import { shallow } from 'enzyme';
import { FormControlLabel } from 'material-ui-next/Form';
import { getStubContext } from '../../../config/testsContext';
import { StyleTab } from '../StyleTab';

describe('StyleTab', () => {
    let props;
    let shallowStyleTab;
    const styleTab = () => {
        if (!shallowStyleTab) {
            shallowStyleTab = shallow(<StyleTab {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowStyleTab;
    };
    beforeEach(() => {
        props = {
            tabContent: {
                noSpace: false,
            },
            classes: {},
            onChange: jest.fn(),
        };
        shallowStyleTab = undefined;
    });
    it.only('renders a div', () => {
        expect(styleTab().find('div').length).toEqual(1);
    });
    it.only('renders a div containing everything else', () => {
        const wrappingDiv = styleTab()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(styleTab().children());
    });
    it.only('Renders a <FormControllabel /> component', () => {
        const formControlLabel = styleTab().find(FormControlLabel);
        expect(formControlLabel.length).toBe(1);
    });
});
