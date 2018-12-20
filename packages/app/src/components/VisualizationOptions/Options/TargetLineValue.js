import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption';

const TargetLineValue = ({ enabled }) => (
    <TextBaseOption
        enabled={enabled}
        type="number"
        option={{
            name: 'targetLineValue',
            label: i18n.t('Target line value'),
        }}
    />
);

TargetLineValue.propTypes = {
    enabled: PropTypes.bool.isRequired,
};

export default TargetLineValue;
