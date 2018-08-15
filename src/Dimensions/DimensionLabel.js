import React, { Component } from 'react';
import { SvgIcon } from '@dhis2/d2-ui-core';

const style = {
    unselected: {
        borderRadius: 4,
        marginLeft: 12,
        marginRight: 8,
        minWidth: 'fit-content',
    },
    selected: {
        backgroundColor: '#BBDEFB',
    },
    deleteButton: {
        position: 'relative',
        border: 'none',
        background: 'none',
        marginLeft: 10,
        marginRight: 4,
        padding: 0,
        bottom: 9,
        height: 12,
        width: 12,
    },
    deleteButtonIcon: {
        fill: '#004BA0',
        height: 10,
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
            <div style={labelStyle} onClick={this.onLabelClick}>
                {this.props.children}
                {removeDimensionButton}
            </div>
        );
    };
}

export default DimensionLabel;
