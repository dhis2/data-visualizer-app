import { AXIS_ID_COLUMNS } from '@dhis2/analytics'
import React from 'react'
import DefaultAxis from '../DefaultLayout/DefaultAxis.js'
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style.js'
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style.js'
import outlierTableLayoutStyles from './styles/OutlierTableLayout.style.js'

const Layout = () => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <div
            id="axis-group-1"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...outlierTableLayoutStyles.axisGroupLeft,
            }}
        >
            <DefaultAxis
                axisId={AXIS_ID_COLUMNS}
                style={{
                    ...defaultLayoutStyles.filters,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
            />
        </div>
    </div>
)

Layout.displayName = 'Layout'

export default Layout
