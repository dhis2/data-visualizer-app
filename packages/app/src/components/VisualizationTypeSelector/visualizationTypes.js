import i18n from '@dhis2/d2-i18n';

export const COLUMN = 'COLUMN';
export const STACKED_COLUMN = 'STACKEDCOLUMN';
export const BAR = 'BAR';
export const STACKED_BAR = 'STACKEDBAR';
export const LINE = 'LINE';
export const AREA = 'AREA';
export const PIE = 'PIE';
export const RADAR = 'RADAR';
export const GAUGE = 'GAUGE';
export const BUBBLE = 'BUBBLE';
export const YEAR_ON_YEAR = 'YEAR_ON_YEAR';

export const visualizationTypeMap = {
    [COLUMN]: i18n.t('Column'),
    [STACKED_COLUMN]: i18n.t('Stacked column'),
    [BAR]: i18n.t('Bar'),
    [STACKED_BAR]: i18n.t('Stacked bar'),
    [LINE]: i18n.t('Line'),
    [AREA]: i18n.t('Area'),
    [PIE]: i18n.t('Pie'),
    [RADAR]: i18n.t('Radar'),
    [GAUGE]: i18n.t('Gauge'),
    [BUBBLE]: i18n.t('Bubble'),
    [YEAR_ON_YEAR]: i18n.t('Year on year'),
};
