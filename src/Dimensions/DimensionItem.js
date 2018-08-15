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
        position: 'relative',
        bottom: 12,
        display: 'inline-block',
        marginLeft: 3,
        marginBottom: 10,
        marginTop: 10,
    },
    itemContainer: {
        display: 'inline-flex',
        margin: '4px 0px 4px 0px',
        padding: 0,
        minWidth: 'inherit',
        width: 'inherit',
        height: 24,
        position: 'relative',
    },
    dropDownButton: {
        border: 'none',
        background: 'none',
        position: 'relative',
        right: 5,
        bottom: 3,
        height: 21,
        width: 38,
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
                    onAddDimension={addDimension}
                    onRemoveDimension={removeDimension}
                    isSelected={isSelected}
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
