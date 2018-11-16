import i18n from '@dhis2/d2-i18n';

export const REPORTING_RATE = 'REPORTING_RATE';
export const REPORTING_RATE_ON_TIME = 'REPORTING_RATE_ON_TIME';
export const ACTUAL_REPORTS = 'ACTUAL_REPORTS';
export const ACTUAL_REPORTINS_ON_TIME = 'ACTUAL_REPORTING_RATES_ON_TIME';
export const EXPECTED_REPORTS = 'EXPECTED_REPORTS';

export const DATA_SETS_CONSTANTS = [
    {
        id: REPORTING_RATE,
        name: i18n.t('Reporting rates'),
    },
    {
        id: REPORTING_RATE_ON_TIME,
        name: i18n.t('Reporting rates on time'),
    },
    {
        id: ACTUAL_REPORTS,
        name: i18n.t('Actual reports'),
    },
    {
        id: ACTUAL_REPORTINS_ON_TIME,
        name: i18n.t('Actual reporting rates on time'),
    },
    {
        id: EXPECTED_REPORTS,
        name: i18n.t('Expected reports'),
    },
];
