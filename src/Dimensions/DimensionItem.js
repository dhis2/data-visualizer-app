import React, { Component } from 'react';
import DimensionLabel from './DimensionLabel';
import { Data, Period, OrgUnit, GenericDimension } from './icons';
import DimensionOptions from './DimensionOptions';

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
};

export class DimensionItem extends Component {
    state = { mouseOver: false, optionButtonClicked: false };

    onMouseOver = () => {
        this.setState({ mouseOver: true });
    };

    onMouseExit = () => {
        if (!this.state.optionButtonClicked) {
            this.setState({ mouseOver: false });
        }
    };

    toggleHoverListener = () => {
        this.setState(
            { optionButtonClicked: !this.state.optionButtonClicked },
            () => this.onMouseExit()
        );
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

    renderOptionsOnHover = () => {
        let showOptions = null;

        if (!this.props.isSelected && this.state.mouseOver) {
            showOptions = (
                <DimensionOptions
                    toggleHoverListener={this.toggleHoverListener}
                />
            );
        }

        return showOptions;
    };

    render = () => {
        const { addDimension, removeDimension, id, isSelected } = this.props;
        const Icon = this.getDimensionIcon();
        const Label = this.getDimensionName();
        const MoreOptions = this.renderOptionsOnHover();

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
                    {Icon}
                    {Label}
                </DimensionLabel>
                {MoreOptions}
            </li>
        );
    };
}

export default DimensionItem;
