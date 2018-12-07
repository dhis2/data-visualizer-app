import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';

import NoSpaceBetweenColumns from './Options/NoSpaceBetweenColumns';
import HideLegend from './Options/HideLegend';
import HideTitle from './Options/HideTitle';
import Title from './Options/Title';
import HideSubtitle from './Options/HideSubtitle';
import Subtitle from './Options/Subtitle';
import styles from './styles/VisualizationOptions.style';

export const StyleTab = ({ classes }) => (
    <FormGroup>
        <NoSpaceBetweenColumns />
        <HideLegend />
        <FormGroup className={classes.titleFormGroup} row={true}>
            <Title />
            <HideTitle />
        </FormGroup>
        <FormGroup row={true}>
            <Subtitle />
            <HideSubtitle />
        </FormGroup>
    </FormGroup>
);

StyleTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyleTab);
