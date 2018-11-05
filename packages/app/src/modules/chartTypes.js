import i18n from '@dhis2/d2-i18n';

export const COLUMN = 'COLUMN';
export const STACKED_COLUMN = 'STACKED_COLUMN';
export const BAR = 'BAR';
export const STACKED_BAR = 'STACKED_BAR';
export const LINE = 'LINE';
export const AREA = 'AREA';
export const PIE = 'PIE';
export const RADAR = 'RADAR';
export const GAUGE = 'GAUGE';
export const BUBBLE = 'BUBBLE';
export const YEAR_OVER_YEAR_LINE = 'YEAR_OVER_YEAR_LINE';
export const YEAR_OVER_YEAR_COLUMN = 'YEAR_OVER_YEAR_COLUMN';

export const chartTypeDisplayNames = {
    [COLUMN]: i18n.t('Column'),
    [STACKED_COLUMN]: i18n.t('Stacked column'),
    [BAR]: i18n.t('Bar'),
    [STACKED_BAR]: i18n.t('Stacked bar'),
    [LINE]: i18n.t('Line'),
    [AREA]: i18n.t('Area'),
    [PIE]: i18n.t('Pie'),
    [RADAR]: i18n.t('Radar'),
    [GAUGE]: i18n.t('Gauge'),
    [YEAR_OVER_YEAR_LINE]: i18n.t('Year over year (line)'),
    [YEAR_OVER_YEAR_COLUMN]: i18n.t('Year over year (column)'),
};

const stackedTypes = [STACKED_COLUMN, STACKED_BAR, AREA];
const yearOverYearTypes = [YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN];

export const isStacked = type => stackedTypes.includes(type);
export const isYearOverYear = type => yearOverYearTypes.includes(type);
