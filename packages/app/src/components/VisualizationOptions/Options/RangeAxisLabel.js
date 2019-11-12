import React from 'react';

import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption';
import { options } from '../../../modules/options';

const optionName = 'rangeAxisLabel';
const defaultValue = options[optionName].defaultValue;

const RangeAxisLabel = () => (
    <TextBaseOption
        type="text"
        label={i18n.t('Axis title')}
        placeholder={i18n.t('Add a title')}
        option={{
            name: optionName,
            defaultValue: defaultValue,
        }}
        toggleable={true}
    />
)

export default RangeAxisLabel
