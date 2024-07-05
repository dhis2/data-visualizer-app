import {
    DimensionMenu,
    DIMENSION_ID_ASSIGNED_CATEGORIES,
    DIMENSION_ID_DATA,
    VIS_TYPE_SCATTER,
    useCachedDataQuery,
} from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import { Layer, Popper } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    acSetUiActiveModalDialog,
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../actions/ui.js'
import { ITEM_ATTRIBUTE_VERTICAL } from '../../modules/ui.js'
import { DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY } from '../../modules/userSettings.js'
import * as fromReducers from '../../reducers/index.js'
import { default as DialogManager } from './Dialogs/DialogManager.js'
import { default as DndDimensionsPanel } from './DndDimensionsPanel.js'
import { styles } from './styles/DimensionsPanel.style.js'

export const Dimensions = ({
    assignedCategoriesItemHandler,
    axisItemHandler,
    getCurrentAxisId,
    itemsByDimension,
    layoutHasAssignedCategories,
    removeItemHandler,
    ui,
    onDimensionClick,
}) => {
    const dataEngine = useDataEngine()
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [dimensionId, setDimensionId] = useState(null)
    const [ref, setRef] = useState()

    const { rootOrgUnits, systemSettings, currentUser } = useCachedDataQuery()

    const toggleMenu = () => {
        if (menuIsOpen) {
            setDimensionId(null)
            setRef(null)
        }
        setMenuIsOpen(!menuIsOpen)
    }

    const openOptionsMenuForDimension = (event, id, ref) => {
        event.stopPropagation()
        setRef(ref.current)
        setDimensionId(id)
        toggleMenu()
    }

    const openDimensionModal = (id) =>
        onDimensionClick(
            ui.type === VIS_TYPE_SCATTER && id === DIMENSION_ID_DATA
                ? ITEM_ATTRIBUTE_VERTICAL
                : id
        )

    const getNumberOfDimensionItems = () =>
        (itemsByDimension[dimensionId] || []).length

    return (
        <div style={styles.divContainer}>
            <DndDimensionsPanel
                onDimensionClick={openDimensionModal}
                onDimensionOptionsClick={openOptionsMenuForDimension}
            />
            {menuIsOpen && dimensionId && ref && (
                <Layer onClick={toggleMenu}>
                    <Popper reference={ref} placement="bottom-start">
                        <DimensionMenu
                            dimensionId={dimensionId}
                            currentAxisId={getCurrentAxisId(dimensionId)}
                            visType={ui.type}
                            numberOfDimensionItems={getNumberOfDimensionItems()}
                            isAssignedCategoriesInLayout={
                                layoutHasAssignedCategories
                            }
                            assignedCategoriesItemHandler={(destination) =>
                                assignedCategoriesItemHandler(
                                    layoutHasAssignedCategories,
                                    destination
                                )
                            }
                            axisItemHandler={axisItemHandler}
                            removeItemHandler={removeItemHandler}
                            onClose={toggleMenu}
                            dataTest={'dimensions-panel-dimension-menu'}
                        />
                    </Popper>
                </Layer>
            )}
            <DialogManager
                dataEngine={dataEngine}
                settings={systemSettings}
                displayNameProperty={
                    currentUser.settings[
                        DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY
                    ]
                }
                rootOrgUnits={rootOrgUnits}
            />
        </div>
    )
}

Dimensions.propTypes = {
    assignedCategoriesItemHandler: PropTypes.func,
    axisItemHandler: PropTypes.func,
    getCurrentAxisId: PropTypes.func,
    itemsByDimension: PropTypes.object,
    layoutHasAssignedCategories: PropTypes.bool,
    removeItemHandler: PropTypes.func,
    ui: PropTypes.object,
    onDimensionClick: PropTypes.func,
}

const mapStateToProps = (state) => ({
    ui: fromReducers.fromUi.sGetUi(state),
    dimensions: fromReducers.fromDimensions.sGetDimensions(state),
    layout: fromReducers.fromUi.sGetUiLayout(state),
    itemsByDimension: fromReducers.fromUi.sGetUiItems(state),
    layoutHasAssignedCategories:
        fromReducers.fromUi.sLayoutHasAssignedCategories(state),
    getCurrentAxisId: (dimensionId) =>
        fromReducers.fromUi.sGetAxisIdByDimensionId(state, dimensionId),
})

const mapDispatchToProps = (dispatch) => ({
    axisItemHandler: ({
        dimensionId,
        axisId,
        numberOfDimensionItems,
        requireItems,
        isDimensionInLayout,
    }) => {
        dispatch(acAddUiLayoutDimensions({ [dimensionId]: { axisId } }))

        if (
            numberOfDimensionItems === 0 &&
            requireItems &&
            !isDimensionInLayout
        ) {
            dispatch(acSetUiActiveModalDialog(dimensionId))
        }
    },
    removeItemHandler: (dimensionId) => {
        dispatch(acRemoveUiLayoutDimensions(dimensionId))
    },
    assignedCategoriesItemHandler: (layoutHasAssignedCategories, axisId) => {
        dispatch(
            layoutHasAssignedCategories
                ? acRemoveUiLayoutDimensions(DIMENSION_ID_ASSIGNED_CATEGORIES)
                : acAddUiLayoutDimensions({
                      [DIMENSION_ID_ASSIGNED_CATEGORIES]: { axisId },
                  })
        )
    },
    onDimensionClick: (id) => dispatch(acSetUiActiveModalDialog(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions)
