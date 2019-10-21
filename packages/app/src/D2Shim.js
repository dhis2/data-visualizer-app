import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import { useState } from 'react';

import { init as d2Init, config as d2Config, getUserSettings } from 'd2';

import { extractUserSettings } from './modules/settings';
import { apiFetchOrganisationUnitLevels } from './api/organisationUnits';

import history from './modules/history';
import LoadingMask from './widgets/LoadingMask';

const configI18n = async () => {

    // TODO: Remove and port to modern i18n
    // if (uiLocale && uiLocale !== 'en') {
    //     config.i18n.sources.add(
    //         `./i18n_old/i18n_module_${uiLocale}.properties`
    //     );
    // }


    d2Config.i18n.sources.add('./i18n_old/i18n_module_en.properties');
};

const initD2 = async ({ baseUrl, apiVersion }) => {
    // console.info(
    //     `Data Visualizer app, v${manifest.version}, ${manifest.manifest_generated_at}`
    // );

    d2config.baseUrl = `${baseUrl}/api/${apiVersion}`;
    d2config.schemas = ['chart', 'organisationUnit', 'userGroup'];

    const userSettings = extractUserSettings(await getUserSettings());

    await configI18n(userSettings);

    const d2 = await d2Init({
        baseUrl,
    });

    const ouLevels = await apiFetchOrganisationUnitLevels();

    return { location: history.location, baseUrl, d2, userSettings, ouLevels }
}

export const D2Shim = ({ children }) => {
    const config = useConfig()
    const [params, setParams] = useState(null)

    useEffect(() => {
        initD2(config)
            .then(setParams)
    }, [config])

    if (!params) {
        return <LoadingMask />
    }
    return children(params)
}

D2Shim.propTypes = {
    children: PropTypes.func
}
