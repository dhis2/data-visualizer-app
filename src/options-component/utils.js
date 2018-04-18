// Temporary files for Strings/placeholders
const strings = {
    chartOptionsTitle: 'Chart Options',
    dataTabLabel: 'Data',
    axesTabLabel: 'Axes & legend',
    styleTabLabel: 'Style',
    noSpace: 'No space between columns/bars',
    chartTitle: 'Chart Options',
    data: {
        values: 'Show Values',
        stacked: 'Use 100% Stacked values',
        cumulative: 'Use cumulative values',
        targetLineValue: 'Target line value',
        targetLineTitle: 'Target line title',
        baseLineValue: 'Base line value',
        baseLineTitle: 'Base line title',

        hideEmptyCategories: {
            defaultValue: 'Hide empty categories',
            alternatives: [
                'None',
                'Before first',
                'After last',
                'Before first and after last',
                'All',
            ],
        },
        trendLine: {
            defaultValue: 'Trend line',
            alternatives: ['None', 'Linear', 'Polynomial', 'Loess'],
        },
        sortOrder: {
            defaultValue: 'Sort order',
            alternatives: ['None', 'Low to high', 'High to low'],
        },
        aggregation: {
            defaultValue: 'Aggregation type',
            alternatives: [
                'By data element',
                'Count',
                'Average',
                'Average (sum in org unit hierarchy)',
                'Sum',
                'Standard deviation',
                'Variance',
                'Min',
                'Max',
                'Last Value',
                'Last value (average in org unit hierarchy)',
            ],
        },
    },
    axes: {
        axisMin: 'Range axis min',
        axisMax: 'Range axis max',
        tickSteps: 'Range axis tick step',
        decimals: 'Range axis decimals',
        rangeTitle: 'Range axis title',
        domainTitle: 'Domain axis title',
        domainSubtitle: 'Domain axis subtitle',
        hideChartTitle: 'Hide chart title',
        hideLegend: 'Hide chart legend',
        hideSubtitle: 'Hide chart subtitle',
    },
};
export default strings;
