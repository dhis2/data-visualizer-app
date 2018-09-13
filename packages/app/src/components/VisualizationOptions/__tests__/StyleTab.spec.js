import React from 'react';
import { shallow } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StyleTab } from '../StyleTab';

describe('The Style tab', () => {
    let props;
    let shallowStyleTab;
    const styleTab = () => {
        if (!shallowStyleTab) {
            shallowStyleTab = shallow(<StyleTab {...props} />);
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
    it('renders a div', () => {
        expect(styleTab().find('div').length).toEqual(1);
    });
    it('renders a div containing everything else', () => {
        const wrappingDiv = styleTab()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(styleTab().children());
    });
    it('Renders a <FormControllabel /> component', () => {
        const formControlLabel = styleTab().find(FormControlLabel);
        expect(formControlLabel.length).toBe(1);
    });
});
