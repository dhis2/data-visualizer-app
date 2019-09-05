import React from 'react';
import i18n from '@dhis2/d2-i18n';
import styles from './styles/BlankCanvas.style';
import chartErrorImg from '../../assets/chart-error-graphic.png';

export const defaultCanvasMessage = i18n.t(
    'Create a new visualization by adding dimensions to the layout'
);

const getMessage = text => <p style={styles.title}>{text}</p>;

export const BlankCanvas = ({ error }) => {
    const canvasContent = error ? (
        <div>
            <img src={chartErrorImg} alt={i18n.t('Chart error')} />
            {getMessage(error)}
        </div>
    ) : (
        getMessage(defaultCanvasMessage)
    );

    return (
        <div style={styles.outer}>
            <div style={styles.inner}>{canvasContent}</div>
        </div>
    );
};

export default BlankCanvas;
