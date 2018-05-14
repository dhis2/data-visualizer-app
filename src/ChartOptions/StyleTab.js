import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import i18n from '@dhis2/d2-i18n';

const styles = {
    divBorder: {
        borderBottom: '1px solid #E0E0E0',
        height: 480,
    },
};

export const StyleTab = ({ classes, onChange, tabContent }) => {
    return (
        <div className={classes.divBorder}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={tabContent.noSpace}
                        color={'primary'}
                        onChange={event =>
                            onChange('noSpace', event.target.checked)
                        }
                    />
                }
                label={i18n.t('No space between columns/bars')}
            />
        </div>
    );
};

StyleTab.propTypes = {
    classes: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    tabContent: PropTypes.shape({
        noSpace: PropTypes.bool,
    }),
};
StyleTab.defaultProps = {
    tabContent: {
        noSpace: false,
    },
};

export default withStyles(styles)(StyleTab);
