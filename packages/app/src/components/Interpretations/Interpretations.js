import InterpretationsComponent from '@dhis2/d2-ui-interpretations'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    acSetUiInterpretation,
    acClearUiInterpretation,
} from '../../actions/ui.js'
import history from '../../modules/history.js'
import { sGetUiInterpretation } from '../../reducers/ui.js'
import styles from './styles/Interpretations.style.js'

export class UnconnectedInterpretations extends Component {
    onInterpretationChange = (interpretation) => {
        if (interpretation) {
            const interpretationUrl = `/${this.props.id}/interpretation/${interpretation.id}`

            // this covers the case when the URL contains already an interpretation id,
            // the Interpretations component loads it and fires this callback passing the interpretation
            // object, the URL is not changing in this case.
            // the other scenario is when the URL changes because of a click inside the Interpretations component
            if (history.location.pathname !== interpretationUrl) {
                history.push(interpretationUrl)

                this.props.acSetUiInterpretation({
                    id: interpretation.id,
                    created: interpretation.created,
                })
            }
        } else {
            history.push(`/${this.props.id}`)
        }
    }

    render() {
        const { type, id, interpretationId } = this.props

        return id ? (
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <InterpretationsComponent
                        d2={this.context.d2}
                        type={type}
                        id={id}
                        currentInterpretationId={interpretationId}
                        onCurrentInterpretationChange={
                            this.onInterpretationChange
                        }
                    />
                </div>
            </div>
        ) : null
    }
}

UnconnectedInterpretations.defaultProps = {
    type: 'chart',
}

UnconnectedInterpretations.propTypes = {
    acSetUiInterpretation: PropTypes.func,
    id: PropTypes.string,
    interpretationId: PropTypes.string,
    type: PropTypes.string,
}

UnconnectedInterpretations.contextTypes = {
    d2: PropTypes.object,
}

const mapStateToProps = (state) => ({
    interpretationId: sGetUiInterpretation(state).id || null,
})

export const Interpretations = connect(mapStateToProps, {
    acSetUiInterpretation,
    acClearUiInterpretation,
})(UnconnectedInterpretations)
