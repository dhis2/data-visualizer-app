import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import { sGetUiOptions } from '../../../reducers/ui';

import PositiveNumberBaseType from './PositiveNumberBaseType';

export const RangeAxisSteps = ({ showHelperText }) => (
    <PositiveNumberBaseType
        width="96px"
        placeholder={i18n.t('Auto')}
        option={{
            name: 'rangeAxisSteps',
            label: i18n.t('Range axis tick steps'),
            helperText: showHelperText
                ? i18n.t(
                      'Number of axis tick steps, including the min and max. A value of 2 or lower will be ignored.'
                  )
                : null,
        }}
    />
);

RangeAxisSteps.propTypes = {
    showHelperText: PropTypes.bool,
};

const mapStateToProps = state => {
    const options = sGetUiOptions(state);

    return {
        showHelperText: Boolean(
            options.rangeAxisSteps && options.rangeAxisMaxValue
        ),
    };
};

export default connect(mapStateToProps)(RangeAxisSteps);
