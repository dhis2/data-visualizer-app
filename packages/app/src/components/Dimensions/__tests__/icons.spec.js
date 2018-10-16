import React from 'react';
import { shallow } from 'enzyme';
import Popper from '@material-ui/core/Popper';
import { RecommendedIcon } from '../icons';

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
        props = { id: 'idString', isSelected: false, isRecommended: [] };
        shallowRecIcon = undefined;
    });

    it('renders null if prop isRecommended array does not include the given id', () => {
        expect(recIcon().children().length).toEqual(0);
    });

    describe('when isRecommended includes the id', () => {
        beforeEach(() => {
            props.isRecommended = ['idString'];
            shallowRecIcon = undefined;
        });

        it('renders a <div> containing everything else', () => {
            const wrappingDiv = recIcon()
                .find('div')
                .first();

            expect(wrappingDiv.children()).toEqual(recIcon().children());
        });

        it('renders a Tooltip when state anchorEl is not falsy', () => {
            recIcon().setState({ anchorEl: true });
            const popper = recIcon().find(Popper);

            expect(popper.length).toEqual(1);
        });
    });
});
