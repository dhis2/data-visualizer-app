import i18n from 'd2-i18n';

import enTranslations from './en/translations.json';

const namespace = 'data-visualizer-app';

i18n.addResources('en', namespace, enTranslations);

i18n.setDefaultNamespace(namespace);
i18n.changeLanguage('en');

export default i18n;
