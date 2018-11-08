import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import DimensionLabel from './DimensionLabel';
import DimensionOptions from './DimensionOptions';
import RecommendedIcon from './RecommendedIcon';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';
import GenericDimensionIcon from '../../assets/GenericDimensionIcon';
import { setDataTransfer } from '../../modules/dnd';
import { styles } from './styles/DimensionItem.style';

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

    getDimensionIcon = () => {
        const fixedDimension = FIXED_DIMENSIONS[this.props.id];

        if (fixedDimension) {
            const Icon = fixedDimension.icon;
            return <Icon style={styles.fixedDimensionIcon} />;
        }

        return <GenericDimensionIcon style={styles.genericDimensionIcon} />;
    };

    getDimensionType = () => (
        <span
            data-dimensionid={this.props.id}
            style={styles.text}
            draggable="true"
            onDragStart={this.onDragStart}
        >
            {i18n.t(this.props.name)}
        </span>
    );

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
                    <div style={styles.iconWrapper}>{Icon}</div>
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
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
};

export default DimensionItem;
