import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import styles from './styles/BlankCanvas.style';
import { sGetLoadError } from '../../reducers/loader';

export const defaultCanvasMessage =
    'Create a new visualization by adding dimensions to the layout';

export const BlankCanvas = ({ error }) => {
    let canvasContent = (
        <p style={styles.title}>{i18n.t(defaultCanvasMessage)}</p>
    );

    return (
        <div style={styles.outer}>
            <div style={styles.inner}>{canvasContent}</div>
        </div>
    );
};

const mapStateToProps = state => ({
    error: sGetLoadError(state),
});

export default connect(mapStateToProps)(BlankCanvas);
