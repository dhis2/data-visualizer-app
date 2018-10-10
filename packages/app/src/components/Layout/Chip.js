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
    chipWrapper: {
        display: 'flex',
        margin: layoutStyle.CHIP_MARGIN,
    },
    chip: {
        maxHeight: layoutStyle.CHIP_HEIGHT,
        padding: layoutStyle.CHIP_PADDING,
        fontSize: layoutStyle.CHIP_FONT_SIZE,
        fontWeight: layoutStyle.CHIP_FONT_WEIGHT,
        backgroundColor: layoutStyle.CHIP_BACKGROUND_COLOR,
        color: layoutStyle.CHIP_COLOR,
        borderRadius: layoutStyle.CHIP_BORDER_RADIUS,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    chipLeft: {
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
    },
    chipRight: {
        paddingLeft: '0px',
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
    },
};

styles.chipLeft = {
    ...styles.chip,
    ...styles.chipLeft,
};

styles.chipRight = {
    ...styles.chip,
    ...styles.chipRight,
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

    chipLeftStyle = {};

    handleMouseOver = () => {
        if (this.timeout === null) {
            this.timeout = setTimeout(
                () =>
                    this.setState({
                        tooltipOpen: true,
                    }),
                500
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
        this.handleMouseOut();

        this.props.onClick(event);
    };

    getDragStartHandler = source => e => {
        this.handleMouseOut();

        setDataTransfer(e, source);
    };

    renderChip = () => {
        const itemsLabel = `: ${this.props.items.length} ${labels.selected}`;
        const chipLabel = `${this.props.dimensionName}${
            this.props.items.length > 0 ? itemsLabel : ''
        }`;

        return (
            <div
                style={styles.chipWrapper}
                data-dimensionid={this.props.dimensionId}
                draggable="true"
                onDragStart={this.getDragStartHandler(this.props.axisName)}
            >
                <div
                    id={this.id}
                    style={styles.chipLeft}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseOver}
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseOut}
                    onMouseOut={this.handleMouseOut}
                >
                    {chipLabel}
                </div>
                <div style={styles.chipRight}>
                    <Menu
                        id={this.props.dimensionId}
                        menuItems={this.props.menuItems}
                    />
                    <Tooltip
                        dimensionId={this.props.dimensionId}
                        open={this.state.tooltipOpen}
                        anchorEl={document.getElementById(this.id)}
                    />
                </div>
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
