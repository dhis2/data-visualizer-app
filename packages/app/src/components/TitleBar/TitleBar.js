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

export const TITLE_UNSAVED = i18n.t('Unsaved chart');
export const TITLE_DIRTY = i18n.t('Edited');

export const STATE_EMPTY = 'EMPTY';
export const STATE_SAVED = 'SAVED';
export const STATE_UNSAVED = 'UNSAVED';
export const STATE_DIRTY = 'DIRTY';

const defaultTitleStyle = {
    ...styles.cell,
    ...styles.title,
};

const defaultInterpretationStyle = {
    ...styles.cell,
    ...styles.interpretation,
};

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
        case STATE_DIRTY:
            return visualization.name;
        default:
            return '';
    }
};

const getCustomTitleStyle = titleState => {
    switch (titleState) {
        case STATE_UNSAVED:
            return styles.titleUnsaved;
        default:
            return null;
    }
};

const getSuffix = titleState => {
    switch (titleState) {
        case STATE_DIRTY:
            return (
                <div
                    style={{
                        ...styles.suffix,
                        ...styles.titleDirty,
                    }}
                >{`- ${TITLE_DIRTY}`}</div>
            );
        default:
            return '';
    }
};

export const TitleBar = ({ titleState, titleText, interpretationDate }) => {
    const titleStyle = {
        ...defaultTitleStyle,
        ...getCustomTitleStyle(titleState),
    };

    return titleText ? (
        <div style={styles.titleBar}>
            <div style={titleStyle}>
                {titleText}
                {getSuffix(titleState)}
            </div>
            {interpretationDate && (
                <div style={defaultInterpretationStyle}>
                    {i18n.t(
                        'Viewing interpretation from {{interpretationDate}}',
                        {
                            interpretationDate,
                        }
                    )}
                </div>
            )}
        </div>
    ) : null;
};

TitleBar.propTypes = {
    titleState: PropTypes.string,
    titleText: PropTypes.string,
    interpretationDate: PropTypes.string,
};

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
