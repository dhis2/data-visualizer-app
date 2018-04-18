import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Checkbox from 'material-ui-next/Checkbox';
import { FormControlLabel } from 'material-ui-next/Form';
import strings from './utils';

const styles = {
    divBorder: {
        borderBottom: '1px solid rgb(158, 158, 158)',
        paddingBottom: 35,
    },
};

const StyleTab = props => {
    const { classes, tabContent, onChange } = props;
    return (
        <div className={classes.divBorder}>
            <FormControlLabel
                label={strings.noSpace}
                control={
                    <Checkbox
                        checked={tabContent.noSpace}
                        onChange={event =>
                            onChange('noSpace', event.target.checked)
                        }
                    />
                }
            />
        </div>
    );
};

StyleTab.propTypes = {
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
