import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import Chip from '../Chip';
import { sGetUiLayout } from '../../../reducers/ui';
import { decodeDataTransfer } from '../../../dnd';
import { acAddUiLayoutDimensions } from '../../../actions/ui';
import { colors } from '../../../colors';

const styles = {
    axis: {
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: colors.white,
        borderColor: colors.greyLight,
        borderStyle: 'solid',
        borderWidth: '0 0 1px 1px',
    },
};

// const s = {
//     item: {
//         borderColor: colors.greyLight,
//         borderStyle: 'solid',
//         borderWidth: '0 0 1px 1px',
//     },
//     filters: {
//         gridRowStart: 'span 2',
//     },
// };

// const st = {
//     axisContainer: {
//         display: 'flex',
//         padding: '8px 8px 0 8px',
//         backgroundColor: colors.white,
//     },
//     title: {
//         width: 55,
//         padding: '2px 0 0 4px',
//         fontSize: 11,
//         color: colors.greyDark,
//         userSelect: 'none',
//     },
//     field: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
// };

// TODO improve
const axisLabelMap = {
    columns: i18n.t('Series'),
    rows: i18n.t('Category'),
    filters: i18n.t('Filter'),
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

const Axis = ({ layout, onAddDimension, axisName, style }) => {
    const axis = layout[axisName];

    return (
        <div
            id={axisName}
            style={{ ...styles.axis, ...style }}
            onDragOver={onDragOver}
            onDrop={getDropHandler({ axisName, onAddDimension })}
        >
            {axis.map(dimensionId => (
                <Chip
                    key={dimensionId}
                    axisName={axisName}
                    dimensionId={dimensionId}
                />
            ))}
        </div>
    );
};

//     const axis = layout[axisName];
//     const style = {
//         ...styles.axisContainer,
//         ...axisStyle,
//     };

//     return (
//         <div
//             style={style}
//             onDragOver={onDragOver}
//             onDrop={getDropHandler({ axisName, onAddDimension })}
//         >
//             <div style={styles.title}>{axisLabelMap[axisName]}</div>
//             <div style={styles.field}>
//                 {axis.map(dimensionId => (
//                     <Chip
//                         key={dimensionId}
//                         axisName={axisName}
//                         dimensionId={dimensionId}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

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
