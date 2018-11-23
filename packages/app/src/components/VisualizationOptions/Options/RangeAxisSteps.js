import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const RangeAxisSteps = ({ className }) => (
    <TextBaseOption
        className={className}
        type="number"
        option={{
            name: 'rangeAxisSteps',
            label: i18n.t('Range axis tick steps'),
        }}
    />
);

export default RangeAxisSteps;
