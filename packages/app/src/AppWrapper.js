import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { useDataEngine } from '@dhis2/app-runtime'

import { D2Shim } from './D2Shim'
import configureStore from './configureStore'
import metadataMiddleware from './middleware/metadata'
import App from './components/App'
import muiTheme from './modules/theme'

const AppWrapper = () => {
    const engine = useDataEngine()
    const store = configureStore([
        thunk.withExtraArgument(engine),
        metadataMiddleware,
    ])

    if (window.Cypress) {
        window.store = store
    }

    const schemas = ['visualization', 'organisationUnit', 'userGroup']

    return (
        <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
                <D2Shim schemas={schemas}>
                    {params => <App {...params} />}
                </D2Shim>
            </MuiThemeProvider>
        </Provider>
    )
}

export default AppWrapper
