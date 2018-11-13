import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from '@dhis2/d2-i18n';
import {
    sGetVisualization,
    DEFAULT_VISUALIZATION,
} from '../../reducers/visualization';
import { sGetCurrent, DEFAULT_CURRENT } from '../../reducers/current';
import { sGetUiInterpretation } from '../../reducers/ui';
import { sGetUiLocale } from '../../reducers/settings';
import formatDate from '../../modules/formatDate';
import styles from './styles/TitleBar.style';

const STATE_EMPTY = 'EMPTY';
const STATE_SAVED = 'SAVED';
const STATE_UNSAVED = 'UNSAVED';
const STATE_DIRTY = 'DIRTY';

const TITLE_UNSAVED = i18n.t('Unsaved chart');

const getTitleState = (visualization, current) => {
    if (current === DEFAULT_CURRENT) {
        return STATE_EMPTY;
    } else if (visualization === DEFAULT_VISUALIZATION) {
        return STATE_UNSAVED;
    } else if (current === visualization) {
        return STATE_SAVED;
    } else {
        return STATE_DIRTY;
    }
};

const getTitleText = (titleState, visualization) => {
    switch (titleState) {
        case STATE_UNSAVED:
            return TITLE_UNSAVED;
        case STATE_SAVED:
            return visualization.name;
        case STATE_DIRTY:
            return `* ${visualization.name}`;
        case STATE_EMPTY:
        default:
            return '';
    }
};

const getTitleStyle = titleStyle =>

export const TitleBar = ({ titleState, titleText, interpretationDate }) => {
    const titleStyle = {
        ...styles.title,
        ...(titleState === STATE_UNSAVED ? styles.titleUnsaved : null),
        ...(titleState === STATE_UNSAVED ? styles.titleUnsaved : null),
    };

    return titleText ? (
        <div style={styles.titleBar}>
            <span style={titleStyle}>{titleText}</span>
            {interpretationDate && (
                <span style={styles.interpretation}>
                    {i18n.t(
                        'Viewing interpretation from {{interpretationDate}}',
                        {
                            interpretationDate,
                        }
                    )}
                </span>
            )}
        </div>
    ) : null;
};

TitleBar.propTypes = {
    title: PropTypes.string,
    isDirty: PropTypes.bool,
    interpretatiom: PropTypes.object,
};

// const mapStateToProps = state => ({
//     title: sGetVisualization(state) ? sGetVisualization(state).name : null,
//     isDirty: sGetVisualization(state)
//         ? sGetVisualization(state) !== sGetCurrent(state)
//         : false,
//     interpretation: sGetUiInterpretation(state),
//     uiLocale: sGetUiLocale(state),
// });

const mapStateToProps = state => ({
    visualization: sGetVisualization(state),
    current: sGetCurrent(state),
    interpretation: sGetUiInterpretation(state),
    uiLocale: sGetUiLocale(state),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { visualization, current, interpretation, uiLocale } = stateProps;
    const titleState = getTitleState(visualization, current);

    return {
        ...dispatchProps,
        ...ownProps,
        titleState: titleState,
        titleText: getTitleText(titleState, visualization),
        interpretationDate:
            interpretation && interpretation.created
                ? formatDate(interpretation.created, uiLocale)
                : null,
    };
};

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(TitleBar);
