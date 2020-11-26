import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chip from '../Chip'
import { sGetUi, sGetUiLayout } from '../../../reducers/ui'
import { acSetUiActiveModalDialog } from '../../../actions/ui'
import styles from './styles/ScatterAxis.style'
import { AXIS_ID_COLUMNS, DIMENSION_ID_DATA } from '@dhis2/analytics'

class Axis extends React.Component {
    render() {
        const {
            label,
            style,
            getOpenHandler,
            items,
            itemAttribute,
        } = this.props

        return (
            <div
                id={label}
                data-test={`${label}-axis`}
                style={{ ...styles.axisContainer, ...style }}
                onDragOver={this.onDragOver}
            >
                <div style={styles.label}>{label}</div>
                <Chip
                    axisId={AXIS_ID_COLUMNS}
                    axisName={label}
                    onClick={getOpenHandler(itemAttribute)}
                    dimensionId={DIMENSION_ID_DATA}
                    items={items}
                    isLocked={true}
                />
            </div>
        )
    }
}

Axis.propTypes = {
    getOpenHandler: PropTypes.func,
    itemAttribute: PropTypes.string,
    items: PropTypes.array,
    label: PropTypes.string,
    style: PropTypes.object,
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
    layout: sGetUiLayout(state),
})

const mapDispatchToProps = dispatch => ({
    getOpenHandler: dialogId => () =>
        dispatch(acSetUiActiveModalDialog(dialogId)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Axis)
