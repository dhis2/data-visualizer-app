import {
    AboutAOUnit,
    InterpretationsUnit,
    useCachedDataQuery,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import { stringify } from 'query-string'
import React from 'react'
import { connect } from 'react-redux'
import history from '../../modules/history.js'
import { sGetCurrent } from '../../reducers/current.js'
import { sGetLoadError } from '../../reducers/loader.js'
import classes from './styles/DetailsPanel.module.css'

const navigateToOpenModal = (interpretationId, initialFocus) => {
    history.push(
        {
            pathName: history.location.pathname,
            search: `?${stringify({ interpretationId, initialFocus })}`,
        },
        { isModalOpening: true }
    )
}

const DetailsPanel = ({
    interpretationsUnitRef,
    visualization,
    disabled,
    aboutAORenderCount,
}) => {
    const { currentUser } = useCachedDataQuery()

    return (
        <div className={classes.panel} data-test="details-panel">
            <AboutAOUnit
                type="visualization"
                id={visualization.id}
                renderId={aboutAORenderCount}
            />
            <InterpretationsUnit
                ref={interpretationsUnitRef}
                type="visualization"
                id={visualization.id}
                currentUser={currentUser}
                onInterpretationClick={(interpretationId) =>
                    navigateToOpenModal(interpretationId)
                }
                onReplyIconClick={(interpretationId) =>
                    navigateToOpenModal(interpretationId, true)
                }
                disabled={disabled}
            />
        </div>
    )
}

DetailsPanel.propTypes = {
    aboutAORenderCount: PropTypes.number.isRequired,
    interpretationsUnitRef: PropTypes.object.isRequired,
    visualization: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    visualization: sGetCurrent(state),
    disabled: !!sGetLoadError(state),
})

export default connect(mapStateToProps)(DetailsPanel)
