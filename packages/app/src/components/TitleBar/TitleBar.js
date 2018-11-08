import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from '@dhis2/d2-i18n';
import { sGetVisualization } from '../../reducers/visualization';
import { sGetCurrent } from '../../reducers/current';
import { sGetUiInterpretation } from '../../reducers/ui';
import { sGetUiLocale } from '../../reducers/settings';
import formatDate from '../../modules/formatDate';
import styles from './styles/TitleBar.style';

export const TitleBar = ({ title, isDirty, interpretation, uiLocale }) => {
    const date =
        interpretation && interpretation.created
            ? formatDate(interpretation.created, uiLocale)
            : null;

    return title ? (
        <div style={styles.titleBar}>
            <span style={styles.title}>
                {isDirty ? '* ' : ''}
                {title}
            </span>
            {date && (
                <span style={styles.interpretation}>
                    {i18n.t('Viewing interpretation from {{date}}', {
                        date,
                    })}
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

const mapStateToProps = state => ({
    title: sGetVisualization(state) ? sGetVisualization(state).name : null,
    isDirty: sGetVisualization(state)
        ? sGetVisualization(state) !== sGetCurrent(state)
        : false,
    interpretation: sGetUiInterpretation(state),
    uiLocale: sGetUiLocale(state),
});

export default connect(mapStateToProps)(TitleBar);
