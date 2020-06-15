import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import { useState } from 'react'

import { init as d2Init, config as d2Config, getUserSettings } from 'd2'

import { extractUserSettings } from './modules/settings'
import { apiFetchOrganisationUnitLevels } from './api/organisationUnits'

import history from './modules/history'
import { Layer, CenteredContent, CircularLoader } from '@dhis2/ui'

const configI18n = async userSettings => {
    const uiLocale = userSettings.uiLocale

    // TODO: Remove and port to modern i18n
    if (uiLocale && uiLocale !== 'en') {
        d2Config.i18n.sources.add(
            `./i18n_old/i18n_module_${uiLocale}.properties`
        )
    }

    d2Config.i18n.sources.add('./i18n_old/i18n_module_en.properties')
}

const initD2 = async ({ baseUrl, apiVersion }, initConfig) => {
    const apiUrl = `${baseUrl}/api/${apiVersion}`

    d2Config.baseUrl = apiUrl

    const userSettings = extractUserSettings(await getUserSettings())
    await configI18n(userSettings)

    const d2 = await d2Init({
        ...initConfig,
        baseUrl: apiUrl,
    })

    const ouLevels = await apiFetchOrganisationUnitLevels()

    return { location: history.location, baseUrl, d2, userSettings, ouLevels }
}

export const D2Shim = ({ children, ...initConfig }) => {
    const appConfig = useConfig()
    const [params, setParams] = useState(null)

    useEffect(() => {
        initD2(appConfig, initConfig).then(setParams)
    }, []) /* eslint-disable-line react-hooks/exhaustive-deps */

    if (!params) {
        return (
            <Layer translucent>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </Layer>
        )
    }
    return children(params)
}

D2Shim.propTypes = {
    children: PropTypes.func,
}
