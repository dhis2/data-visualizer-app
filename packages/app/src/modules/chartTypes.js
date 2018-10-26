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
export const YEAR_ON_YEAR = 'YEAR_ON_YEAR';

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
    [YEAR_ON_YEAR]: i18n.t('Year on year'),
};
