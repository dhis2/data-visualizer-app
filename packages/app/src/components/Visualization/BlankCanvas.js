import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import LoadingMask from '../../widgets/LoadingMask';
import styles from './styles/BlankCanvas.style';
import { sGetLoadError, sGetIsLoading } from '../../reducers/loader';
import chartErrorImg from '../../assets/chart-error-graphic.png';

export const visContainerId = 'visualization-container';
export const defaultCanvasMessage = 'Visualization Canvas';

const CanvasContent = ({ loading, error }) => {
    const message = error ? error : defaultCanvasMessage;

    if (loading) {
        return <LoadingMask />;
    } else if (error) {
        return (
            <div>
                <img src={chartErrorImg} alt={i18n.t('Chart error')} />
                <p style={styles.text}>{message}</p>
            </div>
        );
    }
    return <p style={styles.text}>{message}</p>;
};

export const BlankCanvas = ({ loading, error }) => {
    return (
        <div id={visContainerId} style={styles.outer}>
            <div style={styles.inner}>
                <CanvasContent loading={loading} error={error} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    error: sGetLoadError(state),
    loading: sGetIsLoading(state),
});

export default connect(mapStateToProps)(BlankCanvas);
