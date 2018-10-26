import i18n from '@dhis2/d2-i18n';
import DataIcon from '../assets/DataIcon';
import PeriodIcon from '../assets/PeriodIcon';
import OrgUnitIcon from '../assets/OrgUnitIcon';

export const FIXED_DIMENSIONS = {
    dx: {
        id: 'dx',
        name: i18n.t('Data'),
        iconName: 'DataIcon',
        icon: DataIcon,
    },
    pe: {
        id: 'pe',
        name: i18n.t('Period'),
        iconName: 'PeriodIcon',
        icon: PeriodIcon,
    },
    ou: {
        id: 'ou',
        name: i18n.t('Organisation Unit'),
        iconName: 'OrgUnitIcon',
        icon: OrgUnitIcon,
    },
};
