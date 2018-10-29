import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import styles from './styles/BlankCanvas.style';
import { sGetLoadError } from '../../reducers/loadError';
import chartErrorImg from '../../assets/chart-error-graphic.png';

export const visContainerId = 'visualization-container';
export const defaultCanvasMessage = 'Visualization Canvas';

export const BlankCanvas = ({ error }) => {
    const message = error ? error : defaultCanvasMessage;
    return (
        <div id={visContainerId} style={styles.outer}>
            <div style={styles.inner}>
                {error && (
                    <img src={chartErrorImg} alt={i18n.t('Chart error')} />
                )}
                <p style={styles.text}>{message}</p>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    error: sGetLoadError(state),
});

export default connect(mapStateToProps)(BlankCanvas);
