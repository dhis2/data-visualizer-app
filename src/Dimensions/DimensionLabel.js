import React, { Component } from 'react';
import { SvgIcon } from '@dhis2/d2-ui-core';

const style = {
    unselected: {
        display: 'inline-flex',
        borderRadius: 4,
        minWidth: 'fit-content',
        marginLeft: 12,
    },
    selected: {
        backgroundColor: '#BBDEFB',
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        outline: 'none',
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
            <SvgIcon icon="Close" style={style.deleteButtonIcon} />
        </button>
    );
};

export class DimensionLabel extends Component {
    state = {};

    onLabelClick = () => {
        this.props.onAddDimension();
    };

    removeDimension = () => {
        this.props.onRemoveDimension();
    };

    render = () => {
        const { isSelected } = this.props;

        const labelStyle = isSelected
            ? { ...style.unselected, ...style.selected }
            : style.unselected;

        let removeDimensionButton = null;

        if (isSelected) {
            removeDimensionButton = (
                <RemoveDimensionButton action={this.removeDimension} />
            );
        }

        return (
            <div style={labelStyle}>
                <div onClick={this.onLabelClick}>{this.props.children}</div>
                {removeDimensionButton}
            </div>
        );
    };
}

export default DimensionLabel;
