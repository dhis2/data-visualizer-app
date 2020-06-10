/* global DHIS_CONFIG, manifest */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import 'url-polyfill';
import history from './modules/history';

import { init as d2Init, config, getUserSettings } from 'd2';

import i18n from './locales';
import configureStore from './configureStore';
import metadataMiddleware from './middleware/metadata';

import App from './components/App';
import muiTheme from './modules/theme';
import { extractUserSettings } from './modules/settings';

const apiObjectName = 'chart';

const configI18n = async userSettings => {
    const uiLocale = userSettings.uiLocale;

    if (uiLocale && uiLocale !== 'en') {
        config.i18n.sources.add(
            `./i18n_old/i18n_module_${uiLocale}.properties`
        );
    }

    config.i18n.sources.add('./i18n_old/i18n_module_en.properties');
    i18n.changeLanguage(uiLocale);
};

const render = (location, baseUrl, d2, userSettings) => {
    const store = configureStore(metadataMiddleware);

    if (window.Cypress) {
        window.store = store;
    }

    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
                <App
                    location={location}
                    baseUrl={baseUrl}
                    d2={d2}
                    userSettings={userSettings}
                    apiObjectName={apiObjectName}
                />
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('root')
    );
};

const init = async () => {
    // log app info
    console.info(
        `Data Visualizer app, v${manifest.version}, ${
            manifest.manifest_generated_at
        }`
    );

    // d2 config
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = isProd
        ? manifest.activities.dhis.href
        : DHIS_CONFIG.baseUrl;

    config.baseUrl = `${baseUrl}/api/${manifest.dhis2.apiVersion}`;
    config.schemas = ['chart', 'organisationUnit', 'userGroup'];

    const userSettings = extractUserSettings(await getUserSettings());

    await configI18n(userSettings);

    const d2 = await d2Init({
        baseUrl: config.baseUrl,
    });

    render(history.location, baseUrl, d2, userSettings);
};

init();
