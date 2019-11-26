import React from 'react';
import { connect } from 'react-redux';
import WarningIcon from '@material-ui/icons/Warning';
import LockIcon from '@material-ui/icons/Lock';
import i18n from '@dhis2/d2-i18n';
import {
    FIXED_DIMENSIONS,
    getMaxNumberOfItemsPerAxis,
    hasTooManyItemsPerAxis,
    getLockedDimensionAxis,
    getDisplayNameByVisType,
    getAxisName,
} from '@dhis2/analytics';

import Menu from './Menu';
import Tooltip from './Tooltip';
import { setDataTransfer } from '../../modules/dnd';
import { sGetDimensions } from '../../reducers/dimensions';
import { sGetUiItemsByDimension, sGetUiType } from '../../reducers/ui';
import DynamicDimensionIcon from '../../assets/DynamicDimensionIcon';
import { sGetMetadata } from '../../reducers/metadata';
import { styles } from './styles/Chip.style';

const TOOLTIP_ENTER_DELAY = 500;

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

    getDragStartHandler = () => event => {
        this.handleMouseOut();

        setDataTransfer(event, this.props.axisId);
    };

    getIconByDimension = () => {
        const fixedDimension = FIXED_DIMENSIONS[this.props.dimensionId];

        if (fixedDimension) {
            const Icon = FIXED_DIMENSIONS[this.props.dimensionId].icon;
            return <Icon style={styles.fixedDimensionIcon} />;
        }

        return <DynamicDimensionIcon style={styles.dynamicDimensionIcon} />;
    };

    isLocked = getLockedDimensionAxis(
        this.props.type,
        this.props.dimensionId
    ).includes(this.props.axisId);

    getLockIcon = () =>
        this.isLocked ? (
            <div style={styles.lockIconWrapper}>
                <LockIcon style={styles.lockIcon} />
            </div>
        ) : null;

    getWarningIcon = () =>
        hasTooManyItemsPerAxis(
            this.props.type,
            this.props.axisId,
            this.props.items.length
        ) ? (
            <div style={styles.warningIconWrapper}>
                <WarningIcon style={styles.warningIcon} />
            </div>
        ) : null;

    maxNumberOfItemsPerAxis = getMaxNumberOfItemsPerAxis(
        this.props.type,
        this.props.axisId
    );

    getAnchorEl = () => document.getElementById(this.id);

    getWrapperStyles = () => ({
        ...styles.chipWrapper,
        ...(!this.props.items.length ? styles.chipEmpty : {}),
    });

    getChipLabel = () => {
        const numberOfItems = this.props.items.length;

        const getItemsLabel =
            !!this.maxNumberOfItemsPerAxis &&
            numberOfItems > this.maxNumberOfItemsPerAxis
                ? i18n.t(`{{total}} of {{maxNumberOfItemsPerAxis}} selected`, {
                      total: numberOfItems,
                      maxNumberOfItemsPerAxis: this.maxNumberOfItemsPerAxis,
                  })
                : i18n.t('{{total}} selected', {
                      total: numberOfItems,
                  });

        return `${this.props.dimensionName}${
            this.props.items.length > 0 ? `: ${getItemsLabel}` : ''
        }`;
    };

    renderMenu = () => (
        <div style={styles.chipRight}>
            <Menu
                dimensionId={this.props.dimensionId}
                currentAxisId={this.props.axisId}
                visType={this.props.type}
                numberOfDimensionItems={this.props.items.length}
            />
        </div>
    );

    renderTooltip = () => {
        const activeItemIds = !!this.maxNumberOfItemsPerAxis
            ? this.props.items.slice(0, this.maxNumberOfItemsPerAxis)
            : this.props.items;

        const lockedLabel = this.isLocked
            ? i18n.t(
                  `{{dimensionName}} is locked to {{axisName}} for {{visTypeName}}`,
                  {
                      dimensionName: this.props.dimensionName,
                      axisName: getAxisName(this.props.axisId),
                      visTypeName: getDisplayNameByVisType(this.props.type),
                  }
              )
            : null;
        return (
            <Tooltip
                dimensionId={this.props.dimensionId}
                itemIds={activeItemIds}
                lockedLabel={lockedLabel}
                displayLimitedAmount={
                    this.props.items.length > activeItemIds.length
                }
                open={this.state.tooltipOpen}
                anchorEl={this.getAnchorEl()}
            />
        );
    };

    render = () =>
        this.props.dimensionId ? (
            <div
                style={this.getWrapperStyles()}
                data-dimensionid={this.props.dimensionId}
                draggable={!this.isLocked}
                onDragStart={this.getDragStartHandler()}
            >
                <div
                    id={this.id}
                    style={styles.chipLeft}
                    onClick={this.handleClick}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                >
                    <div style={styles.iconWrapper}>
                        {this.getIconByDimension()}
                    </div>
                    {this.getChipLabel()}
                    {this.getWarningIcon()}
                    {this.getLockIcon()}
                </div>
                {!this.isLocked && this.renderMenu()}
                {this.getAnchorEl() && this.renderTooltip()}
            </div>
        ) : (
            ''
        );
}

const mapStateToProps = (state, ownProps) => ({
    dimensionName: (sGetDimensions(state)[ownProps.dimensionId] || {}).name,
    items: sGetUiItemsByDimension(state, ownProps.dimensionId) || [],
    metadata: sGetMetadata(state),
    type: sGetUiType(state),
});

export default connect(mapStateToProps)(Chip);
