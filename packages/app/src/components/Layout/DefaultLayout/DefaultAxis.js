import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '../Chip';
import { sGetUi } from '../../../reducers/ui';
import { decodeDataTransfer } from '../../../modules/dnd';
import {
    acAddUiLayoutDimensions,
    acRemoveUiLayoutDimensions,
    acSetUiActiveModalDialog,
} from '../../../actions/ui';
import { AXIS_NAMES, SOURCE_DIMENSIONS } from '../../../modules/layout';
import styles from './styles/DefaultAxis.style';
import { getAdaptedUiByType } from '../../../modules/ui';
import { isYearOverYear } from '../../../modules/chartTypes';

const axisLabels = {
    columns: i18n.t('Series'),
    rows: i18n.t('Category'),
    filters: i18n.t('Filter'),
};

class Axis extends React.Component {
    onDragOver = e => {
        e.preventDefault();
    };

    onDrop = e => {
        // Prevent redirect in Firefox
        e.preventDefault();

        const { dimensionId, source } = decodeDataTransfer(e);

        this.props.onAddDimension({
            [dimensionId]: this.props.axisName,
        });

        const items = this.props.itemsByDimension[dimensionId];
        const hasNoItems = Boolean(!items || !items.length);

        if (source === SOURCE_DIMENSIONS && hasNoItems) {
            this.props.onDropWithoutItems(dimensionId);
        }
    };

    getAxisMenuItems = dimensionId =>
        AXIS_NAMES.filter(key => key !== this.props.axisName).map(key => (
            <MenuItem
                key={`${dimensionId}-to-${key}`}
                onClick={this.props.getMoveHandler({ [dimensionId]: key })}
            >{`${i18n.t('Move to')} ${axisLabels[key]}`}</MenuItem>
        ));

    getRemoveMenuItem = dimensionId => (
        <MenuItem
            key={`remove-${dimensionId}`}
            onClick={this.props.getRemoveHandler(dimensionId)}
        >
            {i18n.t('Remove')}
        </MenuItem>
    );

    isMoveSupported = () => !isYearOverYear(this.props.type);

    getMenuItems = dimensionId => [
        ...(this.isMoveSupported() ? this.getAxisMenuItems(dimensionId) : []),
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
                <div style={styles.label}>
                    {axisLabels[this.props.axisName]}
                </div>
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

const mapStateToProps = state => ({
    ui: sGetUi(state),
});

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
    onDropWithoutItems: dimensionId =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
    getOpenHandler: dimensionId => () =>
        dispatch(acSetUiActiveModalDialog(dimensionId)),
    getMoveHandler: value => event => {
        event.stopPropagation();
        dispatch(acAddUiLayoutDimensions(value));
    },
    getRemoveHandler: dimensionId => event => {
        event.stopPropagation();
        dispatch(acRemoveUiLayoutDimensions(dimensionId));
    },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const adaptedUi = getAdaptedUiByType(stateProps.ui);

    return {
        axis: adaptedUi.layout[ownProps.axisName],
        itemsByDimension: adaptedUi.itemsByDimension,
        type: adaptedUi.type,
        ...dispatchProps,
        ...ownProps,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Axis);
