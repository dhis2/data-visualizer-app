import React, { Component } from 'react';
import DimensionLabel from './DimensionLabel';
import {
    Data,
    Period,
    OrgUnit,
    GenericDimension,
    MoreHorizontal,
} from './icons';
import MoreOptions from './MoreOptions';

const style = {
    text: {
        fontSize: 16,
        color: 'black',
    },
    itemContainer: {
        display: 'flex',
        width: 'inherit',
        height: 24,
        marginTop: 6,
        marginBottom: 6,
    },
    dropDownButton: {
        border: 'none',
        background: 'none',
        outline: 'none',
    },
};

const MoreOptionsButton = ({ action }) => {
    return (
        <button style={style.dropDownButton} onClick={action}>
            <MoreHorizontal />
        </button>
    );
};

export class DimensionItem extends Component {
    state = { mouseOver: false, showMoreIsClicked: false };

    onMouseOver = () => {
        this.setState({ mouseOver: true });
    };

    onMouseExit = () => {
        this.setState({ mouseOver: false });
    };

    showMoreOptions = () => {
        this.setState({ showMoreIsClicked: true });
    };

    hideMoreOptions = () => {
        this.setState({ showMoreIsClicked: false, mouseOver: false });
    };

    getDimensionIcon = () => {
        const dimensionIcons = [<Data />, <Period />, <OrgUnit />];

        return this.props.id >= dimensionIcons.length ? (
            <GenericDimension />
        ) : (
            dimensionIcons[this.props.id]
        );
    };

    getDimensionName = () => {
        return <span style={style.text}> {this.props.dimensionName} </span>;
    };

    render = () => {
        const { addDimension, removeDimension, id, isSelected } = this.props;

        const shouldDisplayMoreOptionsButton =
            this.state.showMoreIsClicked ||
            (!isSelected && this.state.mouseOver);

        let moreOptionsButton,
            showDropDown = null;

        if (shouldDisplayMoreOptionsButton) {
            moreOptionsButton = (
                <MoreOptionsButton action={() => this.showMoreOptions()} />
            );
        }
        if (this.state.showMoreIsClicked) {
            showDropDown = (
                <MoreOptions onClose={() => this.hideMoreOptions()} />
            );
        }

        return (
            <li
                key={id}
                style={style.itemContainer}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseExit}
            >
                <DimensionLabel
                    isSelected={isSelected}
                    onAddDimension={() => addDimension(id)}
                    onRemoveDimension={() => removeDimension(id)}
                >
                    {this.getDimensionIcon()}
                    {this.getDimensionName()}
                </DimensionLabel>
                {moreOptionsButton}
                {showDropDown}
            </li>
        );
    };
}

export default DimensionItem;
