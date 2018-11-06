import React from 'react';
import { shallow } from 'enzyme';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Model from 'd2/model/Model';
import ModelDefinition from 'd2/model/ModelDefinition';
import { OrgUnitSelector } from '@dhis2/d2-ui-org-unit-dialog';
import { OrgUnitDimension, defaultState } from '../OrgUnitDimension';
import { HideButton, UpdateButton } from '../buttons';

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
            ui: {
                itemsByDimension: {
                    ou: [],
                },
            },
            metadata: {},
            acAddUiItems: jest.fn(),
            acAddParentGraphMap: jest.fn(),
            acAddMetadata: jest.fn(),
            acSetUiItems: jest.fn(),
            acSetCurrentFromUi: jest.fn(),
            toggleDialog: jest.fn(),
        };
        shallowDataDim = undefined;
    });

    it('has default state', () => {
        const actualState = orgUnitDimension().state();

        expect(actualState).toEqual(defaultState);
    });

    it('renders a dialog components ', () => {
        const component = orgUnitDimension();

        expect(component.find(DialogTitle).first().length).toEqual(1);
        expect(component.find(DialogContent).first().length).toEqual(1);
        expect(component.find(DialogActions).first().length).toEqual(1);
    });

    it('renders a <OrgUnitDimension /> with two buttons', () => {
        const dialogActions = orgUnitDimension().find(DialogActions);

        expect(dialogActions.children().length).toEqual(2);
        expect(dialogActions.childAt(0).type()).toEqual(HideButton);
        expect(dialogActions.childAt(1).type()).toEqual(UpdateButton);
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
