import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import i18n from '@dhis2/d2-i18n';
import { Radio, RadioGroupField } from '@dhis2/ui-core';

import { PIVOT_TABLE } from '../../../modules/chartTypes';
import { sGetUiOptions, sGetUiType } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

import Title from './Title';

class HideTitle extends Component {
    constructor(props) {
        super(props);

        this.defaultState = { value: 'AUTO' };

        this.state = props.value ? { value: props.value } : this.defaultState;
    }

    onChange = event => {
        const value = event.target.value === 'NONE' ? true : false;

        this.setState({ value: event.target.value });
        this.props.onChange(value);
    };

    render() {
        const { value } = this.state;
        const { visualizationType } = this.props;

        return (
            <Fragment>
                <RadioGroupField
                    name="hideTitle-selector"
                    label={
                        visualizationType === PIVOT_TABLE
                            ? i18n.t('Table title')
                            : i18n.t('Chart title')
                    }
                    onChange={this.onChange}
                    value={value}
                    dense
                >
                    {[
                        { id: 'AUTO', label: i18n.t('Auto generated') },
                        { id: 'NONE', label: i18n.t('None') },
                        { id: 'CUSTOM', label: i18n.t('Custom') },
                    ].map(({ id, label }) => (
                        <Radio key={id} label={label} value={id} dense />
                    ))}
                </RadioGroupField>
                {value === 'CUSTOM' ? <Title /> : null}
            </Fragment>
        );
    }
}

HideTitle.propTypes = {
    value: PropTypes.string,
    visualizationType: PropTypes.string,
    onChange: PropTypes.func,
};

const hideTitleSelector = createSelector(
    [sGetUiOptions],
    uiOptions =>
        uiOptions.hideTitle
            ? 'NONE'
            : uiOptions.title === undefined
            ? 'AUTO'
            : 'CUSTOM'
);

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    value: hideTitleSelector(state),
});

const mapDispatchToProps = dispatch => ({
    onChange: value => dispatch(acSetUiOptions({ hideTitle: value })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HideTitle);
