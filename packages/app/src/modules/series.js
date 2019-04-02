import { DEFAULT_UI, sGetAxes } from '../reducers/ui';

export const getAxesFromChartSeries = chartSeries => {
    if (!(Array.isArray(chartSeries) && chartSeries.length)) {
        return sGetAxes(DEFAULT_UI);
    }

    return chartSeries
        .filter(series => typeof series.axis === 'number')
        .reduce((map, series) => {
            map[series.id] = series.axis;
            return map;
        }, {});
};
