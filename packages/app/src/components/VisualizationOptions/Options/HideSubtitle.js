import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import CheckboxBaseOption from './CheckboxBaseOption';

const styles = {
    formControlLabelRoot: {
        marginLeft: 15,
        alignItems: 'flex-end',
    },
    checkBoxRoot: {
        padding: '0px 5px',
    },
};

const HideSubtitle = ({ classes }) => (
    <CheckboxBaseOption
        classes={{
            checkBoxRoot: classes.checkBoxRoot,
            formControlLabelRoot: classes.formControlLabelRoot,
        }}
        option={{
            name: 'hideSubtitle',
            label: i18n.t('Hide subtitle'),
        }}
    />
);

export default withStyles(styles)(HideSubtitle);
