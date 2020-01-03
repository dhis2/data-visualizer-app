import pick from 'lodash-es/pick'

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
    sortOrder: { defaultValue: '0', requestable: false },
    subtitle: { defaultValue: undefined, requestable: false },
    title: { defaultValue: undefined, requestable: false },

    // only for PT XXX
    colTotals: { defaultValue: false, requestable: false },
    colSubTotals: { defaultValue: false, requestable: false },
    rowTotals: { defaultValue: false, requestable: false },
    rowSubTotals: { defaultValue: false, requestable: false },
    showDimensionLabels: { defaultValue: false, requestable: false },
    hideEmptyColumns: { defaultValue: false, requestable: true },
    hideEmptyRows: { defaultValue: false, requestable: true },
    skipRounding: { defaultValue: false, requestable: true },
    numberType: { defaultValue: 'VALUE', requestable: false },
    showHierarchy: { defaultValue: false, requestable: true },
    legendSet: { defaultValue: 'NONE', requestable: false }, // XXX can be 'BY_DATA_ITEM'
    legendDisplayStyle: { defaultValue: 'FILL', requestable: false },
    displayDensity: { defaultValue: 'NORMAL', requestable: false },
    fontSize: { defaultValue: 'NORMAL', requestable: false },
    digitGroupSeparator: { defaultValue: 'SPACE', requestable: false },

    // XXX these are stored in the AO under reportParams
    paramReportingPeriod: { defaultValue: false, requestable: false },
    paramOrganisationUnit: { defaultValue: false, requestable: false },
    paramParentOrganisationUnit: { defaultValue: false, requestable: false },
    // XXX not in UI
    paramGrandParentOrganisationUnit: {
        defaultValue: false,
        requestable: false,
    },
    regression: { defaultValue: false, requestable: false },
    cumulative: { defaultValue: false, requestable: false },
    measureCriteria: { defaultValue: undefined, requestable: true },
    topLimit: { defaultValue: '0', requestable: false },
}

export const computedOptions = {
    baseLine: { defaultValue: false, requestable: false },
    targetLine: { defaultValue: false, requestable: false },
    axisRange: { defaultValue: undefined, requestable: false },
}

export default options

export const getOptionsForUi = () => {
    return Object.entries({ ...options, ...computedOptions }).reduce(
        (map, [option, props]) => {
            map[option] = props.defaultValue

            return map
        },
        {}
    )
}

export const getOptionsForRequest = () => {
    return Object.entries(options).filter(
        entry => entry[1].requestable // entry = [option, props]
    )
}

const isNotDefault = (optionsFromVisualization, prop) => {
    return Boolean(
        optionsFromVisualization[prop] &&
            optionsFromVisualization[prop] !== options[prop].defaultValue
    )
}

export const getOptionsFromVisualization = visualization => {
    const optionsFromVisualization = {
        ...getOptionsForUi(),
        ...pick(visualization, Object.keys(options)),
    }

    optionsFromVisualization.baseLine =
        isNotDefault(optionsFromVisualization, 'baseLineLabel') ||
        isNotDefault(optionsFromVisualization, 'baseLineValue')

    optionsFromVisualization.targetLine =
        isNotDefault(optionsFromVisualization, 'targetLineLabel') ||
        isNotDefault(optionsFromVisualization, 'targetLineValue')

    // nested options under reportParams
    if (visualization.reportParams) {
        optionsFromVisualization.paramOrganisationUnit =
            visualization.reportParams.paramOrganisationUnit
        optionsFromVisualization.paramReportingPeriod =
            visualization.reportParams.paramReportingPeriod
        optionsFromVisualization.paramParentOrganisationUnit =
            visualization.reportParams.paramParentOrganisationUnit
        optionsFromVisualization.paramGrandParentOrganisationUnit =
            visualization.reportParams.paramGrandParentOrganisationUnit
    }

    return optionsFromVisualization
}
