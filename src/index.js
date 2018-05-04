/* global DHIS_CONFIG, manifest */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';

import i18n from './locales';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { D2UIApp } from '@dhis2/d2-ui-core';

import { config, getUserSettings } from 'd2/lib/d2';

import configureStore from './configureStore';

import App from './App';
import { muiTheme } from './theme';

const configI18n = userSettings => {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale && uiLocale !== 'en') {
        config.i18n.sources.add(`./i18n/i18n_module_${uiLocale}.properties`);
    }

    config.i18n.sources.add('./i18n/i18n_module_en.properties');
    i18n.changeLanguage(uiLocale);
};

const render = (config, baseUrl) => {
    ReactDOM.render(
        <D2UIApp initConfig={config}>
            <Provider store={configureStore()}>
                <MuiThemeProvider theme={muiTheme()}>
                    <App baseUrl={baseUrl} />
                </MuiThemeProvider>
            </Provider>
        </D2UIApp>,
        document.getElementById('root')
    );
};

const init = () => {
    // init material-ui
    injectTapEventPlugin();

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
    config.headers = isProd
        ? null
        : { Authorization: DHIS_CONFIG.authorization };

    getUserSettings()
        .then(configI18n)
        .then(() => {
            config.schemas = ['chart'];

            render(config, baseUrl);
        });
};

init();
