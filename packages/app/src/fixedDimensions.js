import i18n from '@dhis2/d2-i18n';
import { DataIcon, PeriodIcon, OrgUnitIcon } from './icons';

const DX_DISPLAYNAME = i18n.t('Data');
const PE_DISPLAYNAME = i18n.t('Period');
const OU_DISPLAYNAME = i18n.t('Organisation Unit');

export const FIXED_DIMENSIONS = {
    dx: {
        id: 'dx',
        displayName: DX_DISPLAYNAME,
        iconName: 'DataIcon',
        icon: DataIcon,
    },
    pe: {
        id: 'pe',
        displayName: PE_DISPLAYNAME,
        iconName: 'PeriodIcon',
        icon: PeriodIcon,
    },
    ou: {
        id: 'ou',
        displayName: OU_DISPLAYNAME,
        iconName: 'OrgUnitIcon',
        icon: OrgUnitIcon,
    },
};
