import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import Chip from '../Chip';
import { sGetUiLayout } from '../../../reducers/ui';
import { decodeDataTransfer } from '../../../dnd';
import { acAddUiLayoutDimensions } from '../../../actions/ui';
import { colors } from '../../../colors';

const styles = {
    axisContainer: {
        display: 'flex',
        backgroundColor: colors.white,
        borderColor: colors.greyLight,
        borderStyle: 'solid',
        borderWidth: '0px 0px 1px 1px',
        padding: '6px 6px 2px 8px',
        // padding: '8px 8px 0px 8px',
    },
    label: {
        minWidth: 55,
        maxWidth: 55,
        padding: '2px 0px 0px 0px',
        // padding: '2px 0 0 4px',
        fontSize: 11,
        color: colors.greyDark,
        userSelect: 'none',
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
    },
};

const axisLabels = {
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

// const renderLabel = label =>

const Axis = ({ layout, onAddDimension, axisName, style }) => {
    const axis = layout[axisName];

    return (
        <div
            id={axisName}
            style={{ ...styles.axisContainer, ...style }}
            onDragOver={onDragOver}
            onDrop={getDropHandler({ axisName, onAddDimension })}
        >
            <div style={styles.label}>{axisLabels[axisName]}</div>
            <div style={styles.content}>
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
