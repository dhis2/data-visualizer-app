import { AXIS_ID_FILTERS, AXIS_ID_ROWS } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {
    ITEM_ATTRIBUTE_HORIZONTAL,
    ITEM_ATTRIBUTE_VERTICAL,
} from '../../../modules/ui.js'
import { sGetUiItemsByAttribute } from '../../../reducers/ui.js'
import DefaultAxis from '../DefaultLayout/DefaultAxis.jsx'
import defaultAxisStyles from '../DefaultLayout/styles/DefaultAxis.style.js'
import defaultLayoutStyles from '../DefaultLayout/styles/DefaultLayout.style.js'
import ScatterAxis from './ScatterAxis.jsx'
import scatterLayoutStyles from './styles/ScatterLayout.style.js'

const Layout = ({ getItemsByAttribute }) => (
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
                itemAttribute={ITEM_ATTRIBUTE_VERTICAL}
                items={getItemsByAttribute(ITEM_ATTRIBUTE_VERTICAL)}
                label={i18n.t('Vertical')}
            />
            <ScatterAxis
                style={defaultLayoutStyles.filters}
                itemAttribute={ITEM_ATTRIBUTE_HORIZONTAL}
                items={getItemsByAttribute(ITEM_ATTRIBUTE_HORIZONTAL)}
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
    getItemsByAttribute: PropTypes.func,
}

const mapStateToProps = (state) => ({
    getItemsByAttribute: (attribute) =>
        sGetUiItemsByAttribute(state, attribute),
})

export default connect(mapStateToProps)(Layout)
