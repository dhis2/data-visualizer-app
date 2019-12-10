import React from 'react';

import i18n from '@dhis2/d2-i18n';

import SelectBaseOption from './SelectBaseOption'

const AggregationType = () => (
    <SelectBaseOption
        label={i18n.t('Aggregation type')}
        helpText={i18n.t(
            'Determines how the values in the pivot table are aggregated. Learn more'
        )}
        option={{
            name: 'aggregationType',
            items: [
                { id: 'DEFAULT', label: i18n.t('By data element') },
                { id: 'COUNT', label: i18n.t('Count') },
                { id: 'AVERAGE', label: i18n.t('Average') },
                {
                    id: 'AVERAGE_SUM_ORG_UNIT',
                    label: i18n.t('Average (sum in org unit hierarchy)'),
                },
                { id: 'SUM', label: i18n.t('Sum') },
                { id: 'LAST', label: i18n.t('Last value') },
                {
                    id: 'LAST_AVERAGE_ORG_UNIT',
                    label: i18n.t('Last value (average in org unit hierarchy)'),
                },
                { id: 'MIN', label: i18n.t('Min') },
                { id: 'MAX', label: i18n.t('Max') },
                { id: 'STDDEV', label: i18n.t('Standard deviation') },
                { id: 'VARIANCE', label: i18n.t('Variance') },
            ],
        }}
    />
)

export default AggregationType;
