import React from 'react';
import { shallow } from 'enzyme';
import Popper from '@material-ui/core/Popper';
import { RecommendedIcon } from '../RecommendedIcon';

describe('The RecommendedIcon component ', () => {
    let props;
    let shallowRecIcon;
    const recIcon = () => {
        if (!shallowRecIcon) {
            shallowRecIcon = shallow(<RecommendedIcon {...props} />);
        }
        return shallowRecIcon;
    };
    beforeEach(() => {
        props = { id: 'idString', isSelected: false, isRecommended: false };
        shallowRecIcon = undefined;
    });

    it('renders null if prop isRecommended array does not include the given id', () => {
        expect(recIcon().children().length).toEqual(0);
    });

    describe('when isRecommended is equal to true', () => {
        beforeEach(() => {
            props.isRecommended = true;
            shallowRecIcon = undefined;
        });

        it('renders a <div> containing everything else', () => {
            const wrappingDiv = recIcon()
                .find('div')
                .first();

            expect(wrappingDiv.children()).toEqual(recIcon().children());
        });

        it('renders a Tooltip when state anchorEl is not falsy', () => {
            recIcon().setState({ anchorEl: {} });
            const popper = recIcon().find(Popper);

            expect(popper.length).toEqual(1);
        });
    });
});
