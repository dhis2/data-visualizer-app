import { useConfig, useDataEngine } from '@dhis2/app-runtime'
import { D2Shim } from '@dhis2/app-runtime-adapter-d2'
import { DataStoreProvider } from '@dhis2/app-service-datastore'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import thunk from 'redux-thunk'
import { App } from './components/App.js'
import UserSettingsProvider, {
    UserSettingsCtx,
} from './components/UserSettingsProvider.js'
import configureStore from './configureStore.js'
import metadataMiddleware from './middleware/metadata.js'
import history from './modules/history.js'
import { USER_DATASTORE_NAMESPACE } from './modules/currentAnalyticalObject'
import './locales/index.js'

const AppWrapper = () => {
    const { baseUrl } = useConfig()
    const engine = useDataEngine()
    const store = configureStore([
        thunk.withExtraArgument(engine),
        metadataMiddleware,
    ])

    if (window.Cypress) {
        window.store = store
    }

    const schemas = ['visualization', 'organisationUnit', 'userGroup']
    const d2Config = {
        schemas,
    }

    return (
        <ReduxProvider store={store}>
            <DataStoreProvider namespace={USER_DATASTORE_NAMESPACE}>
                <UserSettingsProvider>
                    <UserSettingsCtx.Consumer>
                        {({ userSettings }) => {
                            return userSettings?.keyUiLocale ? (
                                <D2Shim
                                    d2Config={d2Config}
                                    i18nRoot="./i18n_old"
                                    locale={userSettings.keyUiLocale}
                                >
                                    {({ d2 }) => {
                                        if (!d2) {
                                            // TODO: Handle errors in d2 initialization
                                            return null
                                        } else {
                                            return (
                                                <App
                                                    d2={d2}
                                                    location={history.location}
                                                    baseUrl={baseUrl}
                                                    dataEngine={engine}
                                                    userSettings={userSettings}
                                                />
                                            )
                                        }
                                    }}
                                </D2Shim>
                            ) : null
                        }}
                    </UserSettingsCtx.Consumer>
                </UserSettingsProvider>
            </DataStoreProvider>
        </ReduxProvider>
    )
}

export default AppWrapper
