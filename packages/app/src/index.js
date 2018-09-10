/* global DHIS_CONFIG, manifest */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { init as d2Init, config, getUserSettings } from 'd2/lib/d2';

import i18n from './locales';
import configureStore from './configureStore';

import App from './App';
import { muiTheme } from './theme';

// tmp
import { MuiThemeProvider as V0MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const configI18n = async userSettings => {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale && uiLocale !== 'en') {
        config.i18n.sources.add(`./i18n/i18n_module_${uiLocale}.properties`);
    }

    config.i18n.sources.add('./i18n/i18n_module_en.properties');
    i18n.changeLanguage(uiLocale);
};

const render = (baseUrl, d2) => {
    ReactDOM.render(
        <Provider store={configureStore()}>
            <MuiThemeProvider theme={muiTheme()}>
                <V0MuiThemeProvider muiTheme={getMuiTheme({})}>
                    <App baseUrl={baseUrl} d2={d2} />
                </V0MuiThemeProvider>
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('root')
    );
};

const init = async () => {
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
    config.schemas = ['chart'];

    const userSettings = await getUserSettings();
    await configI18n(userSettings);

    const d2 = await d2Init({ baseUrl: config.baseUrl });
    render(baseUrl, d2);
};

init();
