import React from 'react';
import { connect } from 'react-redux';
import { sGetCurrent } from '../../reducers/current';
import { sGetVisualization } from '../../reducers/visualization';
import { sGetUi } from '../../reducers/ui';

const renderVisualizationName = props =>
    props.visualization ? <h3>{props.visualization.name}</h3> : '';

const Visualization = props => (
    <section className="canvas">
        <div>Visualization Canvas</div>
        {renderVisualizationName(props)}
    </section>
);

const mapStateToProps = state => ({
    visualization: sGetVisualization(state),
    current: sGetCurrent(state),
    ui: sGetUi(state),
});

export default connect(mapStateToProps)(Visualization);
