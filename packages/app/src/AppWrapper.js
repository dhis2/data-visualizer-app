import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { useDataEngine } from '@dhis2/app-runtime'

import { D2Shim } from './D2Shim'
import configureStore from './configureStore'
import metadataMiddleware from './middleware/metadata'
import App from './components/App'

import './locales'

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
            <D2Shim schemas={schemas}>{params => <App {...params} />}</D2Shim>
        </Provider>
    )
}

export default AppWrapper
