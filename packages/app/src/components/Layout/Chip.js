import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import Menu from './Menu';
import Tooltip from './Tooltip';
import { setDataTransfer } from '../../dnd';
import { sGetDimensions } from '../../reducers/dimensions';
import * as layoutStyle from './style';
import { sGetUiItems } from '../../reducers/ui';

const styles = {
    chip: {
        maxHeight: layoutStyle.CHIP_HEIGHT,
        margin: layoutStyle.CHIP_MARGIN,
        padding: layoutStyle.CHIP_PADDING,
        fontSize: layoutStyle.CHIP_FONT_SIZE,
        fontWeight: layoutStyle.CHIP_FONT_WEIGHT,
        backgroundColor: layoutStyle.CHIP_BACKGROUND_COLOR,
        color: layoutStyle.CHIP_COLOR,
        borderRadius: layoutStyle.CHIP_BORDER_RADIUS,
        display: 'flex',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    menuWrapper: {
        marginLeft: 2,
    },
};

const labels = {
    selected: i18n.t('selected'),
};

class Chip extends React.Component {
    state = {
        tooltipOpen: false,
    };

    id = Math.random().toString(36);

    timeout = null;

    handleMouseEnter = () => {
        this.timeout = setTimeout(
            () =>
                this.setState({
                    tooltipOpen: true,
                }),
            500
        );
    };

    handleMouseLeave = () => {
        clearTimeout(this.timeout);
        this.timeout = null;

        this.setState({
            tooltipOpen: false,
        });
    };

    handleClick = event => {
        this.handleMouseLeave();

        this.props.onClick(event);
    };

    getDragStartHandler = source => e => {
        this.handleMouseLeave();

        setDataTransfer(e, source);
    };

    renderChip = () => {
        const itemsLabel = `: ${this.props.items.length} ${labels.selected}`;
        const chipLabel = `${this.props.dimensionName}${
            this.props.items.length > 0 ? itemsLabel : ''
        }`;

        return (
            <div
                id={this.id}
                data-dimensionid={this.props.dimensionId}
                style={styles.chip}
                draggable="true"
                onClick={this.handleClick}
                onDragStart={this.getDragStartHandler(this.props.axisName)}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {chipLabel}
                <div style={styles.menuWrapper}>
                    <Menu
                        id={this.props.dimensionId}
                        menuItems={this.props.menuItems}
                    />
                </div>
                <Tooltip
                    dimensionId={this.props.dimensionId}
                    open={this.state.tooltipOpen}
                    anchorEl={document.getElementById(this.id)}
                />
            </div>
        );
    };

    render() {
        return this.props.dimensionId ? this.renderChip() : '';
    }
}

const mapStateToProps = (state, ownProps) => ({
    dimensionName: sGetDimensions(state)[ownProps.dimensionId].displayName,
    items: sGetUiItems(state)[ownProps.dimensionId] || [],
});

export default connect(mapStateToProps)(Chip);
