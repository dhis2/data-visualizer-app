import React from 'react';
import { shallow } from 'enzyme';
import VisualizationTypeMenuItem from '../VisualizationTypeMenuItem';
import MenuItem from '@material-ui/core/MenuItem';
import VisualizationTypeIcon from '../VisualizationTypeIcon';
import { COLUMN } from '../../../modules/chartTypes';

describe('VisualizationTypeMenuItem component ', () => {
    let props;
    let shallowElement;

    const element = () => {
        if (!shallowElement) {
            shallowElement = shallow(<VisualizationTypeMenuItem {...props} />);
        }
        return shallowElement;
    };

    beforeEach(() => {
        props = {
            type: COLUMN,
            visualizationType: COLUMN,
            styles: {},
        };
        shallowElement = undefined;
    });

    it('renders MenuItem', () => {
        expect(
            element()
                .find(MenuItem)
                .first().length
        ).toEqual(1);
    });

    it('renders VisualizationTypeIcon', () => {
        expect(
            element()
                .find(VisualizationTypeIcon)
                .first().length
        ).toEqual(1);
    });
});
