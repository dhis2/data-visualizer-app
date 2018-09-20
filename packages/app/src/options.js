import { getPropsByKeys } from './util';

export const options = {
    baseLineLabel: { defaultValue: '', requestable: false },
    baseLineValue: { defaultValue: 0, requestable: false },
    // colorSet:
    cumulativeValues: { defaultValue: false, requestable: false },
    domainAxisLabel: { defaultValue: '', requestable: false },
    hideEmptyRowItems: { defaultValue: 'NONE', requestable: false },
    hideLegend: { defaultValue: false, requestable: false },
    noSpaceBetweenColumns: { defaultValue: false, requestable: false },
    percentStackedValues: { defaultValue: false, requestable: false },
    rangeAxisDecimals: { defaultValue: 0, requestable: false },
    rangeAxisLabel: { defaultValue: '', requestable: false },
    rangeAxisMaxValue: { defaultValue: 0, requestable: false },
    rangeAxisMinValue: { defaultValue: 0, requestable: false },
    rangeAxisSteps: { defaultValue: 0, requestable: false },
    regressionType: { defaultValue: 'NONE', requestable: false },
    showData: { defaultValue: true, requestable: false },
    targetLineLabel: { defaultValue: '', requestable: false },
    targetLineValue: { defaultValue: 0, requestable: false },
    // legendDisplayStrategy
    // legendSet
    aggregationType: { defaultValue: '', requestable: true },
    completedOnly: { defaultValue: false, requestable: true },
    hideSubtitle: { defaultValue: false, requestable: false },
    hideTitle: { defaultValue: false, requestable: false },
    sortOrder: { defaultValue: 0, requestable: false },
    subtitle: { defaultValue: '', requestable: false },
    title: { defaultValue: '', requestable: false },
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

export const getOptionsFromVisualization = visualization => {
    const optionsFromVisualization = {
        ...getOptionsForUi(),
        ...getPropsByKeys(visualization, Object.keys(options)),
    };

    if (
        (optionsFromVisualization.baseLineLabel &&
            optionsFromVisualization.baseLineLabel !==
                options.baseLineLabel.defaultValue) ||
        (optionsFromVisualization.baseLineValue &&
            optionsFromVisualization.baseLineValue !==
                options.baseLineValue.defaultValue)
    ) {
        optionsFromVisualization.baseLine = true;
    }

    if (
        (optionsFromVisualization.targetLineLabel &&
            optionsFromVisualization.targetLineLabel !==
                options.targetLineLabel.defaultValue) ||
        (optionsFromVisualization.targetLineValue &&
            optionsFromVisualization.targetLineValue !==
                options.targetLineValue.defaultValue)
    ) {
        optionsFromVisualization.targetLine = true;
    }

    return optionsFromVisualization;
};
