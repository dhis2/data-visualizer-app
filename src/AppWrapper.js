import { CachedDataQueryProvider } from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import { DataStoreProvider } from '@dhis2/app-service-datastore'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import thunk from 'redux-thunk'
import { App } from './components/App.js'
import { ChartProvider } from './components/ChartProvider.js'
import configureStore from './configureStore.js'
import metadataMiddleware from './middleware/metadata.js'
import { USER_DATASTORE_NAMESPACE } from './modules/currentAnalyticalObject.js'
import { systemSettingsKeys } from './modules/systemSettings.js'
import { USER_SETTINGS_DISPLAY_PROPERTY } from './modules/userSettings.js'
import './locales/index.js'

const query = {
    currentUser: {
        resource: 'me',
        params: {
            fields: 'id,username,displayName~rename(name),settings,authorities',
        },
    },
    systemSettings: {
        resource: 'systemSettings',
    },
    rootOrgUnits: {
        resource: 'organisationUnits',
        params: {
            fields: 'id,displayName,name',
            userDataViewFallback: true,
            paging: false,
        },
    },
    orgUnitLevels: {
        resource: 'organisationUnitLevels',
        params: {
            fields: `id,level,displayName,name`,
            paging: false,
        },
    },
}

const providerDataTransformation = ({
    currentUser,
    systemSettings,
    rootOrgUnits,
    orgUnitLevels,
}) => ({
    currentUser: {
        ...currentUser,
        settings: {
            dbLocale: currentUser.settings.keyDbLocale,
            uiLocale: currentUser.settings.keyUiLocale,
            displayProperty:
                currentUser.settings[USER_SETTINGS_DISPLAY_PROPERTY],
            displayNameProperty:
                currentUser.settings[USER_SETTINGS_DISPLAY_PROPERTY] === 'name'
                    ? 'displayName'
                    : 'displayShortName',
        },
    },
    // filter only the relevant settings to avoid storing all in Redux
    systemSettings: systemSettingsKeys.reduce((obj, key) => {
        obj[key] = systemSettings[key]
        return obj
    }, {}),
    rootOrgUnits: rootOrgUnits.organisationUnits,
    orgUnitLevels: orgUnitLevels.organisationUnitLevels,
})

const AppWrapper = () => {
    const engine = useDataEngine()
    const store = configureStore([
        thunk.withExtraArgument(engine),
        metadataMiddleware,
    ])

    if (window.Cypress) {
        window.store = store
    }

    return (
        <ReduxProvider store={store}>
            <ChartProvider>
                <DataStoreProvider namespace={USER_DATASTORE_NAMESPACE}>
                    <CachedDataQueryProvider
                        query={query}
                        dataTransformation={providerDataTransformation}
                    >
                        <App />
                    </CachedDataQueryProvider>
                </DataStoreProvider>
            </ChartProvider>
        </ReduxProvider>
    )
}

export default AppWrapper
