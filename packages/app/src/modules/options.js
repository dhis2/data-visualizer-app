import pick from 'lodash-es/pick';

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

export const computedOptions = {
    baseLine: { defaultValue: false, requestable: false },
    targetLine: { defaultValue: false, requestable: false },
};

export default options;

export const getOptionsForUi = () => {
    return Object.entries({ ...options, ...computedOptions }).reduce(
        (map, [option, props]) => {
            map[option] = props.defaultValue;

            return map;
        },
        {}
    );
};

export const getOptionsForRequest = () => {
    return Object.entries(options).filter(
        ([option, props]) => props.requestable
    );
};

const isNotDefault = (optionsFromVisualization, prop) => {
    return Boolean(
        optionsFromVisualization[prop] &&
            optionsFromVisualization[prop] !== options[prop].defaultValue
    );
};

export const getOptionsFromVisualization = visualization => {
    const optionsFromVisualization = {
        ...getOptionsForUi(),
        ...pick(visualization, Object.keys(options)),
    };

    optionsFromVisualization.baseLine =
        isNotDefault(optionsFromVisualization, 'baseLineLabel') ||
        isNotDefault(optionsFromVisualization, 'baseLineValue');

    optionsFromVisualization.targetLine =
        isNotDefault(optionsFromVisualization, 'targetLineLabel') ||
        isNotDefault(optionsFromVisualization, 'targetLineValue');

    return optionsFromVisualization;
};
