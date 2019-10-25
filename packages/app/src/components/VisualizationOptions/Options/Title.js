import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from '@dhis2/d2-i18n';
import { PIVOT_TABLE } from '../../../modules/chartTypes';
import { sGetUiType } from '../../../reducers/ui';

import TextBaseOption from './TextBaseOption';

const Title = ({ visualizationType }) => (
    <TextBaseOption
        type="text"
        option={{
            name: 'title',
            label:
                visualizationType === PIVOT_TABLE
                    ? i18n.t('Table title')
                    : i18n.t('Chart title'),
        }}
    />
)

Title.propTypes = {
    visualizationType: PropTypes.string,
};

const mapStateToProps = state => ({
    visualizationType: sGetUiType(state),
});

export default connect(mapStateToProps)(Title);
