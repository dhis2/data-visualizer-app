import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { acSetUiActiveModalDialog } from '../../actions/ui';
import { styles } from './styles/DimensionLabel.style';

export class DimensionLabel extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isDeactivated: PropTypes.bool.isRequired,
        isSelected: PropTypes.bool.isRequired,
        openDialog: PropTypes.func.isRequired,
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
    };

    onLabelClick = () => {
        if (!this.props.isDeactivated) {
            this.props.openDialog(this.props.id);
        }
    };

    onKeyPress = event => {
        if (event.key === 'Enter' && event.ctrlKey === false) {
            this.onLabelClick();
        }
    };

    render() {
        return (
            <div
                className="label"
                onClick={this.onLabelClick}
                onKeyPress={this.onKeyPress}
                tabIndex={0}
                style={styles.label}
            >
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    null,
    {
        openDialog: acSetUiActiveModalDialog,
    }
)(DimensionLabel);
