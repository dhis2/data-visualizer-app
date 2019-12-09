import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { D2Shim } from './D2Shim'
import configureStore from './configureStore'
import metadataMiddleware from './middleware/metadata'
import App from './components/App'
import muiTheme from './modules/theme'

const store = configureStore(metadataMiddleware)

if (window.Cypress) {
    window.store = store
}

const schemas = ['chart', 'reportTable', 'organisationUnit', 'userGroup']

const AppWrapper = () => (
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
            <D2Shim schemas={schemas}>{params => <App {...params} />}</D2Shim>
        </MuiThemeProvider>
    </Provider>
)

export default AppWrapper
