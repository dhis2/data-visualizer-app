import React from 'react';
import { shallow } from 'enzyme';
import FormGroup from '@material-ui/core/FormGroup';

import { StyleTab } from '../StyleTab';

describe('The Style tab', () => {
    let shallowStyleTab;

    const styleTab = () => {
        if (!shallowStyleTab) {
            shallowStyleTab = shallow(<StyleTab />);
        }
        return shallowStyleTab;
    };

    beforeEach(() => {
        shallowStyleTab = undefined;
    });

    it('renders a FormGroup containing everything else', () => {
        const wrappingDiv = styleTab()
            .find(FormGroup)
            .first();

        expect(wrappingDiv.children().length).toBe(4);
    });
    ['HideLegend', 'Title', 'HideTitle', 'Subtitle', 'HideSubtitle'].forEach(
        component => {
            it(`should render a ${component} component`, () => {
                expect(styleTab().find(component).length).toBe(1);
            });
        }
    );
});
