import {
    USER_ORG_UNIT,
    USER_ORG_UNIT_CHILDREN,
    USER_ORG_UNIT_GRANDCHILDREN,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'

const getRelativePeriods = () => ({
    TODAY: i18n.t('Today'),
    YESTERDAY: i18n.t('Yesterday'),
    LAST_3_DAYS: i18n.t('Last 3 days'),
    LAST_7_DAYS: i18n.t('Last 7 days'),
    LAST_14_DAYS: i18n.t('Last 14 days'),
    THIS_WEEK: i18n.t('This week'),
    LAST_WEEK: i18n.t('Last week'),
    LAST_4_WEEKS: i18n.t('Last 4 weeks'),
    LAST_12_WEEKS: i18n.t('Last 12 weeks'),
    LAST_52_WEEKS: i18n.t('Last 52 weeks'),
    WEEKS_THIS_YEAR: i18n.t('Weeks this year'),
    THIS_MONTH: i18n.t('This month'),
    LAST_MONTH: i18n.t('Last month'),
    LAST_3_MONTHS: i18n.t('Last 3 months'),
    LAST_6_MONTHS: i18n.t('Last 6 months'),
    LAST_12_MONTHS: i18n.t('Last 12 months'),
    MONTHS_THIS_YEAR: i18n.t('Months this year'),
    THIS_BIMONTH: i18n.t('This bimonth'),
    LAST_BIMONTH: i18n.t('Last bimonth'),
    LAST_6_BIMONTHS: i18n.t('Last 6 bimonths'),
    BIMONTHS_THIS_YEAR: i18n.t('Bimonths this year'),
    THIS_QUARTER: i18n.t('This quarter'),
    LAST_QUARTER: i18n.t('Last quarter'),
    LAST_4_QUARTERS: i18n.t('Last 4 quarters'),
    QUARTERS_THIS_YEAR: i18n.t('Quarters this year'),
    THIS_SIX_MONTH: i18n.t('This six-month'),
    LAST_SIX_MONTH: i18n.t('Last six-month'),
    LAST_2_SIXMONTHS: i18n.t('Last 2 six-months'),
    THIS_FINANCIAL_YEAR: i18n.t('This financial year'),
    LAST_FINANCIAL_YEAR: i18n.t('Last financial year'),
    LAST_5_FINANCIAL_YEARS: i18n.t('Last 5 financial years'),
    THIS_YEAR: i18n.t('This year'),
    LAST_YEAR: i18n.t('Last year'),
    LAST_5_YEARS: i18n.t('Last 5 years'),
})

const getOrganisationUnits = () => ({
    [USER_ORG_UNIT]: i18n.t('User organisation unit'),
    [USER_ORG_UNIT_CHILDREN]: i18n.t('User sub-units'),
    [USER_ORG_UNIT_GRANDCHILDREN]: i18n.t('User sub-x2-units'),
})

export default function () {
    return Object.entries({
        ...getRelativePeriods(),
        ...getOrganisationUnits(),
    }).reduce((obj, [key, value]) => ({ ...obj, [key]: { name: value } }), {})
}
