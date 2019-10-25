import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import CheckboxBaseOption from './CheckboxBaseOption';
import styles from '../styles/VisualizationOptions.style';

const ParamParentOrganisationUnit = ({ classes }) => (
    <CheckboxBaseOption
        className={classes.dataTabCheckbox}
        option={{
            name: 'paramParentOrganisationUnit',
            label: i18n.t('Parent organisation unit'),
        }}
    />
);

ParamParentOrganisationUnit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParamParentOrganisationUnit);
