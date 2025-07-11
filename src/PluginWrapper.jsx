import { DashboardPluginWrapper } from '@dhis2/analytics'
import debounce from 'lodash-es/debounce'
import React, { useLayoutEffect, useState } from 'react'
import { VisualizationPluginWrapper } from './components/VisualizationPlugin/VisualizationPluginWrapper.jsx'
import './locales/index.js'

const PluginWrapper = (props) => {
    const [renderId, setRenderId] = useState(null)

    useLayoutEffect(() => {
        const updateRenderId = debounce(
            () =>
                setRenderId((renderId) =>
                    typeof renderId === 'number' ? renderId + 1 : 1
                ),
            300
        )

        window.addEventListener('resize', updateRenderId)

        return () => window.removeEventListener('resize', updateRenderId)
    }, [])

    return (
        <DashboardPluginWrapper {...props}>
            {(props) => {
                return <VisualizationPluginWrapper id={renderId} {...props} />
            }}
        </DashboardPluginWrapper>
    )
}

export default PluginWrapper
