import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_REPORTING_PERIOD } from '../../../modules/options.js'
import { CheckboxBaseOption } from './CheckboxBaseOption.jsx'

const ParamReportingPeriod = () => (
    <CheckboxBaseOption
        label={i18n.t('Reporting period')}
        option={{
            name: OPTION_REPORTING_PERIOD,
        }}
    />
)

export default ParamReportingPeriod
