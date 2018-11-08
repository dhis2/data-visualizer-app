import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InterpretationsComponent from '@dhis2/d2-ui-interpretations';

import { sGetUiInterpretation } from '../../reducers/ui';
import {
    acSetUiInterpretation,
    acClearUiInterpretation,
} from '../../actions/ui';
import history from '../../modules/history';

import styles from './styles/Interpretations.style';

export class Interpretations extends Component {
    onInterpretationChange = interpretation => {
        if (interpretation) {
            const interpretationUrl = `/${this.props.id}/interpretation/${
                interpretation.id
            }`;

            // this covers the case when the URL contains already an interpretation id,
            // the Interpretations component loads it and fires this callback passing the interpretation
            // object, the URL is not changing in this case.
            // the other scenario is when the URL changes because of a click inside the Interpretations component
            if (history.location.pathname !== interpretationUrl) {
                history.push(interpretationUrl);
            }

            const d = new Date(interpretation.created);
            const created = [
                d.getFullYear(),
                ('0' + (d.getMonth() + 1)).slice(-2),
                ('0' + d.getDate()).slice(-2),
            ].join('-');

            this.props.acSetUiInterpretation({
                id: interpretation.id,
                created,
            });
        } else {
            // no interpretation selected
            history.push(`/${this.props.id}`);
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
