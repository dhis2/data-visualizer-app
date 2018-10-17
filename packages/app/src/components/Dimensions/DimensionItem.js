import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import DimensionLabel from './DimensionLabel';
import DimensionOptions from './DimensionOptions';
import RecommendedIcon from './RecommendedIcon';
import {
    DataIcon,
    PeriodIcon,
    OrgUnitIcon,
    GenericDimension,
} from '../../icons';
import { setDataTransfer } from '../../dnd';
import { styles } from './styles/DimensionItem.style';

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
                style={styles.text}
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
                style={styles.itemContainer}
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
