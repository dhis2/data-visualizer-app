import i18n from '@dhis2/d2-i18n';

const DX_DISPLAYNAME = i18n.t('Data');
const PE_DISPLAYNAME = i18n.t('Period');
const OU_DISPLAYNAME = i18n.t('Organisation Unit');

export const FIXED_DIMENSIONS = {
    dx: {
        id: 'dx',
        displayName: DX_DISPLAYNAME,
        iconName: 'DataIcon',
    },
    pe: {
        id: 'pe',
        displayName: PE_DISPLAYNAME,
        iconName: 'PeriodIcon',
    },
    ou: {
        id: 'ou',
        displayName: OU_DISPLAYNAME,
        iconName: 'OrgUnitIcon',
    },
};
