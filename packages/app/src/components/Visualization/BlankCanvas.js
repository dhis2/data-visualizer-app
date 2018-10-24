import React from 'react';
import { connect } from 'react-redux';
import { sGetLoadError } from '../../reducers/loadError';

export const visContainerId = 'visualization-container';
export const defaultCanvasMessage = 'Visualization Canvas';

export const BlankCanvas = ({ error }) => {
    const message = error ? error : defaultCanvasMessage;

    return (
        <section className="canvas">
            <div id={visContainerId}>
                <div style={{ margin: 20 }}>
                    <span>{message}</span>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state => ({
    error: sGetLoadError(state),
});

export default connect(mapStateToProps)(BlankCanvas);
