import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InterpretationsComponent from '@dhis2/d2-ui-interpretations';

import { sGetUiInterpretation } from '../../reducers/ui';
import {
    acSetUiInterpretation,
    acClearUiInterpretation,
} from '../../actions/ui';

import styles from './styles/Interpretations.style';

export class Interpretations extends Component {
    onInterpretationChange = interpretation => {
        if (interpretation) {
            this.props.acSetUiInterpretation(interpretation);
        } else {
            this.props.acClearUiInterpretation();
        }
    };

    render() {
        const { type, id, interpretationId } = this.props;

        return id ? (
            <div style={styles.container}>
                <InterpretationsComponent
                    d2={this.context.d2}
                    type={type}
                    id={id}
                    currentInterpretationId={interpretationId}
                    onCurrentInterpretationChange={this.onInterpretationChange}
                />
            </div>
        ) : null;
    }
}

Interpretations.defaultProps = {
    type: 'chart',
};

Interpretations.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    interpretationId: PropTypes.string,
};

Interpretations.contextTypes = {
    d2: PropTypes.object,
};

const mapStateToProps = state => ({
    interpretationId: sGetUiInterpretation(state).id || null,
});

export default connect(
    mapStateToProps,
    {
        acSetUiInterpretation,
        acClearUiInterpretation,
    }
)(Interpretations);
