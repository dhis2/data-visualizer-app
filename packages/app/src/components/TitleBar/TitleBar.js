import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sGetVisualization } from '../../reducers/visualization';
import { sGetCurrent } from '../../reducers/current';
import styles from './styles/TitleBar.style';

export const TitleBar = ({ title, isDirty }) =>
    title ? (
        <div style={styles.titleBar}>
            <span style={styles.title}>
                {isDirty ? '* ' : ''}
                {title}
            </span>
        </div>
    ) : null;

TitleBar.propTypes = {
    title: PropTypes.string,
    isDirty: PropTypes.bool,
};

const mapStateToProps = state => ({
    title: sGetVisualization(state) ? sGetVisualization(state).name : null,
    isDirty: sGetVisualization(state)
        ? sGetVisualization(state) !== sGetCurrent(state)
        : false,
});

export default connect(mapStateToProps)(TitleBar);
