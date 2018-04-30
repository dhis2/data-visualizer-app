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

const strings = [
    'Show Values',
    'Use 100% Stacked values',
    'Use cumulative values',
];

const renderCheckBoxes = (classes, onChange, tabContent) => {
    return Object.entries(tabContent)
        .slice(0, 3)
        .map(([entry, value], i) => (
            <FormControlLabel
                className={classes.checkboxes}
                key={i}
                control={
                    <Checkbox
                        checked={value}
                        color={'primary'}
                        onChange={event =>
                            onChange(entry, event.target.checked)
                        }
                    />
                }
                label={i18n.t(strings[i])}
            />
        ));
};

export const DataTabCheckBoxes = ({ classes, onChange, tabContent }) => {
    return (
        <FormGroup>{renderCheckBoxes(classes, onChange, tabContent)}</FormGroup>
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
