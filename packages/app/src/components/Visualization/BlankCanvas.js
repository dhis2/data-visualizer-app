import React from 'react';

export const visContainerId = 'visualization-container';

const BlankCanvas = () => (
    <section className="canvas">
        <div id={visContainerId}>
            <div style={{ margin: 50 }}>Visualization Canvas</div>
        </div>
    </section>
);

export default BlankCanvas;
