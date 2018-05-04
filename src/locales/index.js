import i18n from '@dhis2/d2-i18n';
import moment from 'moment';

import enTranslations from './en/translations.json';

const namespace = 'data-visualizer-app';
moment.locale('en');

i18n.addResources('en', namespace, enTranslations);

i18n.setDefaultNamespace(namespace);
i18n.changeLanguage('en');

export default i18n;
