import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';
import { tRemoveDimensions } from '../actions/dimensions';

const style = {
    unselected: {
        display: 'inline-flex',
        minWidth: 'fit-content',
        borderRadius: 4,
        marginLeft: 12,
    },
    selected: {
        backgroundColor: '#BBDEFB',
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        position: 'relative',
        top: 1,
        marginLeft: 6,
        marginRight: 4,
        padding: 0,
        width: 12,
    },
    deleteButtonIcon: {
        fill: '#004BA0',
        height: 13,
        width: 10,
    },
};

const RemoveDimensionButton = ({ action }) => {
    return (
        <button style={style.deleteButton} onClick={action}>
            <Close style={style.deleteButtonIcon} />
        </button>
    );
};

export class DimensionLabel extends Component {
    state = {};

    onLabelClick = () => {
        this.props.toggleDialog(this.props.id);
    };

    onKeyPress = event => {
        if (event.key === 'Enter') {
            this.props.isSelected
                ? this.onRemoveDimensionClick()
                : this.onLabelClick();
        }
    };

    onRemoveDimensionClick = () => {
        this.props.removeDimension(this.props.id);
    };

    renderRemoveButton = () => {
        let removeDimensionButton = null;

        if (this.props.isSelected) {
            removeDimensionButton = (
                <RemoveDimensionButton action={this.onRemoveDimensionClick} />
            );
        }

        return removeDimensionButton;
    };

    render = () => {
        const RemoveDimension = this.renderRemoveButton(),
            labelStyle = this.props.isSelected
                ? { ...style.unselected, ...style.selected }
                : style.unselected;

        return (
            <div style={labelStyle}>
                <div
                    onClick={this.onLabelClick}
                    onKeyPress={this.onKeyPress}
                    tabIndex={0}
                >
                    {this.props.children}
                </div>
                {RemoveDimension}
            </div>
        );
    };
}

const mapDispatchToProps = dispatch => ({
    removeDimension: id => dispatch(tRemoveDimensions(id)),
});

DimensionLabel.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isSelected: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    removeDimension: PropTypes.func.isRequired,
    Icon: PropTypes.element,
    Label: PropTypes.element,
};

export default connect(
    null,
    mapDispatchToProps
)(DimensionLabel);
