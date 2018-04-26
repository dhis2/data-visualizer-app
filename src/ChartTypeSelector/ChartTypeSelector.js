import React from 'react';
import { colors } from '../colors';

const style = {
    borderRight: `1px solid ${colors.charcoalGrey}`,
};

const ChartTypeSelector = props => {
    return (
        <div className="chart-type-selector" style={style}>
            ChartTypeSelector
        </div>
    );
};

export default ChartTypeSelector;
