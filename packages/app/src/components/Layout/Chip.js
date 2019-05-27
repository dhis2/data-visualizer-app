import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import { FIXED_DIMENSIONS } from '@dhis2/d2-ui-analytics';

import Menu from './Menu';
import Tooltip from './Tooltip';
import { setDataTransfer } from '../../modules/dnd';
import { sGetDimensions } from '../../reducers/dimensions';
import { sGetUiItemsByDimension } from '../../reducers/ui';
import DynamicDimensionIcon from '../../assets/DynamicDimensionIcon';
import { sGetMetadata } from '../../reducers/metadata';
import { styles } from './styles/Chip.style';

const TOOLTIP_ENTER_DELAY = 500;

const emptyItems = [];

class Chip extends React.Component {
    state = {
        tooltipOpen: false,
    };

    id = Math.random().toString(36);

    timeout = null;

    handleMouseOver = () => {
        if (this.timeout === null) {
            this.timeout = setTimeout(
                () =>
                    this.setState({
                        tooltipOpen: true,
                    }),
                TOOLTIP_ENTER_DELAY
            );
        }
    };

    handleMouseOut = () => {
        if (typeof this.timeout === 'number') {
            clearTimeout(this.timeout);
            this.timeout = null;
            this.setState({
                tooltipOpen: false,
            });
        }
    };

    handleClick = event => {
        this.props.onClick(event);

        this.handleMouseOut();
    };

    getDragStartHandler = source => e => {
        this.handleMouseOut();

        setDataTransfer(e, source);
    };

    getIconByDimension = () => {
        const fixedDimension = FIXED_DIMENSIONS[this.props.dimensionId];

        if (fixedDimension) {
            const Icon = FIXED_DIMENSIONS[this.props.dimensionId].icon;
            return <Icon style={styles.fixedDimensionIcon} />;
        }

        return <DynamicDimensionIcon style={styles.dynamicDimensionIcon} />;
    };

    renderChip = () => {
        const itemsLabel = `: ${this.props.items.length} ${i18n.t('selected')}`;

        const chipLabel = `${this.props.dimensionName}${
            this.props.items.length > 0 ? itemsLabel : ''
        }`;
        const anchorEl = document.getElementById(this.id);
        const icon = this.getIconByDimension();
        const wrapperStyle = {
            ...styles.chipWrapper,
            ...(!this.props.items.length ? styles.chipEmpty : {}),
        };

        return (
            <div
                style={wrapperStyle}
                data-dimensionid={this.props.dimensionId}
                draggable="true"
                onDragStart={this.getDragStartHandler(this.props.axisName)}
            >
                <div
                    id={this.id}
                    style={styles.chipLeft}
                    onClick={this.handleClick}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                >
                    <div style={styles.iconWrapper}>{icon}</div>
                    {chipLabel}
                </div>
                <div style={styles.chipRight}>
                    <Menu
                        id={this.props.dimensionId}
                        menuItems={this.props.menuItems}
                    />
                </div>
                {anchorEl && (
                    <Tooltip
                        dimensionId={this.props.dimensionId}
                        open={this.state.tooltipOpen}
                        anchorEl={anchorEl}
                    />
                )}
            </div>
        );
    };

    render() {
        return this.props.dimensionId ? this.renderChip() : '';
    }
}

const mapStateToProps = (state, ownProps) => ({
    dimensionName: (sGetDimensions(state)[ownProps.dimensionId] || {}).name,
    items: sGetUiItemsByDimension(state, ownProps.dimensionId) || emptyItems,
    metadata: sGetMetadata(state),
});

export default connect(mapStateToProps)(Chip);
