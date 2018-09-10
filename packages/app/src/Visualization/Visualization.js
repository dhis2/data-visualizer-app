import React from 'react';
import { connect } from 'react-redux';
import { sGetCurrent } from '../reducers/current';
import { sGetVisualization } from '../reducers/visualization';
import { sGetUi } from '../reducers/ui';

const Visualization = props => {
    return (
        <section className="canvas">
            <div>Visualization Canvas</div>
        </section>
    );
};

const mapStateToProps = state => {
    const vis = sGetVisualization(state);
    const cur = sGetCurrent(state);
    console.log('vis === current', vis === cur);
    return {
        visualization: sGetVisualization(state),
        current: sGetCurrent(state),
        ui: sGetUi(state),
    };
};

export default connect(mapStateToProps)(Visualization);
