export const options = {
    baseLineLabel: { defaultValue: null, requestable: false },
    baseLineValue: { defaultValue: null, requestable: false },
    // colorSet:
    cumulativeValues: { defaultValue: false, requestable: false },
    domainAxisLabel: { defaultValue: null, requestable: false },
    hideEmptyRowItems: { defaultValue: 'NONE', requestable: false },
    hideLegend: { defaultValue: false, requestable: false },
    noSpaceBetweenColumns: { defaultValue: false, requestable: false },
    percentStackedValues: { defaultValue: false, requestable: false },
    rangeAxisDecimals: { defaultValue: null, requestable: false },
    rangeAxisLabel: { defaultValue: null, requestable: false },
    rangeAxisMaxValue: { defaultValue: null, requestable: false },
    rangeAxisMinValue: { defaultValue: null, requestable: false },
    rangeAxisSteps: { defaultValue: null, requestable: false },
    regressionType: { defaultValue: 'NONE', requestable: false },
    showData: { defaultValue: true, requestable: false },
    targetLineLabel: { defaultValue: null, requestable: false },
    targetLineValue: { defaultValue: null, requestable: false },
    // legendDisplayStrategy
    // legendSet
    aggregationType: { defaultValue: null, requestable: true },
    completedOnly: { defaultValue: false, requestable: true },
    hideSubtitle: { defaultValue: false, requestable: false },
    hideTitle: { defaultValue: false, requestable: false },
    sortOrder: { defaultValue: 0, requestable: false },
    subtitle: { defaultValue: null, requestable: false },
    title: { defaultValue: null, requestable: false },
    // topLimit
};

export default options;

export const getOptionsDefaultValues = () => {
    return Object.entries(options).reduce((map, [option, props]) => {
        map[option] = props.defaultValue;

        return map;
    }, {});
};

export const getOptionsForRequest = () => {
    return Object.entries(options).filter(
        ([option, props]) => props.requestable
    );
};
