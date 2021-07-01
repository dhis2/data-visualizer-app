/* eslint-disable react/display-name */
import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
} from '@dhis2/analytics'
import { shallow } from 'enzyme'
import React from 'react'
import HideButton from '../../../HideButton/HideButton'
import { DialogManager } from '../DialogManager'

jest.mock('@dhis2/analytics', () => {
    const dataId = 'dx'
    const periodId = 'pe'
    const ouId = 'ou'

    return {
        DataDimension: () => <div />,
        DynamicDimension: () => <div />,
        PeriodDimension: () => <div />,
        OrgUnitDimension: () => <div />,
        isSingleValue: () => true,
        DIMENSION_ID_DATA: dataId,
        DIMENSION_ID_PERIOD: periodId,
        DIMENSION_ID_ORGUNIT: ouId,
        getAxisMaxNumberOfItems: () => {},
        filterOutPredefinedDimensions: () => [],
        getPredefinedDimensions: () => {},
        getPredefinedDimensionProp: () => {},
    }
})

describe('The DialogManager component', () => {
    let props
    let shallowDialog

    const dialogManager = (customProps = {}) => {
        props = {
            ...props,
            ...customProps,
        }

        if (!shallowDialog) {
            shallowDialog = shallow(<DialogManager {...props} />)
        }
        return shallowDialog
    }

    beforeEach(() => {
        props = {
            dialogId: null,
            dimensions: {
                test: {},
                [DIMENSION_ID_ORGUNIT]: { name: 'Organisation units' },
                [DIMENSION_ID_DATA]: { name: 'Data' },
                [DIMENSION_ID_PERIOD]: { name: 'Period' },
            },
            dxIds: ['test'],
            ouIds: [],
            selectedItems: {
                ou: [],
                pe: [],
                dx: ['test'],
            },
            d2: {},
            metadata: {},
            changeDialog: jest.fn(),
            setRecommendedIds: jest.fn(),
            getAxisIdByDimensionId: () => {},
            dimensionIdsInLayout: [],
            getItemsByAttribute: jest.fn(),
        }
        shallowDialog = undefined
    })

    it('renders a closed dialog', () => {
        expect(dialogManager()).toMatchSnapshot()
    })

    it('should add the dialogId of fixed dimensions to state "mounted" on first time render', () => {
        const dialog = dialogManager().setProps({
            dialogId: DIMENSION_ID_ORGUNIT,
        })

        expect(dialog.state().ouMounted).toBe(true)
    })

    it('renders the DataDimension content in dialog', () => {
        const dialog = dialogManager().setProps({
            dialogId: DIMENSION_ID_DATA,
        })

        expect(dialog).toMatchSnapshot()
    })

    it('renders the OrgUnitDimension content in dialog', () => {
        const dialog = dialogManager().setProps({
            dialogId: DIMENSION_ID_ORGUNIT,
        })

        expect(dialog).toMatchSnapshot()
    })

    it('renders the PeriodDimension content in dialog', () => {
        const dialog = dialogManager().setProps({
            dialogId: DIMENSION_ID_PERIOD,
        })

        expect(dialog).toMatchSnapshot()
    })

    it('renders OUDimension content with display:none when previously mounted', () => {
        const dialog = dialogManager().setProps({
            dialogId: DIMENSION_ID_ORGUNIT,
        })

        expect(dialog).toMatchSnapshot()

        dialog.setProps({ dialogId: null })
        expect(dialog).toMatchSnapshot()

        dialog.setProps({ dialogId: DIMENSION_ID_DATA })
        expect(dialog).toMatchSnapshot()
    })

    it('sets the recommended Ids (with debounced delay) when a change in dx (Data) or ou (Organisation Unit) occurs', () => {
        const dialog = dialogManager()
        dialog.setProps({ ouIds: ['TEST_OU_ID'] })
        dialog.setProps({ ouIds: ['OTHER_ID'] })

        setTimeout(
            () => expect(props.setRecommendedIds).toHaveBeenCalledTimes(1),
            1001
        )
    })

    it('does not update recommendedIds if other selected ids are udpdated', () => {
        const dialog = dialogManager()
        dialog.setProps({ dimensionIdA: ['itemsByDimensionIdA'] })
        dialog.setProps({
            dimensionIdB: ['itemsByDimensionIdB', 'itemsByDimensionIdC'],
        })

        setTimeout(
            () => expect(props.setRecommendedIds).toHaveBeenCalledTimes(0),
            1001
        )
    })

    it('calls the changeDialog function', () => {
        const dialog = dialogManager().setProps({
            dialogId: DIMENSION_ID_DATA,
        })

        dialog.find(HideButton).simulate('click')

        expect(props.changeDialog).toHaveBeenCalledTimes(1)
    })
})
