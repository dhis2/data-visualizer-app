import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InterpretationsComponent from '@dhis2/d2-ui-interpretations';

export class Interpretations extends Component {
    constructor(props, context) {
        super(props);

        this.d2 = context.d2;
    }

    render = () => {
        return this.props.id ? (
            <InterpretationsComponent
                id={this.props.id}
                d2={this.d2}
                type="chart"
            />
        ) : null;
    };
}

Interpretations.contextTypes = {
    d2: PropTypes.object,
};

export default Interpretations;
