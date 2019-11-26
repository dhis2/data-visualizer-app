import React from 'react'
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { D2Shim } from "./D2Shim";
import configureStore from './configureStore';
import metadataMiddleware from './middleware/metadata';
import App from './components/App';
import muiTheme from './modules/theme';

import 'url-polyfill';

const store = configureStore(metadataMiddleware);

if (window.Cypress) {
    window.store = store;
}

const apiObjectName = 'chart'

export default () => (
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
            <D2Shim>
                {(params) => (
                    <App apiObjectName={apiObjectName} {...params} />
                )}
            </D2Shim>
        </MuiThemeProvider>
    </Provider>
)