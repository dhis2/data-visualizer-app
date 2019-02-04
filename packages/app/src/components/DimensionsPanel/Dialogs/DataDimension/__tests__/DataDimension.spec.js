import React from 'react';
import { shallow } from 'enzyme';
import DialogContent from '@material-ui/core/DialogContent';
import { DataDimension } from '../DataDimension';
import * as api from '../../../../../api/dimensions';

describe('DataDimension component ', () => {
    let props;
    let shallowDataDim;
    const dataDim = () => {
        if (!shallowDataDim) {
            shallowDataDim = shallow(<DataDimension {...props} />);
        }
        return shallowDataDim;
    };

    beforeEach(() => {
        props = {
            selectedItems: [],
            ui: {},
            displayNameProp: 'string',
            removeDxItems: jest.fn(),
            addDxItems: jest.fn(),
            setDxItems: jest.fn(),
            addMetadata: jest.fn(),
            filter: {},
        };
        shallowDataDim = undefined;

        api.apiFetchAlternatives = jest.fn().mockResolvedValue({
            dimensionItems: [{ id: 'dimId1' }, { id: 'dimId2' }],
            nextPage: null,
        });
    });

    describe('no groups found', () => {
        it('renders empty div', done => {
            api.apiFetchGroups = jest.fn().mockResolvedValue([]);

            const wrapper = dataDim();

            setTimeout(() => {
                expect(wrapper.find('div').first().length).toEqual(1);
                const dialogContent = wrapper
                    .find('div')
                    .first()
                    .find(DialogContent);

                expect(dialogContent.length).toBe(0);

                done();
            });
        });
    });

    describe('has groups', () => {
        beforeEach(() => {
            api.apiFetchGroups = jest
                .fn()
                .mockResolvedValue([{ id: 'rarity' }, { id: 'rainbow' }]);
        });

        it('renders a Fragment ', done => {
            const wrapper = dataDim();

            setTimeout(() => {
                expect(wrapper.find('Fragment').first().length).toEqual(1);
                done();
            });
        });

        it('renders a Fragment containing everything else', done => {
            const wrapper = dataDim();

            setTimeout(() => {
                const wrappingDiv = wrapper.find('Fragment').first();
                expect(wrappingDiv.children()).toEqual(wrapper.children());
                done();
            });
        });
    });
});
