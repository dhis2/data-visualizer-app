import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Close from '@material-ui/icons/Close';
import {
    acRemoveUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../actions/ui';
import { sGetUiLayout } from '../../reducers/ui';

import { styles } from './styles/DimensionLabel.style';

export const RemoveDimensionButton = ({ action }) => (
    <button style={styles.deleteButton} onClick={action} tabIndex={0}>
        <Close style={styles.deleteButtonIcon} />
    </button>
);

export class DimensionLabel extends Component {
    static propTypes = {
        openDialog: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isSelected: PropTypes.bool.isRequired,
        isDeactivated: PropTypes.bool.isRequired,
        removeDimension: PropTypes.func.isRequired,
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
    };

    onLabelClick = () => {
        this.props.openDialog(this.props.id);
    };

    onKeyPress = event => {
        if (event.key === 'Enter' && event.ctrlKey === false) {
            this.onLabelClick();
        }
    };

    renderLabel = () => (
        <div
            className="label"
            onClick={this.onLabelClick}
            onKeyPress={this.onKeyPress}
            tabIndex={0}
            style={styles.unselected}
        >
            {this.props.children}
        </div>
    );

    render = () => {
        const Label = this.renderLabel();

        const containerStyle =
            this.props.isSelected && !this.props.isDeactivated
                ? styles.selected
                : styles.unselected;

        return (
            <div className="labelContainer" style={containerStyle}>
                {Label}
            </div>
        );
    };
}

const mapStateToProps = state => ({
    currentLayout: sGetUiLayout(state),
});

export default connect(
    mapStateToProps,
    {
        openDialog: id => acSetUiActiveModalDialog(id),
        removeDimension: id => acRemoveUiLayoutDimensions(id),
    }
)(DimensionLabel);
