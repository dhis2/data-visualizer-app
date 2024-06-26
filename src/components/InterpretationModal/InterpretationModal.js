import { InterpretationModal as AnalyticsInterpretationModal } from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { sGetVisualization } from '../../reducers/visualization.js'
import { ModalDownloadDropdown } from '../DownloadMenu/index.js'
import { VisualizationPluginWrapper } from '../VisualizationPlugin/VisualizationPluginWrapper.js'
import {
    useInterpretationQueryParams,
    removeInterpretationQueryParams,
} from './interpretationIdQueryParam.js'

const InterpretationModal = ({ onInterpretationUpdate }, context) => {
    const { interpretationId, initialFocus } = useInterpretationQueryParams()
    const [isVisualizationLoading, setIsVisualizationLoading] = useState(false)
    const visualization = useSelector(sGetVisualization)

    useEffect(() => {
        setIsVisualizationLoading(!!interpretationId)
    }, [interpretationId])

    const onResponsesReceived = useCallback(() => {
        setIsVisualizationLoading(false)
    }, [])

    return interpretationId ? (
        <AnalyticsInterpretationModal
            currentUser={context.d2.currentUser}
            onInterpretationUpdate={onInterpretationUpdate}
            initialFocus={initialFocus}
            interpretationId={interpretationId}
            isVisualizationLoading={isVisualizationLoading}
            onClose={removeInterpretationQueryParams}
            onResponsesReceived={onResponsesReceived}
            visualization={visualization}
            downloadMenuComponent={ModalDownloadDropdown}
            pluginComponent={VisualizationPluginWrapper}
        />
    ) : null
}

InterpretationModal.contextTypes = {
    d2: PropTypes.object,
}

InterpretationModal.propTypes = {
    onInterpretationUpdate: PropTypes.func.isRequired,
}

export { InterpretationModal }
