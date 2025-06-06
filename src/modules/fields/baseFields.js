export const BASE_FIELD_NAME = 'name'
export const BASE_FIELD_TYPE = 'type'
export const BASE_FIELD_YEARLY_SERIES = 'yearlySeries'

const getFieldObject = (name, props = {}) => ({
    [BASE_FIELD_NAME]: name,
    ...props,
})

// fields by type

export const fieldsByType = {
    reportTable: [
        getFieldObject('cumulative', { option: true }),
        getFieldObject('hideEmptyColumns', { option: true }),
        getFieldObject('measureCriteria', { option: true }),
        getFieldObject('numberType', { option: true }),
        getFieldObject('regression', { option: true }),
        getFieldObject('reportingParams', { option: true }),
        getFieldObject('skipRounding', { option: true }),
        getFieldObject('fixColumnHeaders', { option: true }),
        getFieldObject('fixRowHeaders', { option: true }),
    ],
    chart: [
        getFieldObject('category', { excluded: true }),
        getFieldObject('icons', { option: true }),
        getFieldObject(BASE_FIELD_YEARLY_SERIES),
    ],
    eventReport: [getFieldObject('dataType')],
    reportTable_eventReport: [
        getFieldObject('colSubTotals', { option: true }),
        getFieldObject('colTotals', { option: true }),
        getFieldObject('displayDensity', { option: true }),
        getFieldObject('fontSize', { option: true }),
        getFieldObject('hideEmptyRows', { option: true }),
        getFieldObject('rowSubTotals', { option: true }),
        getFieldObject('rowTotals', { option: true }),
        getFieldObject('showDimensionLabels', { option: true }),
        getFieldObject('showHierarchy', { option: true }),
    ],
    chart_eventChart: [
        getFieldObject('axes', { option: true }),
        getFieldObject('colorSet', { option: true }),
        getFieldObject('cumulativeValues', { option: true }),
        getFieldObject('fontStyle', { option: true }),
        getFieldObject('hideEmptyRowItems', { option: true }),
        getFieldObject('seriesKey', { option: true }),
        getFieldObject('legend', { option: true }),
        getFieldObject('noSpaceBetweenColumns', { option: true }),
        getFieldObject('percentStackedValues', { option: true }),
        getFieldObject('regressionType', { option: true }),
        getFieldObject('series', { option: true }),
        getFieldObject('showData', { option: true }),
        getFieldObject('outlierAnalysis', { option: true }),
        getFieldObject(BASE_FIELD_TYPE, { option: true }),
    ],
    eventReport_eventChart: [
        getFieldObject('attributeValueDimension'),
        getFieldObject('collapseDataDimensions'),
        getFieldObject('dataElementValueDimension'),
        getFieldObject('endDate'),
        getFieldObject('eventStatus', { option: true }),
        getFieldObject('hideNaData', { option: true }),
        getFieldObject('outputType', { option: true }),
        getFieldObject('program'),
        getFieldObject('programStage'),
        getFieldObject('programStatus', { option: true }),
        getFieldObject('startDate'),
        getFieldObject('value'),
    ],
    reportTable_eventReport_eventChart: [
        getFieldObject('columnDimensions', { excluded: true }),
        getFieldObject('rowDimensions', { excluded: true }),
    ],
    reportTable_chart_eventReport_eventChart: [
        getFieldObject('access'),
        getFieldObject('aggregationType', { option: true }),
        getFieldObject('attributeDimensions', { excluded: true }),
        getFieldObject('attributeValues', { excluded: true }),
        getFieldObject('categoryDimensions', { excluded: true }),
        getFieldObject('categoryOptionGroupSetDimensions', { excluded: true }),
        getFieldObject('code', { excluded: true }),
        getFieldObject('columns'),
        getFieldObject('completedOnly', { option: true }),
        getFieldObject('created'),
        getFieldObject('dataDimensionItems'),
        getFieldObject('dataElementDimensions', { excluded: true }),
        getFieldObject('dataElementGroupSetDimensions', { excluded: true }),
        getFieldObject('description'),
        getFieldObject('digitGroupSeparator'),
        getFieldObject('displayDescription'),
        getFieldObject('displayName'),
        getFieldObject('displayShortName'),
        getFieldObject('displaySubtitle'),
        getFieldObject('displayTitle'),
        getFieldObject('favorite'),
        getFieldObject('favorites'),
        getFieldObject('filterDimensions', { excluded: true }),
        getFieldObject('filters'),
        getFieldObject('hideSubtitle', { option: true }),
        getFieldObject('hideTitle', { option: true }),
        getFieldObject('href'), // required by the TranslationModal in analytics
        getFieldObject('id'),
        getFieldObject('interpretations'),
        getFieldObject('itemOrganisationUnitGroups', { excluded: true }),
        getFieldObject('lastUpdated'),
        getFieldObject('lastUpdatedBy'),
        getFieldObject('name'),
        getFieldObject('organisationUnitGroupSetDimensions', {
            excluded: true,
        }),
        getFieldObject('organisationUnitLevels', { excluded: true }),
        getFieldObject('organisationUnits', { excluded: true }),
        getFieldObject('parentGraphMap'),
        getFieldObject('periods', { excluded: true }),
        getFieldObject('programIndicatorDimensions', { excluded: true }),
        getFieldObject('relativePeriods', { excluded: true }),
        getFieldObject('rows'),
        getFieldObject('shortName'),
        getFieldObject('sorting'),
        getFieldObject('sortOrder', { option: true }),
        getFieldObject('subscribed'),
        getFieldObject('subscribers'),
        getFieldObject('subtitle', { option: true }),
        getFieldObject('timeField'),
        getFieldObject('title', { option: true }),
        getFieldObject('topLimit', { option: true }),
        getFieldObject('translations'),
        getFieldObject('user'),
        getFieldObject('userOrganisationUnit', { excluded: true }),
        getFieldObject('userOrganisationUnitChildren', { excluded: true }),
        getFieldObject('userOrganisationUnitGrandChildren', { excluded: true }),
    ],
}

fieldsByType.visualization = [
    ...fieldsByType.reportTable,
    ...fieldsByType.chart,
    ...fieldsByType.reportTable_eventReport,
    ...fieldsByType.chart_eventChart,
    ...fieldsByType.reportTable_eventReport_eventChart,
    ...fieldsByType.reportTable_chart_eventReport_eventChart,
]

// actions

export const extractName = (propObj) => propObj[BASE_FIELD_NAME]

export const markExcluded = (fieldObj) =>
    fieldObj.excluded === true
        ? { ...fieldObj, [BASE_FIELD_NAME]: `!${fieldObj[BASE_FIELD_NAME]}` }
        : fieldObj

/* eslint-disable-next-line max-params */
export const moveExcludedToEnd = (acc, current, curIndex, array) => {
    !acc && (acc = array.slice())
    current.charAt(0) === '!' && acc.push(acc.shift())
    return acc
}

// getters

export const getAllFieldObjectsByType = (type) =>
    Object.entries(fieldsByType).reduce(
        (fields, [key, value]) =>
            key.includes(type) ? fields.concat(value) : fields,
        []
    )
