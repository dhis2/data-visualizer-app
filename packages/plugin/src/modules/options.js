export const options = {
    baseLineLabel: { defaultValue: undefined, requestable: false },
    baseLineValue: { defaultValue: undefined, requestable: false },
    // colorSet:
    cumulativeValues: { defaultValue: false, requestable: false },
    domainAxisLabel: { defaultValue: undefined, requestable: false },
    hideEmptyRowItems: { defaultValue: 'NONE', requestable: false },
    hideLegend: { defaultValue: false, requestable: false },
    noSpaceBetweenColumns: { defaultValue: false, requestable: false },
    percentStackedValues: { defaultValue: false, requestable: false },
    rangeAxisDecimals: { defaultValue: undefined, requestable: false },
    rangeAxisLabel: { defaultValue: undefined, requestable: false },
    rangeAxisMaxValue: { defaultValue: undefined, requestable: false },
    rangeAxisMinValue: { defaultValue: undefined, requestable: false },
    rangeAxisSteps: { defaultValue: undefined, requestable: false },
    regressionType: { defaultValue: 'NONE', requestable: false },
    showData: { defaultValue: true, requestable: false },
    targetLineLabel: { defaultValue: undefined, requestable: false },
    targetLineValue: { defaultValue: undefined, requestable: false },
    // legendDisplayStrategy
    // legendSet
    aggregationType: { defaultValue: 'DEFAULT', requestable: true },
    completedOnly: { defaultValue: false, requestable: true },
    hideSubtitle: { defaultValue: false, requestable: false },
    hideTitle: { defaultValue: false, requestable: false },
    sortOrder: { defaultValue: 0, requestable: false },
    subtitle: { defaultValue: undefined, requestable: false },
    title: { defaultValue: undefined, requestable: false },
    // topLimit
};

export default options;

export const getOptionsForRequest = () => {
    return Object.entries(options).filter(
        ([option, props]) => props.requestable
    );
};
