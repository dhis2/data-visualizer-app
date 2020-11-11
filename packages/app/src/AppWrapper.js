import React, { useState, useEffect, useCallback } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { useDataEngine } from '@dhis2/app-runtime'

import { D2Shim } from './D2Shim'
import configureStore from './configureStore'
import metadataMiddleware from './middleware/metadata'
import App from './components/App'
import { apiFetchOrganisationUnitLevels } from '@dhis2/analytics'
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

    return (
        <Provider store={store}>
            <D2Shim schemas={schemas}>
                {params => (
                    <App {...params} dataEngine={engine} ouLevels={ouLevels} />
                )}
            </D2Shim>
        </Provider>
    )
}

export default AppWrapper
