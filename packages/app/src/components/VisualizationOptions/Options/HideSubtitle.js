import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from '@dhis2/d2-i18n';
import { Radio, RadioGroupField } from '@dhis2/ui-core';

import { PIVOT_TABLE } from '../../../modules/chartTypes';
import { sGetUiOptions, sGetUiType } from '../../../reducers/ui';
import { acSetUiOptions } from '../../../actions/ui';

import Subtitle from './Subtitle';

class HideSubtitle extends Component {
    constructor(props) {
        super(props);

        this.defaultState = { value: 'NONE' };

        this.state = props.value ? { value: props.value } : this.defaultState;
    }

    onChange = event => {
        const value = event.target.value === 'NONE' ? true : false;

        this.setState({ value: event.target.value });
        this.props.onChange(value);
    };

    render() {
        const { value, visualizationType } = this.props;

        return (
            <Fragment>
                <RadioGroupField
                    name="hideSubtitle-selector"
                    label={
                        visualizationType === PIVOT_TABLE
                            ? i18n.t('Table subtitle')
                            : i18n.t('Chart subtitle')
                    }
                    onChange={this.onChange}
                    value={value}
                    dense
                >
                    {[
                        { id: 'NONE', label: i18n.t('None') },
                        { id: 'CUSTOM', label: i18n.t('Custom') },
                    ].map(({ id, label }) => (
                        <Radio key={id} label={label} value={id} dense />
                    ))}
                </RadioGroupField>
                {value === 'CUSTOM' ? <Subtitle /> : null}
            </Fragment>
        );
    }
}

HideSubtitle.propTypes = {
    value: PropTypes.string,
    visualizationType: PropTypes.string,
    onChange: PropTypes.func,
};

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
    value: sGetUiOptions(state).hideSubtitle ? 'NONE' : 'CUSTOM',
});

const mapDispatchToProps = dispatch => ({
    onChange: value => dispatch(acSetUiOptions({ hideSubtitle: value })),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HideSubtitle);
