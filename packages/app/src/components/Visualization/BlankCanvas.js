import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import styles from './styles/BlankCanvas.style';
import { sGetLoadError } from '../../reducers/loader';
import chartErrorImg from '../../assets/chart-error-graphic.png';

export const visContainerId = 'visualization-container';
export const defaultCanvasMessage =
    'Create a new visualization by adding dimensions to the layout';

export const BlankCanvas = ({ error }) => {
    let canvasContent = (
        <p style={styles.title}>{i18n.t(defaultCanvasMessage)}</p>
    );

    if (error) {
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
        <Fragment>
            <div id={visContainerId} style={styles.outer}>
                <div style={styles.inner}>{canvasContent}</div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    error: sGetLoadError(state),
});

export default connect(mapStateToProps)(BlankCanvas);
