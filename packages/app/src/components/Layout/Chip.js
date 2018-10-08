import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import Menu from './Menu';
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
    getDragStartHandler = source => e => setDataTransfer(e, source);

    renderChip = () => {
        const itemsLabel = `: ${this.props.items.length} ${labels.selected}`;
        const chipLabel = `${this.props.dimensionName}${
            this.props.items.length > 0 ? itemsLabel : ''
        }`;

        return (
            <div
                data-dimensionid={this.props.dimensionId}
                style={styles.chip}
                draggable="true"
                onClick={this.props.onClick}
                onDragStart={this.getDragStartHandler(this.props.axisName)}
            >
                {chipLabel}
                <div style={styles.menuWrapper}>
                    <Menu
                        id={this.props.dimensionId}
                        menuItems={this.props.menuItems}
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
