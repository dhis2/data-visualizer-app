import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import LoadingMask from '../../widgets/LoadingMask';
import styles from './styles/BlankCanvas.style';
import { sGetLoadError, sGetIsLoading } from '../../reducers/loader';
import chartErrorImg from '../../assets/chart-error-graphic.png';

export const visContainerId = 'visualization-container';
export const defaultCanvasMessage =
    'Create a new visualization by adding dimensions to the layout';

const getMessage = text => <p style={styles.title}>{text}</p>;

export const BlankCanvas = ({ loading, error }) => {
    const canvasContent = error ? (
        <div>
            <img src={chartErrorImg} alt={i18n.t('Chart error')} />
            {getMessage(error)}
        </div>
    ) : (
        getMessage(i18n.t(defaultCanvasMessage))
    );

    return (
        <Fragment>
            {loading ? <LoadingMask /> : null}
            <div id={visContainerId} style={styles.outer}>
                <div style={styles.inner}>{canvasContent}</div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    error: sGetLoadError(state),
    loading: sGetIsLoading(state),
});

export default connect(mapStateToProps)(BlankCanvas);
