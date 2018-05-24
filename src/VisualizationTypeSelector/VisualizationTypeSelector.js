import React from 'react';
import { colors } from '../colors';

const style = {
    borderRight: `1px solid ${colors.charcoalGrey}`,
};

const VisualizationTypeSelector = props => {
    return (
        <div className="visualization-type-selector" style={style}>
            VisualizationTypeSelector
        </div>
    );
};

export default VisualizationTypeSelector;
