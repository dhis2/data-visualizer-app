import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';
import { colors } from '../../colors';
import { tSetDimensions } from '../../actions/dimensions';

const style = {
    unselected: {
        minWidth: 'fit-content',
        borderRadius: 4,
        marginLeft: 5,
    },
    selected: {
        display: 'inline-flex',
        backgroundColor: colors.lightBlue,
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        marginLeft: 6,
        marginRight: 4,
        padding: 0,
        width: 12,
    },
    deleteButtonIcon: {
        fill: colors.blue,
        height: 13,
        width: 10,
    },
};

export const RemoveDimensionButton = ({ action }) => {
    return (
        <button style={style.deleteButton} onClick={action} tabIndex={0}>
            <Close style={style.deleteButtonIcon} />
        </button>
    );
};

export class DimensionLabel extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        isSelected: PropTypes.bool.isRequired,
        toggleDialog: PropTypes.func.isRequired,
        removeSelectedDimension: PropTypes.func.isRequired,
        Icon: PropTypes.element,
        Label: PropTypes.element,
    };

    onLabelClick = () => {
        this.props.toggleDialog({
            id: this.props.id,
            displayName: this.props.displayName,
        });
    };

    onKeyPress = event => {
        if (event.key === 'Enter') {
            this.onLabelClick();
        }
    };

    onRemoveDimensionClick = () => {
        this.props.removeSelectedDimension(this.props.axisKey, this.props.id);
    };

    renderRemoveButton = () => {
        return this.props.isSelected ? (
            <RemoveDimensionButton action={this.onRemoveDimensionClick} />
        ) : null;
    };

    render = () => {
        const RemoveDimension = this.renderRemoveButton();
        const labelStyle = this.props.isSelected
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

const mapStateToProps = (state, ownProps) => ({
    axisKey: fromReducers.fromUi.sGetLayoutAxisKey(state, ownProps.id),
});

const mapDispatchToProps = dispatch => ({
    removeSelectedDimension: (axisKey, id) =>
        dispatch(tSetUiLayout(axisKey, id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DimensionLabel);
