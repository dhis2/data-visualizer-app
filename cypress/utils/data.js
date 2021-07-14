import {
    VIS_TYPE_BAR,
    VIS_TYPE_COLUMN,
    VIS_TYPE_GAUGE,
    VIS_TYPE_LINE,
    VIS_TYPE_PIE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
    VIS_TYPE_SCATTER,
    VIS_TYPE_RADAR,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_STACKED_BAR,
    VIS_TYPE_STACKED_AREA,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
} from '@dhis2/analytics'

/*
    TODO:   Generate all content in this file based on endpoint results instead of hardcoding
            e.g. TEST_AOS could be generated like this:

    const getTestAOsFromEndpoint = () => {
        // fetch AOs from endpoint
        // find one AO per vis type
        // return AOs
    }
*/

export const TEST_AOS = [
    {
        name: 'Commodities: Child health consumption districts this year',
        type: VIS_TYPE_COLUMN,
    },
    {
        name: 'Immunization: Indicator bar chart last 12 months',
        type: VIS_TYPE_BAR,
    },
    {
        name: 'ANC: ANC 3rd visits by facility type last 12 months 100% stacked columns',
        type: VIS_TYPE_STACKED_COLUMN,
    },
    {
        name: 'Child Health: Diarrhoea <5',
        type: VIS_TYPE_LINE,
    },
    {
        name: 'OPD: New cases comparison this year',
        type: VIS_TYPE_PIE,
    },
    {
        name: 'Immunization: OPV 3 coverage last month',
        type: VIS_TYPE_GAUGE,
    },
    {
        name: 'Immunization: Indicators last 12 months radar',
        type: VIS_TYPE_RADAR,
    },
    {
        name: 'Immunization: FIC year over year',
        type: VIS_TYPE_YEAR_OVER_YEAR_LINE,
    },
    {
        name: 'Commodities: Child health last 12 months',
        type: VIS_TYPE_PIVOT_TABLE,
    },
    {
        name: 'Measles: Dropout rate v Coverage <1y per district',
        type: VIS_TYPE_SCATTER,
    },
    {
        name: 'BCG coverage last 12 months - Bo',
        type: VIS_TYPE_SINGLE_VALUE,
    },
    // {
    //     name: 'Expenditures: Expenses by districts area',
    //     type: VIS_TYPE_AREA,
    // }, // FIXME: replace with an AO that has data for "Last 2 six-month"
    {
        name: 'Nutrition: Malnutrition indicators stacked bar',
        type: VIS_TYPE_STACKED_BAR,
    },
    {
        name: 'Nutrition: Malnutrition indicators stacked area',
        type: VIS_TYPE_STACKED_AREA,
    },
    {
        name: 'Nutrition: Malnutrition this year vs last year',
        type: VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    },
]

export const TEST_DATA_ELEMENTS = [
    { id: 'RUv0hqER0zV', name: 'All other follow-ups' },
    { id: 'A2VfEfPflHV', name: 'All other new' },
    { id: 'laZLQdnucV1', name: 'All other referrals' },
    { id: 'HLPuaFB7Frw', name: 'Anaemia new' },
    { id: 's46m5MS0hxu', name: 'BCG doses given' },
]

export const TEST_INDICATORS = [
    { id: 'Uvn6LCg7dVU', name: 'ANC 1 Coverage' },
    { id: 'ReUHfIn0pTQ', name: 'ANC 1-3 Dropout Rate' },
    { id: 'OdiHJayrsKo', name: 'ANC 2 Coverage' },
    { id: 'sB79w2hiLp8', name: 'ANC 3 Coverage' },
    { id: 'AUqdhY4mpvp', name: 'ANC => 4 Coverage' },
]

export const TEST_DATA_SETS = [
    {
        id: 'VTdjfLXXmoi.REPORTING_RATE',
        name: 'Clinical Monitoring Checklist - Reporting rate',
    },
    {
        id: 'TuL8IOPzpHh.EXPECTED_REPORTS',
        name: 'EPI Stock - Expected reports',
    },
    {
        id: 'V8MHeZHIrcP.REPORTING_RATE_ON_TIME',
        name: 'Facility Assessment - Reporting rate on time',
    },
    {
        id: 'VTdjfLXXmoi.ACTUAL_REPORTS',
        name: 'Clinical Monitoring Checklist - Actual reports',
    },
    { id: 'rsyjyJmYD4J.REPORTING_RATE', name: 'Expenditures - Reporting rate' },
]

export const TEST_CUSTOM_DIMENSIONS = [
    {
        id: 'uIuxlbV1vRT',
        name: 'Area',
    },
    {
        id: 'gtuVl6NbXQV',
        name: 'Commodities',
    },
    {
        id: 'jp826jAJHUc',
        name: 'Diagnosis',
    },
]

export const TEST_DEFAULT_RECOMMENDED_DIMENSIONS = [
    {
        id: 'uIuxlbV1vRT',
        name: 'Area',
    },
    {
        id: 'Bpx0589u8y0',
        name: 'Facility Ownership',
    },
    {
        id: 'J5jldMd8OHv',
        name: 'Facility Type',
    },
]
