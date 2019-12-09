import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import { useState } from 'react'

import { init as d2Init, config as d2Config, getUserSettings } from 'd2'

import { extractUserSettings } from './modules/settings'
import { apiFetchOrganisationUnitLevels } from './api/organisationUnits'

import history from './modules/history'
import { ScreenCover, CircularLoader } from '@dhis2/ui-core'

const configI18n = async () => {
    // TODO: Remove and port to modern i18n
    // if (uiLocale && uiLocale !== 'en') {
    //     config.i18n.sources.add(
    //         `./i18n_old/i18n_module_${uiLocale}.properties`
    //     );
    // }

    d2Config.i18n.sources.add('./i18n_old/i18n_module_en.properties')
}

const initD2 = async ({ baseUrl, apiVersion }, initConfig) => {
    const d2 = await d2Init({
        ...initConfig,
        baseUrl: `${baseUrl}/api/${apiVersion}`,
    })

    const userSettings = extractUserSettings(await getUserSettings())
    await configI18n(userSettings)

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
            <ScreenCover>
                <CircularLoader />
            </ScreenCover>
        )
    }
    return children(params)
}

D2Shim.propTypes = {
    children: PropTypes.func,
}
