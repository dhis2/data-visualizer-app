import { CachedDataQueryProvider } from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import { DataStoreProvider } from '@dhis2/app-service-datastore'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App.js'
import configureStore from './configureStore.js'
import metadataMiddleware from './middleware/metadata.js'
import { USER_DATASTORE_NAMESPACE } from './modules/currentAnalyticalObject.js'
import { systemSettingsKeys } from './modules/systemSettings.js'
import {
    userSettingsKeys,
    USER_SETTINGS_DISPLAY_PROPERTY,
    DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY,
} from './modules/userSettings.js'
import './locales/index.js'

const query = {
    currentUser: {
        resource: 'me',
        params: {
            fields: 'id,username,displayName~rename(name),authorities',
        },
    },
    userSettings: {
        resource: 'userSettings',
        params: {
            key: userSettingsKeys,
        },
    },
    systemSettings: {
        resource: 'systemSettings',
        params: {
            key: systemSettingsKeys,
        },
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
        // TODO how to handle passing params like this?
        params: ({ displayNameProp = 'displayName' } = {}) => ({
            fields: `id,level,${displayNameProp}~rename(displayName),name`,
            paging: false,
        }),
    },
}

const providerDataTransformation = ({
    currentUser,
    userSettings,
    systemSettings,
    rootOrgUnits,
    orgUnitLevels,
}) => {
    return {
        currentUser,
        userSettings: {
            ...userSettings,
            [DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY]:
                userSettings[USER_SETTINGS_DISPLAY_PROPERTY] === 'name'
                    ? 'displayName'
                    : 'displayShortName',
        },
        systemSettings,
        rootOrgUnits: rootOrgUnits.organisationUnits,
        orgUnitLevels: orgUnitLevels.organisationUnitLevels,
    }
}

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
            <DataStoreProvider namespace={USER_DATASTORE_NAMESPACE}>
                <CachedDataQueryProvider
                    query={query}
                    dataTransformation={providerDataTransformation}
                >
                    <App />
                </CachedDataQueryProvider>
            </DataStoreProvider>
        </ReduxProvider>
    )
}

export default AppWrapper
