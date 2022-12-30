import { InterpretationModal as AnalyticsInterpretationModal } from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { sGetCurrent } from '../../reducers/current.js'
import { ModalDownloadDropdown } from '../DownloadMenu/index.js'
import { VisualizationPlugin } from '../VisualizationPlugin/VisualizationPlugin.js'
import {
    useInterpretationQueryParams,
    removeInterpretationQueryParams,
} from './interpretationIdQueryParam.js'

const InterpretationModal = ({ onInterpretationUpdate }, context) => {
    const { interpretationId, initialFocus } = useInterpretationQueryParams()
    const [isVisualizationLoading, setIsVisualizationLoading] = useState(false)
    const visualization = useSelector(sGetCurrent)

    useEffect(() => {
        setIsVisualizationLoading(!!interpretationId)
    }, [interpretationId])

    return interpretationId ? (
        <AnalyticsInterpretationModal
            currentUser={context.d2.currentUser}
            onInterpretationUpdate={onInterpretationUpdate}
            initialFocus={initialFocus}
            interpretationId={interpretationId}
            isVisualizationLoading={isVisualizationLoading}
            onClose={removeInterpretationQueryParams}
            onResponsesReceived={() => setIsVisualizationLoading(false)}
            visualization={visualization}
            downloadMenuComponent={ModalDownloadDropdown}
            pluginComponent={VisualizationPlugin}
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
