import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

import i18n from '@dhis2/d2-i18n';
import styles from '../styles/VisualizationOptions.style';

import SelectBaseOption from './SelectBaseOption';

const NumberType = ({ classes }) => (
    <Fragment>
        <SelectBaseOption
            className={classes.aggregationType}
            option={{
                name: 'numberType',
                label: i18n.t('Number type'),
                items: [
                    { id: 'VALUE', label: i18n.t('Value') },
                    {
                        id: 'ROW_PERCENTAGE',
                        label: i18n.t('Percentage of row'),
                    },
                    {
                        id: 'COLUMN_PERCENTAGE',
                        label: i18n.t('Percentage of column'),
                    },
                ],
            }}
        />
        <FormHelperText>
            {i18n.t('Display the value or percentages of the total')}
        </FormHelperText>
    </Fragment>
);

NumberType.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NumberType);
