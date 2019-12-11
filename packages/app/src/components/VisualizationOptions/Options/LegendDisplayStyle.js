import React from 'react';

import i18n from '@dhis2/d2-i18n';

import RadioBaseOption from './RadioBaseOption';

const LegendDisplayStyle = () => (
    <RadioBaseOption
        option={{
            name: 'legendDisplayStyle',
            items: [
                {
                    id: 'FILL',
                    label: i18n.t('Legend changes background color'),
                },
                { id: 'TEXT', label: i18n.t('Legend changes text color') },
            ],
        }}
    />
);

export default LegendDisplayStyle;
