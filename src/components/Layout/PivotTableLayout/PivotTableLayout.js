import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    AXIS_ID_FILTERS,
} from '@dhis2/analytics'
import React from 'react'
import DefaultAxis from '../DefaultLayout/DefaultAxis.js'
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style.js'
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style.js'
import pivotTableLayoutStyles from './styles/PivotTableLayout.style.js'

const Layout = () => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <div
            id="axis-group-1"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...pivotTableLayoutStyles.axisGroupLeft,
            }}
        >
            <DefaultAxis
                axisId={AXIS_ID_COLUMNS}
                style={{
                    ...defaultLayoutStyles.columns,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
            />
            <DefaultAxis
                axisId={AXIS_ID_ROWS}
                style={{
                    ...defaultLayoutStyles.rows,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
            />
        </div>
        <div
            id="axis-group-2"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...pivotTableLayoutStyles.axisGroupRight,
            }}
        >
            <DefaultAxis
                axisId={AXIS_ID_FILTERS}
                style={defaultLayoutStyles.filters}
            />
        </div>
    </div>
)

Layout.displayName = 'Layout'

export default Layout
