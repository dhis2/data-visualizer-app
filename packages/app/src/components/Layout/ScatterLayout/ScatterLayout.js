import React from 'react'
import { AXIS_ID_COLUMNS, AXIS_ID_FILTERS } from '@dhis2/analytics'

import DefaultAxis from '../DefaultLayout/DefaultAxis'
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style'
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style'
import scatterLayoutStyles from './styles/ScatterLayout.style'

const Layout = () => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <div
            id="axis-group-1"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...scatterLayoutStyles.axisGroupLeft,
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
        <div
            id="axis-group-2"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...scatterLayoutStyles.axisGroupRight,
            }}
        >
            <DefaultAxis
                axisId={AXIS_ID_FILTERS}
                style={defaultLayoutStyles.filters}
            />
        </div>
    </div>
)

export default Layout
