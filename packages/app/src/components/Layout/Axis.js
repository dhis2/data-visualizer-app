import React from 'react';
import { connect } from 'react-redux';

import Chip from './Chip';
import { sGetUiLayout } from '../../reducers/ui';
import { decodeDataTransfer } from '../../dnd';
import { acAddUiLayoutDimensions } from '../../actions/ui';
import { colors } from '../../colors';

const styles = {
    axisContainer: {
        display: 'flex',
        padding: '8px 0 4px 8px',
    },
    title: {
        width: 55,
        padding: 4,
        fontSize: 11,
        color: colors.greyDark,
    },
    field: {
        display: 'flex',
    },
};

// TODO improve + i18n
const axisLabelMap = {
    columns: 'Series',
    rows: 'Category',
    filters: 'Filter',
};

const onDragOver = e => {
    e.preventDefault();
};

const getDropHandler = ({ axisName, onAddDimension }) => e => {
    const { dimensionId } = decodeDataTransfer(e);

    onAddDimension({
        [dimensionId]: axisName,
    });

    e.dataTransfer.clearData();
};

const Axis = ({ axisName, layout, onAddDimension }) => {
    const axis = layout[axisName];

    return (
        <div
            style={styles.axisContainer}
            onDragOver={onDragOver}
            onDrop={getDropHandler({ axisName, onAddDimension })}
        >
            <div style={styles.title}>{axisLabelMap[axisName]}</div>
            <div style={styles.field}>
                {axis.map(dimensionId => (
                    <Chip
                        key={dimensionId}
                        axisName={axisName}
                        dimensionId={dimensionId}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    layout: sGetUiLayout(state),
});

const mapDispatchToProps = dispatch => ({
    onAddDimension: map => dispatch(acAddUiLayoutDimensions(map)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Axis);
