import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import LoadingMask from '../../widgets/LoadingMask';
import styles from './styles/BlankCanvas.style';
import { sGetLoadError, sGetIsLoading } from '../../reducers/loader';
import chartErrorImg from '../../assets/chart-error-graphic.png';

export const visContainerId = 'visualization-container';
export const defaultCanvasMessage =
    'Create a new visualization by adding dimensions to the layout';

export const BlankCanvas = ({ loading, error }) => {
    let canvasContent = <p style={styles.title}>{defaultCanvasMessage}</p>;

    if (loading) {
        canvasContent = <LoadingMask />;
    } else if (error) {
        canvasContent = (
            <div>
                <img src={chartErrorImg} alt={i18n.t('Chart error')} />
                <p style={styles.title}>
                    {i18n.t('There is a problem with your chart')}
                </p>
                <p style={styles.description}>{error}</p>
            </div>
        );
    }

    return (
        <div id={visContainerId} style={styles.outer}>
            <div style={styles.inner}>{canvasContent}</div>
        </div>
    );
};

const mapStateToProps = state => ({
    error: sGetLoadError(state),
    loading: sGetIsLoading(state),
});

export default connect(mapStateToProps)(BlankCanvas);
