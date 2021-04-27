import React, { useState, useEffect, useCallback } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import thunk from 'redux-thunk'
import { useConfig, useDataEngine } from '@dhis2/app-runtime'

import { D2Shim } from '@dhis2/app-runtime-adapter-d2'
import history from './modules/history'
import configureStore from './configureStore'
import metadataMiddleware from './middleware/metadata'
import App from './components/App'
import UserSettingsProvider, {
    UserSettingsCtx,
} from './components/UserSettingsProvider'
import { apiFetchOrganisationUnitLevels } from '@dhis2/analytics'
import './locales'

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

    const [ouLevels, setOuLevels] = useState(null)

    const doFetchOuLevelsData = useCallback(async () => {
        const ouLevels = await apiFetchOrganisationUnitLevels(engine)

        return ouLevels
    }, [engine])

    useEffect(() => {
        const doFetch = async () => {
            const ouLevelsData = await doFetchOuLevelsData()

            setOuLevels(ouLevelsData)
        }

        doFetch()

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [])

    const schemas = ['visualization', 'organisationUnit', 'userGroup']
    const d2Config = {
        schemas,
    }

    return (
        <ReduxProvider store={store}>
            <UserSettingsProvider>
                <UserSettingsCtx.Consumer>
                    {({ userSettings }) => {
                        return userSettings?.keyUiLocale ? (
                            <D2Shim
                                d2Config={d2Config}
                                i18nRoot="./i18n-old"
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
                                                ouLevels={ouLevels}
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
        </ReduxProvider>
    )
}

export default AppWrapper
