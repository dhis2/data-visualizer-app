import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import CheckboxBaseOption from './CheckboxBaseOption';
import styles from '../styles/VisualizationOptions.style';

const ParamOrganisationUnit = ({ classes }) => (
    <CheckboxBaseOption
        className={classes.dataTabCheckbox}
        option={{
            name: 'paramOrganisationUnit',
            label: i18n.t('Organisation unit'),
        }}
    />
);

ParamOrganisationUnit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParamOrganisationUnit);
