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
export const OPEN_AS_MAP = 'OPEN_AS_MAP';

export const chartTypes = [
    COLUMN,
    STACKED_COLUMN,
    BAR,
    STACKED_BAR,
    LINE,
    AREA,
    PIE,
    RADAR,
    GAUGE,
    YEAR_OVER_YEAR_LINE,
    YEAR_OVER_YEAR_COLUMN,
    OPEN_AS_MAP,
];

export const getChartTypeDisplayName = type => {
    const chartTypes = {
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
        [OPEN_AS_MAP]: i18n.t('Open as Map'), // TODO Open as: Map when i18next nsSeparator fixed
    };
    return chartTypes[type];
};

const stackedTypes = [STACKED_COLUMN, STACKED_BAR, AREA];
const yearOverYearTypes = [YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN];
const openAsTypes = [OPEN_AS_MAP];
const dualAxisTypes = [COLUMN, BAR, LINE, AREA];

export const defaultChartType = COLUMN;
export const isStacked = type => stackedTypes.includes(type);
export const isYearOverYear = type => yearOverYearTypes.includes(type);
export const isOpenAsType = type => openAsTypes.includes(type);
export const isDualAxisType = type => dualAxisTypes.includes(type);
