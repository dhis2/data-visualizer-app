import i18n from '@dhis2/d2-i18n';

// Fixed years generator
const getFixedYears = len => {
    const currentYear = new Date().getFullYear();

    return new Array(len).fill(null).map((n, i) => ({
        id: String(currentYear - i),
        name: () => currentYear - i,
    }));
};

// Options for the year on year series dropdown
export const seriesOptions = [
    { id: 'THIS_YEAR', name: () => i18n.t('This year') },
    { id: 'LAST_YEAR', name: () => i18n.t('Last year') },
    { id: 'LAST_5_YEARS', name: () => i18n.t('Last 5 years') },
    ...getFixedYears(10),
];

// Options for the year on year category dropdown
export const categoryOptions = [
    { id: 'LAST_3_DAYS', name: () => i18n.t('Last 3 days') },
    { id: 'LAST_7_DAYS', name: () => i18n.t('Last 7 days') },
    { id: 'LAST_14_DAYS', name: () => i18n.t('Last 14 days') },
    { id: 'LAST_4_WEEKS', name: () => i18n.t('Last 4 weeks') },
    { id: 'LAST_12_WEEKS', name: () => i18n.t('Last 12 weeks') },
    { id: 'LAST_52_WEEKS', name: () => i18n.t('Last 52 weeks') },
    { id: 'WEEKS_THIS_YEAR', name: () => i18n.t('Weeks per year') },
    { id: 'LAST_3_MONTHS', name: () => i18n.t('Last 3 months') },
    { id: 'LAST_6_MONTHS', name: () => i18n.t('Last 6 months') },
    { id: 'LAST_12_MONTHS', name: () => i18n.t('Last 12 months') },
    { id: 'MONTHS_THIS_YEAR', name: () => i18n.t('Months per year') },
    { id: 'LAST_6_BIMONTHS', name: () => i18n.t('Last 6 bimonths') },
    { id: 'BIMONTHS_THIS_YEAR', name: () => i18n.t('Bimonths per year') },
    { id: 'LAST_4_QUARTERS', name: () => i18n.t('Last 4 quarters') },
    { id: 'QUARTERS_THIS_YEAR', name: () => i18n.t('Quarters per year') },
    { id: 'LAST_2_SIXMONTHS', name: () => i18n.t('Last 2 six-months') },
];
