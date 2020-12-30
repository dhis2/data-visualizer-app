import pick from 'lodash-es/pick'

import { COLOR_SET_DEFAULT } from '@dhis2/analytics'

export const options = {
    axes: { requestable: false, savable: true },
    colorSet: {
        defaultValue: COLOR_SET_DEFAULT,
        requestable: false,
        savable: true,
    },
    cumulativeValues: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    hideEmptyRowItems: {
        defaultValue: 'NONE',
        requestable: false,
        savable: true,
    },
    legend: { requestable: false, savable: true },
    noSpaceBetweenColumns: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    percentStackedValues: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    regressionType: { defaultValue: 'NONE', requestable: false, savable: true },
    showData: { defaultValue: true, requestable: false, savable: true },
    aggregationType: {
        defaultValue: 'DEFAULT',
        requestable: true,
        savable: true,
    },
    completedOnly: { defaultValue: false, requestable: true, savable: true },
    hideSubtitle: { defaultValue: false, requestable: false, savable: true },
    hideTitle: { defaultValue: false, requestable: false, savable: true },
    sortOrder: { defaultValue: '0', requestable: false, savable: true },
    subtitle: { defaultValue: undefined, requestable: false, savable: true },
    title: { defaultValue: undefined, requestable: false, savable: true },
    series: { defaultValue: [], requestable: false, savable: true },
    fontStyle: {
        defaultValue: {},
        requestable: false,
        savable: true,
    },

    // only for PT
    colTotals: { defaultValue: false, requestable: false, savable: true },
    colSubTotals: { defaultValue: false, requestable: false, savable: true },
    rowTotals: { defaultValue: false, requestable: false, savable: true },
    rowSubTotals: { defaultValue: false, requestable: false, savable: true },
    showDimensionLabels: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    hideEmptyColumns: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    hideEmptyRows: { defaultValue: false, requestable: false, savable: true },
    skipRounding: { defaultValue: false, requestable: true, savable: true },
    numberType: { defaultValue: 'VALUE', requestable: false, savable: true },
    showHierarchy: { defaultValue: false, requestable: true, savable: true },
    legendSet: { defaultValue: undefined, requestable: false, savable: true },
    legendDisplayStrategy: {
        defaultValue: 'FIXED',
        requestable: false,
        savable: true,
    },
    legendDisplayStyle: {
        defaultValue: 'FILL',
        requestable: false,
        savable: true,
    },
    displayDensity: {
        defaultValue: 'NORMAL',
        requestable: false,
        savable: true,
    },
    fontSize: { defaultValue: 'NORMAL', requestable: false, savable: true },
    digitGroupSeparator: {
        defaultValue: 'SPACE',
        requestable: false,
        savable: true,
    },
    approvalLevel: {
        defaultValue: undefined,
        requestable: true,
        savable: false,
    },

    // these are stored in the AO under reportingParams
    reportingPeriod: { defaultValue: false, requestable: false, savable: true },
    organisationUnit: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    parentOrganisationUnit: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    // not exposed in UI
    grandParentOrganisationUnit: {
        defaultValue: false,
        requestable: false,
        savable: true,
    },
    regression: { defaultValue: false, requestable: false, savable: true },
    cumulative: { defaultValue: false, requestable: false, savable: true },
    measureCriteria: {
        defaultValue: undefined,
        requestable: true,
        savable: true,
    },
    topLimit: { defaultValue: '0', requestable: false, savable: true },
}

export const computedOptions = {
    axisRange: { defaultValue: undefined, requestable: false, savable: false },
    legend: { defaultValue: undefined, requestable: false, savable: false },
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

export const getOptionsFromVisualization = visualization => {
    const optionsFromVisualization = {
        ...getOptionsForUi(),
        ...pick(visualization, Object.keys(options)),
    }

    // nested options under reportingParams
    if (visualization.reportingParams) {
        optionsFromVisualization.organisationUnit =
            visualization.reportingParams.organisationUnit
        optionsFromVisualization.reportingPeriod =
            visualization.reportingParams.reportingPeriod
        optionsFromVisualization.parentOrganisationUnit =
            visualization.reportingParams.parentOrganisationUnit
        optionsFromVisualization.grandParentOrganisationUnit =
            visualization.reportingParams.grandParentOrganisationUnit
    }

    // cast option values from Number for some options
    ;['sortOrder', 'topLimit'].forEach(option => {
        if (Object.prototype.hasOwnProperty.call(visualization, option)) {
            optionsFromVisualization[option] = String(visualization[option])
        }
    })

    return optionsFromVisualization
}
