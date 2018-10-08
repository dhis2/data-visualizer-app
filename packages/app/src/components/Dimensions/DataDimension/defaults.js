import i18n from '@dhis2/d2-i18n';

export const ALL_ID = 'ALL';

const ACTUAL_REPORTS = 'ACTUAL_REPORTS';
const ACTUAL_REPORTING_RATES_ON_TIME = 'ACTUAL_REPORTING_RATES_ON_TIME';
const EXPECTED_REPORTS = 'EXPECTED_REPORTS';
const REPORTING_RATES = 'REPORTING_RATES';
const REPORTING_RATES_ON_TIME = 'REPORTING_RATES_ON_TIME';

const INDICATORS = 'indicators';
export const DATA_ELEMENTS = 'dataElements';
export const DATA_SETS = 'dataSets';
const EVENT_DATA_ITEMS = 'eventDataItems';
const PROGRAM_INDICATORS = 'programIndicators';

export const dataTypes = {
    [INDICATORS]: {
        id: INDICATORS,
        displayName: i18n.t('Indicators'),
        groupLabel: i18n.t('Select indicator group'),
        defaultGroup: { id: ALL_ID, displayName: i18n.t('[ All groups ]') },
        groupDetail: false,
    },
    [DATA_ELEMENTS]: {
        id: DATA_ELEMENTS,
        displayName: i18n.t('Data elements'),
        groupLabel: i18n.t('Select data element group'),
        defaultGroup: {
            id: ALL_ID,
            displayName: i18n.t('[ All data elements ]'),
        },
        groupDetail: true,
    },
    [DATA_SETS]: {
        id: DATA_SETS,
        displayName: i18n.t('Data sets'),
        groupLabel: i18n.t('Select data sets'),
        defaultGroup: { id: ALL_ID, displayName: i18n.t('[ All metrics ]') },
        groupDetail: false,
        augmentAlternatives: (alternatives, groupId) =>
            getReportingRates(alternatives, groupId),
    },
    [EVENT_DATA_ITEMS]: {
        id: EVENT_DATA_ITEMS,
        displayName: i18n.t('Event data items'),
        groupLabel: i18n.t('Select program'),
        defaultGroup: null,
        groupDetail: false,
    },
    [PROGRAM_INDICATORS]: {
        id: PROGRAM_INDICATORS,
        displayName: i18n.t('Program indicators'),
        groupLabel: i18n.t('Select program'),
        defaultGroup: null,
        groupDetail: false,
    },
};

export const DEFAULT_DATATYPE_ID = INDICATORS;

export const DATA_SETS_CONSTANTS = [
    {
        id: REPORTING_RATES,
        displayName: i18n.t('Reporting rates'),
    },
    {
        id: REPORTING_RATES_ON_TIME,
        displayName: i18n.t('Reporting rates on time'),
    },
    {
        id: ACTUAL_REPORTS,
        displayName: i18n.t('Actual reports'),
    },
    {
        id: ACTUAL_REPORTING_RATES_ON_TIME,
        displayName: i18n.t('Actual reporting rates on time'),
    },
    {
        id: EXPECTED_REPORTS,
        displayName: i18n.t('Expected reports'),
    },
];

const getReportingRates = (contents, groupSetId) => {
    let dataSets = [];

    const reportingRateIndex = DATA_SETS_CONSTANTS.find(
        item => item.id === groupSetId
    );

    groupSetId === ALL_ID
        ? DATA_SETS_CONSTANTS.forEach(
              reportingRate =>
                  (dataSets = [
                      ...dataSets,
                      ...contents.map(dataSet =>
                          concatReportingRate(dataSet, reportingRate)
                      ),
                  ])
          )
        : (dataSets = contents.map(dataSet =>
              concatReportingRate(dataSet, reportingRateIndex)
          ));

    return dataSets;
};

const concatReportingRate = (dataSet, reportingRate) => {
    return {
        id: `${dataSet.id}.${reportingRate.id}`,
        displayName: `${dataSet.displayName} (${reportingRate.displayName})`,
    };
};
