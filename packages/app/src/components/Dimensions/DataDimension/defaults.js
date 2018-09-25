import i18n from '@dhis2/d2-i18n';

const REPORTING_RATES = 'REPORTING_RATES';
const REPORTING_RATES_ON_TIME = 'REPORTING_RATES_ON_TIME';
const ACTUAL_REPORTS = 'ACTUAL_REPORTS';
const ACTUAL_REPORTING_RATES_ON_TIME = 'ACTUAL_REPORTING_RATES_ON_TIME';
const EXPECTED_REPORTS = 'EXPECTED_REPORTS';
//const ALL_METRICS_REPORTS = 'ALL_METRICS_REPORTS';

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

//TODO: flytt / refactor
export const getReportingRates = (contents, groupSetId) => {
    let dataSets = [];

    const constant = DATA_SETS_CONSTANTS.find(item => {
        return item.id === groupSetId;
    });

    groupSetId === 'ALL'
        ? DATA_SETS_CONSTANTS.forEach(reports => {
              dataSets = [
                  ...dataSets,
                  ...contents.map(dataSet => {
                      return {
                          id: `${dataSet.id}.${reports.id}`,
                          displayName: `${dataSet.displayName} (${
                              reports.displayName
                          })`,
                      };
                  }),
              ];
          })
        : (dataSets = contents.map(item => {
              return {
                  id: `${item.id}.${constant.id}`,
                  displayName: `${item.displayName} (${constant.displayName})`,
              };
          }));

    return dataSets;
};

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
