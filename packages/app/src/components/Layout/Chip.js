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

    // TODO refactor this very long function
    renderChip = () => {
        const axisId = this.props.axisId;
        const visType = this.props.type;
        const numberOfItems = this.props.items.length;

        const isLocked = getLockedDimensionAxis(
            visType,
            this.props.dimensionId
        ).includes(axisId);

        const lockedMessage = isLocked
            ? i18n.t(
                  `{{dimensionName}} is locked to {{axisName}} for {{visTypeName}}`,
                  {
                      dimensionName: this.props.dimensionName,
                      axisName: getDisplayNameByVisType(visType),
                      visTypeName: getAxisName(axisId),
                  }
              )
            : null;

        const maxNumberOfItemsPerAxis = getMaxNumberOfItemsPerAxis(
            visType,
            axisId
        );

        const hasMaxNumberOfItemsRule = !!maxNumberOfItemsPerAxis;

        const itemsLabel =
            hasMaxNumberOfItemsRule && numberOfItems > maxNumberOfItemsPerAxis
                ? i18n.t(`{{total}} of {{maxNumberOfItemsPerAxis}} selected`, {
                      total: numberOfItems,
                      maxNumberOfItemsPerAxis,
                  })
                : i18n.t('{{total}} selected', {
                      total: numberOfItems,
                  });

        const activeItemIds = hasMaxNumberOfItemsRule
            ? this.props.items.slice(0, maxNumberOfItemsPerAxis)
            : this.props.items;

        const chipLabel = `${this.props.dimensionName}${
            numberOfItems > 0 ? `: ${itemsLabel}` : ''
        }`;
        const anchorEl = document.getElementById(this.id);
        const icon = this.getIconByDimension();
        const wrapperStyle = {
            ...styles.chipWrapper,
            ...(!numberOfItems ? styles.chipEmpty : {}),
        };
        const warningIcon = hasTooManyItemsPerAxis(
            visType,
            axisId,
            numberOfItems
        ) ? (
            <div style={styles.warningIconWrapper}>
                <WarningIcon style={styles.warningIcon} />
            </div>
        ) : null;

        const lockIcon = isLocked ? (
            <div style={styles.lockIconWrapper}>
                <LockIcon style={styles.lockIcon} />
            </div>
        ) : null;

        return (
            <div
                style={wrapperStyle}
                data-dimensionid={this.props.dimensionId}
                draggable={!isLocked}
                onDragStart={this.getDragStartHandler(this.props.axisId)}
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
                    {warningIcon}
                    {lockIcon}
                </div>
                {!isLocked && (
                    <div style={styles.chipRight}>
                        <Menu
                            dimensionId={this.props.dimensionId}
                            currentAxisId={this.props.axisId}
                            visType={this.props.type}
                            numberOfDimensionItems={this.props.items.length}
                        />
                    </div>
                )}
                {anchorEl && (
                    <Tooltip
                        dimensionId={this.props.dimensionId}
                        itemIds={activeItemIds}
                        lockedLabel={lockedMessage}
                        displayLimitedAmount={
                            this.props.items.length > activeItemIds.length
                        }
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
    type: sGetUiType(state),
});

export default connect(mapStateToProps)(Chip);
