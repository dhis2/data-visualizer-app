import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chip from '../Chip'
import { sGetUi, sGetUiLayout } from '../../../reducers/ui'
import { acSetUiActiveModalDialog } from '../../../actions/ui'
import styles from './styles/ScatterAxis.style'
import { AXIS_ID_COLUMNS } from '@dhis2/analytics'

class Axis extends React.Component {
    render() {
        const { axis, axisId, label, style, getOpenHandler, items } = this.props

        return (
            <div
                id={label}
                data-test={`${label}-axis`}
                style={{ ...styles.axisContainer, ...style }}
                onDragOver={this.onDragOver}
            >
                <div style={styles.label}>{label}</div>
                {axis.map(dimensionId => {
                    const key = `${axisId}-${label}-${dimensionId}`
                    return (
                        <div key={key}>
                            <Chip
                                axisId={AXIS_ID_COLUMNS}
                                axisName={label}
                                onClick={getOpenHandler(dimensionId)}
                                dimensionId={dimensionId}
                                items={items}
                                isLocked={true}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}

Axis.propTypes = {
    axis: PropTypes.array,
    axisId: PropTypes.string,
    getOpenHandler: PropTypes.func,
    items: PropTypes.array,
    label: PropTypes.string,
    style: PropTypes.object,
}

const mapStateToProps = state => ({
    ui: sGetUi(state),
    layout: sGetUiLayout(state),
})

const mapDispatchToProps = dispatch => ({
    getOpenHandler: dimensionId => () =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    axis: stateProps.ui.layout[ownProps.axisId],
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Axis)
