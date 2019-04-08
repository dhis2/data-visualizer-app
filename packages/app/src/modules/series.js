import { DEFAULT_UI } from '../reducers/ui';

export const getAxesFromChartSeries = chartSeries => {
    if (!(Array.isArray(chartSeries) && chartSeries.length)) {
        return DEFAULT_UI.axes;
    }

    return chartSeries
        .filter(series => typeof series.axis === 'number')
        .reduce((map, series) => {
            map[series.id] = series.axis;
            return map;
        }, {});
};
