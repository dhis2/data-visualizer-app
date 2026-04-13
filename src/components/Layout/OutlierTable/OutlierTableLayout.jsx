import { AXIS_ID_COLUMNS } from '@dhis2/analytics'
import React from 'react'
import DefaultAxis from '../DefaultLayout/DefaultAxis.jsx'
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style.js'

const Layout = () => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <DefaultAxis
            axisId={AXIS_ID_COLUMNS}
            style={defaultLayoutStyles.firstAxis}
        />
    </div>
)

Layout.displayName = 'Layout'

export default Layout
