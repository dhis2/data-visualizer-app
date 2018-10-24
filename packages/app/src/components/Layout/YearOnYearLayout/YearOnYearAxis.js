import React from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';

import { sGetUiLayout } from '../../../reducers/ui';
import { styles } from './styles/Axis.style';

const axisLabels = {
    columns: i18n.t('Yearly series'),
    rows: i18n.t('Category'),
    filters: i18n.t('Filter'),
};

const Axis = ({ axis }) => (
    <div
        id={this.props.axisName}
        style={{ ...styles.axisContainer, ...this.props.style }}
    >
        <div style={styles.label}>{axisLabels[this.props.axisName]}</div>
        <div style={styles.content}>Dropdown</div>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    axis: sGetUiLayout(state)[ownProps.axisName],
});

export default connect(mapStateToProps)(Axis);
