/* global DHIS_CONFIG, manifest */

import React from 'react';
import ReactDOM from 'react-dom';

import D2UIApp from '@dhis2/d2-ui-app';
import { init as d2Init, config } from 'd2/lib/d2';

import App from './App';

const render = (baseUrl, d2) => {
    ReactDOM.render(
        <D2UIApp>
            <App d2={d2} />
        </D2UIApp>,
        document.getElementById('root')
    );
};

const init = async () => {
    // d2 config
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = isProd
        ? manifest.activities.dhis.href
        : DHIS_CONFIG.baseUrl;
    config.baseUrl = `${baseUrl}/api/${manifest.dhis2.apiVersion}`;
    config.headers = isProd
        ? null
        : { Authorization: DHIS_CONFIG.authorization };
    config.schemas = ['reportTable', 'chart', 'eventReport', 'eventChart'];

    const d2 = await d2Init({ baseUrl: config.baseUrl });
    render(baseUrl, d2);
};

init();
