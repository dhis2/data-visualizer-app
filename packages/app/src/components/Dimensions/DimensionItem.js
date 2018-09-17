import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import DimensionLabel from './DimensionLabel';
import DimensionOptions from './DimensionOptions';
import {
    DataIcon,
    PeriodIcon,
    OrgUnitIcon,
    GenericDimension,
    RecommendedIcon,
} from './icons';
import { colors } from '../../colors';
import { setDataTransfer } from '../../dnd';

const style = {
    wrapper: {
        display: 'flex',
        position: 'static',
    },
    text: {
        fontSize: 16,
        color: colors.black,
        cursor: 'pointer',
        userSelect: 'none',
    },
    itemContainer: {
        display: 'flex',
        height: 24,
        marginTop: 6,
        marginBottom: 6,
    },
};
const fixedDimensionIcons = {
    dx: <DataIcon />,
    pe: <PeriodIcon />,
    ou: <OrgUnitIcon />,
};

export class DimensionItem extends Component {
    state = { mouseOver: false, optionButtonClicked: false };

    onMouseOver = () => {
        if (!this.state.optionButtonClicked) {
            this.setState({ mouseOver: true });
        }
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

    getDimensionIcon = () =>
        fixedDimensionIcons[this.props.id] || <GenericDimension />;

    onDragStart = e => {
        setDataTransfer(e, 'dimensions');
    };

    getDimensionType = () => {
        return (
            <span
                data-dimensionid={this.props.id}
                style={style.text}
                draggable="true"
                onDragStart={this.onDragStart}
            >
                {i18n.t(this.props.displayName)}
            </span>
        );
    };

    checkIfRecommended = () => {
        return this.props.isRecommended && !this.props.isSelected ? (
            <RecommendedIcon />
        ) : null;
    };

    renderOptionsOnHover = () => {
        return !this.props.isSelected && this.state.mouseOver ? (
            <DimensionOptions
                toggleHoverListener={this.toggleHoverListener}
                id={this.props.id}
            />
        ) : null;
    };

    render = () => {
        const Icon = this.getDimensionIcon();
        const Label = this.getDimensionType();
        const MoreOptions = this.renderOptionsOnHover();
        const RecommendedIcon = this.checkIfRecommended();

        return (
            <li
                key={this.props.id}
                style={style.itemContainer}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseExit}
            >
                <DimensionLabel {...this.props}>
                    {Icon}
                    {Label}
                </DimensionLabel>
                {RecommendedIcon}
                {MoreOptions}
            </li>
        );
    };
}

DimensionItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    displayName: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isRecommended: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
};

export default DimensionItem;
