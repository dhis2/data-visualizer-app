import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const RangeAxisDecimals = ({ classes }) => (
    <TextBaseOption
        classes={classes}
        type="number"
        option={{
            name: 'rangeAxisDecimals',
            label: i18n.t('Range axis decimals'),
        }}
    />
);

export default RangeAxisDecimals;
