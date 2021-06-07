import i18n from '@dhis2/d2-i18n'
import React from 'react'
import SelectBaseOption from './SelectBaseOption'

const AggregationType = () => (
    <SelectBaseOption
        label={i18n.t('Aggregation type')}
        helpText={i18n.t('Overrides aggregation type for all data values.')}
        option={{
            name: 'aggregationType',
            items: [
                { value: 'DEFAULT', label: i18n.t('By data element') },
                { value: 'COUNT', label: i18n.t('Count') },
                { value: 'AVERAGE', label: i18n.t('Average') },
                {
                    value: 'AVERAGE_SUM_ORG_UNIT',
                    label: i18n.t('Average (sum in org unit hierarchy)'),
                },
                { value: 'SUM', label: i18n.t('Sum') },
                { value: 'LAST', label: i18n.t('Last value') },
                {
                    value: 'LAST_AVERAGE_ORG_UNIT',
                    label: i18n.t('Last value (average in org unit hierarchy)'),
                },
                { value: 'MIN', label: i18n.t('Min') },
                { value: 'MAX', label: i18n.t('Max') },
                { value: 'STDDEV', label: i18n.t('Standard deviation') },
                { value: 'VARIANCE', label: i18n.t('Variance') },
            ],
        }}
    />
)

export default AggregationType
