import React from 'react'
import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
} from '@dhis2/analytics'

import DefaultAxis from './DefaultAxis'
import styles from './styles/DefaultLayout.style'
import defaultAxisStyles from './styles/DefaultAxis.style'

const Layout = () => (
    <div id="layout-ct" style={styles.ct}>
        <div
            id="axis-group-1"
            style={{ ...styles.axisGroup, ...styles.axisGroupLeft }}
        >
            <DefaultAxis
                axisId={AXIS_ID_COLUMNS}
                style={{
                    ...styles.columns,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
            />
            <DefaultAxis
                axisId={AXIS_ID_ROWS}
                style={{
                    ...styles.rows,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
            />
        </div>
        <div
            id="axis-group-2"
            style={{ ...styles.axisGroup, ...styles.axisGroupRight }}
        >
            <DefaultAxis axisId={AXIS_ID_FILTERS} style={styles.filters} />
        </div>
    </div>
)

Layout.displayName = 'Layout'

export default Layout
