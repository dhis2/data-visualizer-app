import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Checkbox from 'material-ui-next/Checkbox';
import { FormControlLabel } from 'material-ui-next/Form';
import i18n from 'd2-i18n';

const styles = {
    divBorder: {
        borderBottom: '1px solid #E0E0E0',
        height: 480,
    },
};

const StyleTab = ({ classes, onChange, tabContent }) => {
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
