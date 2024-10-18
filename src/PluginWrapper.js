import { DashboardPluginWrapper } from '@dhis2/analytics'
import debounce from 'lodash-es/debounce'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { VisualizationPluginWrapper } from './components/VisualizationPlugin/VisualizationPluginWrapper.js'
import './locales/index.js'

const PluginWrapper = (props) => {
    const [propsFromParent, setPropsFromParent] = useState(props)
    const [renderId, setRenderId] = useState(null)

    useEffect(() => setPropsFromParent(props), [props])

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
        <DashboardPluginWrapper {...propsFromParent}>
            {(props) => {
                return <VisualizationPluginWrapper id={renderId} {...props} />
            }}
        </DashboardPluginWrapper>
    )
}

export default PluginWrapper
