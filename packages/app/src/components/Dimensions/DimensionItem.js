import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import DimensionLabel from './DimensionLabel';
import DimensionOptions from './DimensionOptions';
import RecommendedIcon, {
    DataIcon,
    PeriodIcon,
    OrgUnitIcon,
    GenericDimension,
} from './icons';
import { colors } from '../../colors';
import { setDataTransfer } from '../../dnd';

const style = {
    wrapper: {
        display: 'flex',
        position: 'static',
    },
    text: {
        color: colors.black,
        cursor: 'pointer',
        userSelect: 'none',
        wordBreak: 'break-all',
        paddingTop: 3,
        fontSize: 16,
        maxWidth: 195,
    },
    itemContainer: {
        display: 'flex',
        minHeight: 24,
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
    state = { mouseOver: false };

    onMouseOver = () => {
        this.setState({ mouseOver: true });
    };

    onMouseExit = () => {
        this.setState({ mouseOver: false });
    };

    onDragStart = e => {
        setDataTransfer(e, 'dimensions');
    };

    getDimensionIcon = () =>
        fixedDimensionIcons[this.props.id] || <GenericDimension />;

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

    render = () => {
        const Icon = this.getDimensionIcon();
        const Label = this.getDimensionType();

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
                <RecommendedIcon
                    id={this.props.id}
                    isSelected={this.props.isSelected}
                />
                <DimensionOptions
                    id={this.props.id}
                    showButton={!this.props.isSelected && this.state.mouseOver}
                    onClose={this.onMouseExit}
                />
            </li>
        );
    };
}

DimensionItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    displayName: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
};

export default DimensionItem;
