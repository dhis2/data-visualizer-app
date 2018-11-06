import React from 'react';
import PropTypes from 'prop-types';
import InterpretationsComponent from '@dhis2/d2-ui-interpretations';

import styles from './styles/Interpretations.style';

const Interpretations = ({ type, id }, context) => {
    return id ? (
        <div style={styles.container}>
            <InterpretationsComponent id={id} d2={context.d2} type={type} />
        </div>
    ) : null;
};

Interpretations.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
};

Interpretations.contextTypes = {
    d2: PropTypes.object,
};

export default Interpretations;
