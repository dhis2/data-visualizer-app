import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Close from '@material-ui/icons/Close';
import { acRemoveUiLayoutDimensions } from '../../actions/ui';
import { styles } from './styles/DimensionLabel.style';

export const RemoveDimensionButton = ({ action }) => {
    return (
        <button style={styles.deleteButton} onClick={action} tabIndex={0}>
            <Close style={styles.deleteButtonIcon} />
        </button>
    );
};

export class DimensionLabel extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        isSelected: PropTypes.bool.isRequired,
        toggleDialog: PropTypes.func.isRequired,
        onRemoveDimension: PropTypes.func.isRequired,
        Icon: PropTypes.element,
        Label: PropTypes.element,
    };

    onLabelClick = () => {
        this.props.toggleDialog(this.props.id);
    };

    onKeyPress = event => {
        if (event.key === 'Enter' && event.ctrlKey === false) {
            this.onLabelClick();
        }
    };

    removeDimension = () => {
        this.props.onRemoveDimension(this.props.id);
    };

    renderRemoveButton = () => {
        return this.props.isSelected ? (
            <RemoveDimensionButton action={this.removeDimension} />
        ) : null;
    };

    renderLabel = () => {
        return (
            <div
                onClick={this.onLabelClick}
                onKeyPress={this.onKeyPress}
                tabIndex={0}
                style={styles.unselected}
            >
                {this.props.children}
            </div>
        );
    };

    render = () => {
        const Label = this.renderLabel();
        const RemoveDimension = this.renderRemoveButton();

        const containerStyle = this.props.isSelected
            ? { ...styles.unselected, ...styles.selected }
            : styles.unselected;

        return (
            <div style={containerStyle}>
                {Label}
                {RemoveDimension}
            </div>
        );
    };
}

export default connect(
    null,
    { onRemoveDimension: id => acRemoveUiLayoutDimensions(id) }
)(DimensionLabel);
