import React from 'react';
import { shallow } from 'enzyme';
import Popper from '@material-ui/core/Popper';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
    let props;
    let shallowTooltip;
    const tooltip = () => {
        if (!shallowTooltip) {
            shallowTooltip = shallow(<Tooltip {...props} />);
        }
        return shallowTooltip;
    };

    beforeEach(() => {
        props = {
            open: true,
            anchorEl: {},
            dimensionId: 'abc',
            metadata: {},
            itemIds: [],
        };
        shallowTooltip = undefined;
    });

    it('renders a Popper', () => {
        expect(tooltip().find(Popper).length).toBeGreaterThan(0);
    });

    describe('no items provided', () => {
        it('renders a default list item', () => {
            const items = tooltip().find('li');

            expect(items.length).toEqual(1);
        });
    });

    describe('items are provided', () => {
        it('renders list items for the provided items', () => {
            props.itemIds = ['aaa', 'bbb'];

            const items = tooltip().find('li');

            expect(items.length).toEqual(props.itemIds.length);
            expect(items.first().text()).toBe('aaa');
        });

        describe('metadata is provided', () => {
            it('renders list items for the provided items', () => {
                props.itemIds = ['aaa', 'bbb'];
                props.metadata = {
                    aaa: { name: 'The aaa dimension' },
                    bbb: { name: 'The bbb dimension' },
                };

                const items = tooltip().find('li');

                expect(items.length).toEqual(props.itemIds.length);
                expect(items.first().text()).toBe('The aaa dimension');
            });
        });
    });
});
