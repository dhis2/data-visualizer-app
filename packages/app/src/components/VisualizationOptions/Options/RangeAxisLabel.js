import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const RangeAxisLabel = ({ classes }) => (
    <TextBaseOption
        classes={classes}
        type="text"
        option={{
            name: 'rangeAxisLabel',
            label: i18n.t('Range axis title'),
        }}
    />
);

export default RangeAxisLabel;
