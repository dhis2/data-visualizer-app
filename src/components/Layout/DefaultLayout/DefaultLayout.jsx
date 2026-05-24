import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
} from '@dhis2/analytics'
import React from 'react'
import DefaultAxis from './DefaultAxis.jsx'
import styles from './styles/DefaultLayout.style.js'

const Layout = () => (
    <div id="layout-ct" style={styles.ct}>
        <DefaultAxis axisId={AXIS_ID_COLUMNS} style={styles.firstAxis} />
        <DefaultAxis axisId={AXIS_ID_ROWS} style={styles.axis} />
        <DefaultAxis axisId={AXIS_ID_FILTERS} style={styles.axis} />
    </div>
)

Layout.displayName = 'Layout'

export default Layout
