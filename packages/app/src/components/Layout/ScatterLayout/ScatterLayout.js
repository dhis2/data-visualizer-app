import React from 'react'
import { connect } from 'react-redux'
import {
    AXIS_ID_COLUMNS,
    AXIS_ID_FILTERS,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { sGetUiItemsByAttribute } from '../../../reducers/ui'
import DefaultAxis from '../DefaultLayout/DefaultAxis'
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style'
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style'
import ScatterAxis from './ScatterAxis'
import scatterLayoutStyles from './styles/ScatterLayout.style'

const Layout = ({ verticalItems, horizontalItems }) => (
    <div id="layout-ct" style={defaultLayoutStyles.ct}>
        <div
            id="axis-group-1"
            style={{
                ...defaultLayoutStyles.axisGroup,
                ...scatterLayoutStyles.axisGroupLeft,
            }}
        >
            <ScatterAxis
                style={{
                    ...defaultLayoutStyles.filters,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
                axisId={AXIS_ID_COLUMNS}
                items={verticalItems}
                label={i18n.t('Vertical')}
            />
            <ScatterAxis
                style={defaultLayoutStyles.filters}
                axisId={AXIS_ID_COLUMNS}
                items={horizontalItems}
                label={i18n.t('Horizontal')}
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
                axisId={AXIS_ID_ROWS}
                style={{
                    ...defaultLayoutStyles.filters,
                    ...defaultAxisStyles.axisContainerLeft,
                }}
            />
            <DefaultAxis
                axisId={AXIS_ID_FILTERS}
                style={defaultLayoutStyles.filters}
            />
        </div>
    </div>
)

Layout.propTypes = {
    horizontalItems: PropTypes.array,
    verticalItems: PropTypes.array,
}

const mapStateToProps = state => ({
    verticalItems: sGetUiItemsByAttribute(state, 'VERTICAL'),
    horizontalItems: sGetUiItemsByAttribute(state, 'HORIZONTAL'),
})

export default connect(mapStateToProps)(Layout)
