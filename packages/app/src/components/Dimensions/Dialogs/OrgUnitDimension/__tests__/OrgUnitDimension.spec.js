import React from 'react';
import { shallow } from 'enzyme';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Model from 'd2/model/Model';
import ModelDefinition from 'd2/model/ModelDefinition';
import { OrgUnitSelector } from '@dhis2/d2-ui-org-unit-dialog';
import { OrgUnitDimension, defaultState } from '../OrgUnitDimension';

describe('The OrgUnitDimension component ', () => {
    let props;
    let shallowDataDim;

    const rootModel = new Model(
        new ModelDefinition(
            {
                singular: 'organisationUnit',
                plural: 'organisationUnits',
            },
            {},
            {},
            {},
            {}
        )
    );

    const orgUnitDimension = () => {
        if (!shallowDataDim) {
            shallowDataDim = shallow(<OrgUnitDimension {...props} />);
        }
        return shallowDataDim;
    };

    beforeEach(() => {
        props = {
            ouItems: [],
            parentGraphMap: {},
            metadata: {},
            acAddUiItems: jest.fn(),
            acRemoveUiItems: jest.fn(),
            acAddParentGraphMap: jest.fn(),
            acAddMetadata: jest.fn(),
            acSetUiItems: jest.fn(),
            acSetCurrentFromUi: jest.fn(),
            current: { id: null },
            settings: { displayNameProperty: 'displayName' },
        };
        shallowDataDim = undefined;
    });

    it('has default state', () => {
        const actualState = orgUnitDimension().state();

        expect(actualState).toEqual(defaultState);
    });

    it('renders a DialogTitle and DialogContent component ', () => {
        const component = orgUnitDimension();

        expect(component.find(DialogTitle).first().length).toEqual(1);
        expect(component.find(DialogContent).first().length).toEqual(1);
    });

    it('renders circular progress conditionally', () => {
        const component = orgUnitDimension();
        const progress = component.find(CircularProgress);

        expect(component.state().root).toBe(undefined);
        expect(progress.type()).toEqual(CircularProgress);

        component.setState({ root: rootModel });

        expect(component.state().root).not.toBe(undefined);
        expect(component.find(CircularProgress).exists()).toBe(false);
    });

    it('renders <OrgUnitSelector /> conditionally', () => {
        const component = orgUnitDimension();

        expect(component.find(OrgUnitSelector).exists()).toBe(false);

        component.setState({ root: rootModel });

        expect(component.find(OrgUnitSelector).type()).toEqual(OrgUnitSelector);
    });
});
