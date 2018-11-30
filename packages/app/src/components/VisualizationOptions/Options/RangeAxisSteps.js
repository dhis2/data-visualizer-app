import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';
import { sGetUiOptions } from '../../../reducers/ui';

export const RangeAxisSteps = ({ showHelperText }) => (
    <TextBaseOption
        type="number"
        option={{
            name: 'rangeAxisSteps',
            label: i18n.t('Range axis tick steps'),
            helperText: showHelperText
                ? i18n.t(
                      `Tick steps may extend the chart beyond 'Range axis max'`
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
