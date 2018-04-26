import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import i18n from 'd2-i18n';

const styles = {
    checkboxes: {
        marginRight: '70%',
    },
};

export const DataTabCheckBoxes = ({ classes, onChange, tabContent }) => {
    return (
        <FormGroup>
            <FormControlLabel
                className={classes.checkboxes}
                control={
                    <Checkbox
                        checked={tabContent.showValues}
                        color={'primary'}
                        onChange={event =>
                            onChange('showValues', event.target.checked)
                        }
                    />
                }
                label={i18n.t('Show Values')}
            />
            <FormControlLabel
                className={classes.checkboxes}
                control={
                    <Checkbox
                        checked={tabContent.useCumulative}
                        color={'primary'}
                        onChange={event =>
                            onChange('useCumulative', event.target.checked)
                        }
                    />
                }
                label={i18n.t('Use 100% Stacked values')}
            />
            <FormControlLabel
                className={classes.checkboxes}
                control={
                    <Checkbox
                        checked={tabContent.useStacked}
                        color={'primary'}
                        onChange={event =>
                            onChange('useStacked', event.target.checked)
                        }
                    />
                }
                label={i18n.t('Use cumulative values')}
            />
        </FormGroup>
    );
};

DataTabCheckBoxes.propTypes = {
    classes: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    tabContent: PropTypes.shape({
        showValues: PropTypes.bool,
        useCumulative: PropTypes.bool,
        useStacked: PropTypes.bool,
    }),
};

DataTabCheckBoxes.defaultProps = {
    tabContent: {
        showValues: false,
        useCumulative: false,
        useStacked: false,
    },
};
export default withStyles(styles)(DataTabCheckBoxes);
