import React from 'react';
import { shallow } from 'enzyme';
import FormGroup from '@material-ui/core/FormGroup';

import { StyleTab } from '../StyleTab';
import NoSpaceBetweenColumns from '../Options/NoSpaceBetweenColumns';

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

        expect(wrappingDiv.children().length).toBe(1);
    });

    it('Renders a <NoSpaceBetweenColumns /> component', () => {
        const noSpaceBetweenColumns = styleTab().find(NoSpaceBetweenColumns);

        expect(noSpaceBetweenColumns.length).toBe(1);
    });
});
