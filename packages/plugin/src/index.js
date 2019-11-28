import React from 'react';

import ChartPlugin from './ChartPlugin';
import PivotPlugin from './PivotPlugin';

import { PIVOT_TABLE } from './modules/chartTypes';

const VisualizationPlugin = props => {
    if (!props.config.type || props.config.type === PIVOT_TABLE) {
        return <PivotPlugin {...props} />;
    } else {
        return <ChartPlugin {...props} />;
    }
};

export { default as chartTypes } from './modules/chartTypes'
export default VisualizationPlugin;