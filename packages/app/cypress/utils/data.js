import {
    VIS_TYPE_BAR,
    VIS_TYPE_COLUMN,
    VIS_TYPE_GAUGE,
    VIS_TYPE_LINE,
    VIS_TYPE_PIE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
} from '@dhis2/analytics'

//const getTestAOsFromEndpoint = () => {
// fetch AOs from endpoint
// find one AO per vis type
// return AOs
//}

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
        name:
            'ANC: ANC 3rd visits by facility type last 12 months 100% stacked columns',
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
        name: 'Immunization: FIC year over year',
        type: VIS_TYPE_YEAR_OVER_YEAR_LINE,
    },
    {
        name: 'Commodities: Child health last 12 months',
        type: VIS_TYPE_PIVOT_TABLE,
    },
]

export const TEST_DATA_ELEMENTS = [
    { id: 'dGdeotKpRed', name: 'ART enrollment stage 2' },
    { id: 'soACnRV9gOI', name: 'ART entry point: No transfer out' },
    { id: 'QrhlrvV6Xs8', name: 'ART new clients started on ARV' },
    { id: 'HLPuaFB7Frw', name: 'Anaemia new' },
    { id: 's46m5MS0hxu', name: 'BCG doses given' },
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
