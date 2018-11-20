import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import DimensionLabel from './DimensionLabel';
import DimensionOptions from './DimensionOptions';
import RecommendedIcon from './RecommendedIcon';
import { FIXED_DIMENSIONS } from '../../modules/fixedDimensions';
import DynamicDimensionIcon from '../../assets/DynamicDimensionIcon';
import { setDataTransfer } from '../../modules/dnd';
import { styles } from './styles/DimensionItem.style';
import { SOURCE_DIMENSIONS } from '../../modules/layout';
import { sGetUiType } from '../../reducers/ui';
import { isYearOverYear } from '../../modules/chartTypes';

const peId = FIXED_DIMENSIONS.pe.id;

export class DimensionItem extends Component {
    state = { mouseOver: false };

    onMouseOver = () => {
        this.setState({ mouseOver: true });
    };

    onMouseExit = () => {
        this.setState({ mouseOver: false });
    };

    onDragStart = e => {
        setDataTransfer(e, SOURCE_DIMENSIONS);
    };

    getDimensionIcon = () => {
        const fixedDimension = FIXED_DIMENSIONS[this.props.id];

        if (fixedDimension) {
            const Icon = fixedDimension.icon;
            return <Icon style={styles.fixedDimensionIcon} />;
        }

        return <DynamicDimensionIcon style={styles.dynamicDimensionIcon} />;
    };

    isDeactivated = () =>
        this.props.id === peId && isYearOverYear(this.props.type);

    getDimensionType = () => (
        <span
            data-dimensionid={this.props.id}
            style={{
                ...styles.text,
                ...(this.isDeactivated() ? styles.textDeactivated : {}),
            }}
            draggable={!this.isDeactivated()}
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
                <DimensionLabel
                    {...this.props}
                    isDeactivated={this.isDeactivated()}
                >
                    <div style={styles.iconWrapper}>{Icon}</div>
                    {Label}
                    <RecommendedIcon
                        id={this.props.id}
                        isSelected={this.props.isSelected}
                    />
                    <DimensionOptions
                        id={this.props.id}
                        showButton={Boolean(
                            this.state.mouseOver && !this.isDeactivated()
                        )}
                        onClose={this.onMouseExit}
                    />
                </DimensionLabel>
            </li>
        );
    };
}

DimensionItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    type: sGetUiType(state),
});

export default connect(mapStateToProps)(DimensionItem);
