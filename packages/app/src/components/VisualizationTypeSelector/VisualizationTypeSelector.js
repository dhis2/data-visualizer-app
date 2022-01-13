import { visTypeDisplayNames } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Divider, Popper, Layer } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, createRef } from 'react'
import { connect } from 'react-redux'
import { acSetUi, acClearSeriesType } from '../../actions/ui.js'
import {
    apiSaveAOInUserDataStore,
    CURRENT_AO_KEY,
} from '../../api/userDataStore.js'
import ArrowDown from '../../assets/ArrowDown.js'
import { prepareCurrentAnalyticalObject } from '../../modules/currentAnalyticalObject.js'
import { getAdaptedUiByType } from '../../modules/ui.js'
import { visTypes, visTypeDescriptions } from '../../modules/visualization.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetMetadata } from '../../reducers/metadata.js'
import { sGetUi, sGetUiType } from '../../reducers/ui.js'
import ListItemIcon from './ListItemIcon.js'
import styles from './styles/VisualizationTypeSelector.module.css'
import VisualizationTypeListItem from './VisualizationTypeListItem.js'

export const MAPS_APP_URL = 'dhis-web-maps'

const UnconnectedVisualizationTypeSelector = (
    { visualizationType, ui, setUi, onItemClick, current, metadata },
    context
) => {
    const baseUrl = context.baseUrl

    const [listIsOpen, setListIsOpen] = useState(false)

    const toggleList = () => setListIsOpen(!listIsOpen)

    const handleListItemClick = (type) => () => {
        setUi(getAdaptedUiByType({ ...ui, type }))
        onItemClick()
        toggleList()
    }

    const handleOpenAsMapClick = async (event) => {
        if (!current) {
            event.stopPropagation()
            return
        }

        const currentAnalyticalObject = prepareCurrentAnalyticalObject(
            current,
            metadata,
            ui
        )

        await apiSaveAOInUserDataStore(currentAnalyticalObject)

        window.location.href = `${baseUrl}/${MAPS_APP_URL}?${CURRENT_AO_KEY}=true`
    }

    const VisTypesList = (
        <div data-test="visualization-type-selector-card">
            <div className={styles.listContainer}>
                <div className={styles.listSection}>
                    {visTypes.map(({ type }) => (
                        <VisualizationTypeListItem
                            key={type}
                            iconType={type}
                            label={visTypeDisplayNames[type]}
                            description={visTypeDescriptions[type]}
                            isSelected={type === visualizationType}
                            onClick={handleListItemClick(type)}
                        />
                    ))}
                </div>
                <Divider />
                <div className={styles.listSection}>
                    <VisualizationTypeListItem
                        key={'MAP'}
                        iconType={'MAP'}
                        label={i18n.t('Open as Map')} // TODO: Open as: Map when i18next nsSeparator fixed
                        description={i18n.t(
                            'Visually plot data on a world map. Data elements use separate map layers.'
                        )}
                        onClick={handleOpenAsMapClick}
                        disabled={!current}
                    />
                </div>
            </div>
        </div>
    )

    const buttonRef = createRef()

    return (
        <>
            <div
                onClick={toggleList}
                ref={buttonRef}
                className={styles.button}
                data-test={'visualization-type-selector-button'}
            >
                <ListItemIcon iconType={visualizationType} />
                <span data-test="visualization-type-selector-currently-selected-text">
                    {visTypeDisplayNames[visualizationType]}
                </span>
                <span className={styles.arrowIcon}>
                    <ArrowDown />
                </span>
            </div>
            {listIsOpen && (
                <Layer onClick={toggleList}>
                    <Popper reference={buttonRef} placement="bottom-start">
                        <div className={styles.cardContainer}>
                            {VisTypesList}
                        </div>
                    </Popper>
                </Layer>
            )}
        </>
    )
}

UnconnectedVisualizationTypeSelector.propTypes = {
    current: PropTypes.object,
    metadata: PropTypes.object,
    setUi: PropTypes.func,
    ui: PropTypes.object,
    visualizationType: PropTypes.oneOf(Object.keys(visTypeDisplayNames)),
    onItemClick: PropTypes.func,
}

UnconnectedVisualizationTypeSelector.contextTypes = {
    baseUrl: PropTypes.string,
}

const mapStateToProps = (state) => ({
    visualizationType: sGetUiType(state),
    current: sGetCurrent(state),
    metadata: sGetMetadata(state),
    ui: sGetUi(state),
})

const mapDispatchToProps = (dispatch) => ({
    setUi: (ui) => dispatch(acSetUi(ui)),
    onItemClick: () => dispatch(acClearSeriesType()),
})

export const VisualizationTypeSelector = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedVisualizationTypeSelector)
