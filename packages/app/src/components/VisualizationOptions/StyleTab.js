import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';

import NoSpaceBetweenColumns from './Options/NoSpaceBetweenColumns';

const styles = {};

export const StyleTab = ({ classes }) => (
    <FormGroup>
        <NoSpaceBetweenColumns />
    </FormGroup>
);

export default withStyles(styles)(StyleTab);
