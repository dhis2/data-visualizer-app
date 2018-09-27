import i18n from '@dhis2/d2-i18n';

const ALL_INDICATORS = i18n.t('[ All indicators ]');
const ALL_DATA_ELEMENTS = i18n.t('[ All data elements ]');
const ALL_METRICS = i18n.t('[ All metrics ]');
const ALL_ID = 'ALL';

const ACTUAL_REPORTS = 'ACTUAL_REPORTS';
const ACTUAL_REPORTING_RATES_ON_TIME = 'ACTUAL_REPORTING_RATES_ON_TIME';
const EXPECTED_REPORTS = 'EXPECTED_REPORTS';
const REPORTING_RATES = 'REPORTING_RATES';
const REPORTING_RATES_ON_TIME = 'REPORTING_RATES_ON_TIME';

const SELECT_INDICATOR_GROUP = i18n.t('Select indicator group');
const SELECT_DATA_ELEMENTS_GROUP = i18n.t('Select data element group');
const SELECT_DATA_SET = i18n.t('Select data sets');
const SELECT_PROGRAM = i18n.t('Select program');

export const DATA_ELEMENTS = 'dataElements';
export const DATA_SETS = 'dataSets';
const EVENT_DATA_ITEMS = 'eventDataItems';
const PROGRAM_INDICATORS = 'programIndicators';

export const dataTypes = [
    {
        id: 'indicators',
        displayName: i18n.t('Indicators'),
    },
    {
        id: 'dataElements',
        displayName: i18n.t('Data Elements'),
    },
    {
        id: 'dataSets',
        displayName: i18n.t('Data sets'),
    },
    {
        id: 'eventDataItems',
        displayName: i18n.t('Event data items'),
    },
    {
        id: 'programIndicators',
        displayName: i18n.t('Program Indicator'),
    },
];

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

const DEFAULT_GROUPSET = {
    indicators: {
        label: SELECT_INDICATOR_GROUP,
        defaultAlternative: ALL_INDICATORS,
    },
    dataElements: {
        label: SELECT_DATA_ELEMENTS_GROUP,
        defaultAlternative: ALL_DATA_ELEMENTS,
    },
    dataSets: { label: SELECT_DATA_SET, defaultAlternative: ALL_METRICS },
};

export const getDefaultAlternative = currentGroupSet => {
    const haveDefaultAlternative =
        currentGroupSet !== EVENT_DATA_ITEMS &&
        currentGroupSet !== PROGRAM_INDICATORS;

    return haveDefaultAlternative
        ? {
              id: ALL_ID,
              displayName: DEFAULT_GROUPSET[currentGroupSet].defaultAlternative,
          }
        : null;
};

export const getInputLabel = currentGroupSet => {
    const haveDefaultAlternative =
        currentGroupSet !== EVENT_DATA_ITEMS &&
        currentGroupSet !== PROGRAM_INDICATORS;

    return haveDefaultAlternative
        ? DEFAULT_GROUPSET[currentGroupSet].label
        : SELECT_PROGRAM;
};

export const getReportingRates = (contents, groupSetId) => {
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
