import React from 'react';
import i18n from '@dhis2/d2-i18n';
import CheckboxBaseOption from './CheckboxBaseOption';

const HideTitle = ({ classes, random }) => (
    <CheckboxBaseOption
        classes={classes}
        random={random}
        option={{
            name: 'hideTitle',
            label: i18n.t('Hide title'),
        }}
    />
);

export default HideTitle;
