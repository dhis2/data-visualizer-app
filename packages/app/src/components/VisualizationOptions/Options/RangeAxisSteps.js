import React from 'react';

import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption';

export const RangeAxisSteps = () => (
    <TextBaseOption
        type="number"
        helpText={i18n.t(
            'The number of axis steps between the min and max values'
        )}
        label={i18n.t('Steps')}
        placeholder={i18n.t('Auto')}
        option={{
            name: 'rangeAxisSteps',
        }}
    />
)

export default RangeAxisSteps;
