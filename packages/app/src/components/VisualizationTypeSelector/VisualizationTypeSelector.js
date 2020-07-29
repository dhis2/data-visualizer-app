import React, { useState, createRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { visTypeDisplayNames } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Card, Divider, Popper } from '@dhis2/ui'

import { prepareCurrentAnalyticalObject } from '../../modules/currentAnalyticalObject'
import { getAdaptedUiByType } from '../../modules/ui'
import { sGetUi, sGetUiType, sGetUiOptions } from '../../reducers/ui'
import { sGetCurrent } from '../../reducers/current'
import { sGetMetadata } from '../../reducers/metadata'
import { acSetUi, acSetUiOptions } from '../../actions/ui'
import {
    apiSaveAOInUserDataStore,
    CURRENT_AO_KEY,
} from '../../api/userDataStore'

import VisualizationTypeListItem from './VisualizationTypeListItem'
import ListItemIcon from './ListItemIcon'
import styles from './styles/VisualizationTypeSelector.module.css'

export const MAPS_APP_URL = 'dhis-web-maps'

export const VisualizationTypeSelector = (
    { visualizationType, ui, setUi, resetSeriesTypes, current, metadata },
    context
) => {
    const baseUrl = context.baseUrl

    const [listIsOpen, setListIsOpen] = useState(false)

    const toggleList = () => setListIsOpen(!listIsOpen)

    const handleListItemClick = type => () => {
        setUi(getAdaptedUiByType({ ...ui, type }))
        resetSeriesTypes()
        toggleList()
    }

    const handleOpenAsMapClick = async event => {
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

    const getVisTypes = () => Object.keys(visTypeDisplayNames)

    const VisTypesList = (
        <Card>
            <div className={styles.listContainer}>
                {getVisTypes().map(type => (
                    <VisualizationTypeListItem
                        key={type}
                        iconType={type}
                        label={visTypeDisplayNames[type]}
                        isSelected={type === visualizationType}
                        onClick={handleListItemClick(type)}
                    />
                ))}
                <Divider />
                <VisualizationTypeListItem
                    key={'MAP'}
                    iconType={'MAP'}
                    label={i18n.t('Open as Map')} // TODO: Open as: Map when i18next nsSeparator fixed
                    onClick={handleOpenAsMapClick}
                    disabled={!current}
                />
            </div>
        </Card>
    )

    const buttonRef = createRef()

    return (
        <>
            <div onClick={toggleList} ref={buttonRef} className={styles.button}>
                <ListItemIcon iconType={visualizationType} />
                <span>{visTypeDisplayNames[visualizationType]}</span>
                <ArrowDropDownIcon style={{ marginLeft: 'auto' }} />
            </div>
            {listIsOpen &&
                createPortal(
                    <div onClick={toggleList} className={styles.backdrop}>
                        <Popper reference={buttonRef} placement="bottom-start">
                            <div className={styles.cardContainer}>
                                {VisTypesList}
                            </div>
                        </Popper>
                    </div>,
                    document.body
                )}
        </>
    )
}

VisualizationTypeSelector.propTypes = {
    current: PropTypes.object,
    metadata: PropTypes.object,
    resetSeriesTypes: PropTypes.func,
    setUi: PropTypes.func,
    ui: PropTypes.object,
    visualizationType: PropTypes.oneOf(Object.keys(visTypeDisplayNames)),
}

VisualizationTypeSelector.contextTypes = {
    baseUrl: PropTypes.string,
}

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    current: sGetCurrent(state),
    metadata: sGetMetadata(state),
    ui: sGetUi(state),
})

const mapDispatchToProps = {
    setUi: ui => dispatch => dispatch(acSetUi(ui)),
    resetSeriesTypes: () => (dispatch, getState) => {
        const series = sGetUiOptions(getState()).series
        series.map(item => {
            const tempItem = { ...item }
            if (tempItem.type) {
                delete tempItem.type
            }
            return tempItem
        })
        dispatch(acSetUiOptions({ series }))
    },
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisualizationTypeSelector)
