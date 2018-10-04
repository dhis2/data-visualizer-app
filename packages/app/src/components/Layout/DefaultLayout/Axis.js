import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '../Chip';
import { sGetUiLayout } from '../../../reducers/ui';
import { decodeDataTransfer } from '../../../dnd';
import {
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
} from '../../../actions/ui';
import { colors } from '../../../colors';
import * as defaultLayoutStyle from './defaultStyle';
import * as layoutStyle from '../style';
import { AXIS_NAMES } from '../../../layout';

const styles = {
    axisContainer: {
        display: 'flex',
        backgroundColor: layoutStyle.AXIS_BACKGROUND_COLOR,
        borderColor: layoutStyle.AXIS_BORDER_COLOR,
        borderStyle: layoutStyle.AXIS_BORDER_STYLE,
        borderWidth: layoutStyle.AXIS_BORDER_WIDTH,
        padding: layoutStyle.AXIS_PADDING,
    },
    label: {
        minWidth: 55,
        maxWidth: 55,
        padding: '2px 0px 0px 0px',
        fontSize: 11,
        color: colors.greyDark,
        userSelect: 'none',
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        minHeight: defaultLayoutStyle.DIMENSION_AXIS_CONTENT_HEIGHT,
    },
};

const labels = {
    columns: i18n.t('Series'),
    rows: i18n.t('Category'),
    filters: i18n.t('Filter'),
    moveTo: i18n.t('Move to'),
    remove: i18n.t('Remove'),
};

class Axis extends React.Component {
    onDragOver = e => {
        e.preventDefault();
    };

    onDrop = e => {
        const { dimensionId } = decodeDataTransfer(e);

        this.props.onAddDimension({
            [dimensionId]: this.props.axisName,
        });

        e.dataTransfer.clearData();
    };

    getAxisMenuItems = dimensionId =>
        AXIS_NAMES.filter(key => key !== this.props.axisName).map(key => (
            <MenuItem
                key={`${dimensionId}-to-${key}`}
                onClick={this.props.getMoveHandler({ [dimensionId]: key })}
            >{`${labels.moveTo} ${labels[key]}`}</MenuItem>
        ));

    getRemoveMenuItem = dimensionId => (
        <MenuItem
            key={`remove-${dimensionId}`}
            onClick={this.props.getRemoveHandler(dimensionId)}
        >
            {labels.remove}
        </MenuItem>
    );

    getMenuItems = dimensionId => [
        ...this.getAxisMenuItems(dimensionId),
        this.getRemoveMenuItem(dimensionId),
    ];

    render() {
        return (
            <div
                id={this.props.axisName}
                style={{ ...styles.axisContainer, ...this.props.style }}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
            >
                <div style={styles.label}>{labels[this.props.axisName]}</div>
                <div style={styles.content}>
                    {this.props.axis.map(dimensionId => (
                        <Chip
                            key={dimensionId}
                            onClick={this.props.getOpenHandler(dimensionId)}
                            axisName={this.props.axisName}
                            dimensionId={dimensionId}
                            menuItems={this.getMenuItems(dimensionId)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    axis: sGetUiLayout(state)[ownProps.axisName],
});

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
    getOpenHandler: dimensionId => () => alert(`Open ${dimensionId} selector`),
    getMoveHandler: value => event => {
        event.stopPropagation();
        dispatch(acAddUiLayoutDimensions(value));
    },
    getRemoveHandler: dimensionId => event => {
        event.stopPropagation();
        dispatch(acRemoveUiLayoutDimensions(dimensionId));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Axis);
