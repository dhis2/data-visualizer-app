import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from '@dhis2/d2-i18n';
import { sGetVisualization } from '../../reducers/visualization';
import { sGetCurrent } from '../../reducers/current';
import { sGetUiInterpretation } from '../../reducers/ui';
import styles from './styles/TitleBar.style';

export const TitleBar = ({ title, isDirty, interpretation }) =>
    title ? (
        <div style={styles.titleBar}>
            <span style={styles.title}>
                {isDirty ? '* ' : ''}
                {title}
            </span>
            {interpretation.created ? (
                <span style={styles.interpretation}>
                    {i18n.t('Viewing intepretation from {{date}}', {
                        date: interpretation.created,
                    })}
                </span>
            ) : null}
        </div>
    ) : null;

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
});

export default connect(mapStateToProps)(TitleBar);
