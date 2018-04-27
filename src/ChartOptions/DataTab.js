import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import { FormControl } from 'material-ui-next/Form';
import Select from 'material-ui-next/Select';
import TextField from 'material-ui-next/TextField';
import { InputLabel } from 'material-ui-next/Input';
import { MenuItem } from 'material-ui-next/Menu';
import i18n from 'd2-i18n';
import DataTabCheckBoxes from './DataTabCheckBoxes';

const styles = {
    formControl: {
        minHeight: 55,
        minWidth: 300,
        marginRight: '60%',
    },
    inputLabeltextSize: {
        fontSize: 13,
    },
    textFields: {
        marginRight: 20,
        width: 100,
    },
    textFieldCoverWholeRow: {
        marginRight: '55%',
        width: 200,
    },
    divBorder: {
        borderBottom: '1px solid #E0E0E0',
        height: 480,
    },
};

const strings = {
    targetLineValue: 'Target line value',
    targetLineTitle: 'Target line title',
    baseLineValue: 'Base line value',
    baseLineTitle: 'Base line title',
    category: {
        hintText: 'Hide empty categories',
        alternatives: [
            'None',
            'Before first',
            'After last',
            'Before first and after last',
            'All',
        ],
    },
    trendLine: {
        hintText: 'Trend line',
        alternatives: ['None', 'Linear', 'Polynomial', 'Loess'],
    },
    sortOrder: {
        hintText: 'Sort order',
        alternatives: ['None', 'Low to high', 'High to low'],
    },
    aggregation: {
        hintText: 'Aggregation',
        alternatives: [
            'By data element',
            'Count',
            'Average',
            'Average (sum in org unit hierarchy)',
            'Sum',
            'Standard deviation',
            'Variance',
            'Min',
            'Max',
            'Last Value',
            'Last value (average in org unit hierarchy)',
        ],
    },
};

export class DataTab extends Component {
    state = {};

    renderTextFields = (classes, onChange, tabContent) => {
        return Object.entries(tabContent).map(([entry, value], i) => (
            <TextField
                className={
                    i % 2 === 0
                        ? classes.textFields
                        : classes.textFieldCoverWholeRow
                } // 2nd and 4th TextField component pads out rest of the row space
                InputLabelProps={{ className: classes.inputLabeltextSize }}
                key={i}
                label={i18n.t(strings[value[0]])}
                onChange={event => onChange(value[0], event.target.value)}
                type={i % 2 === 0 ? 'number' : 'string'} // 1st and 3rd TextField component are number specific
                value={i18n.t(value[1])}
            />
        ));
    };

    renderSelectFields = (classes, onChange, tabContent) => {
        return Object.entries(tabContent).map(([entry, value], i) => (
            <FormControl className={classes.formControl} key={i}>
                <InputLabel className={classes.inputLabeltextSize}>
                    {i18n.t(strings[value[0]].hintText)}
                </InputLabel>
                <Select
                    onChange={event => onChange(value[0], event.target.value)}
                    value={i18n.t(value[1])}
                >
                    {strings[value[0]].alternatives.map((alternative, id) => (
                        <MenuItem key={id} value={i18n.t(alternative)}>
                            {i18n.t(alternative)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        ));
    };

    render = () => {
        const { classes, onChange, tabContent } = this.props;
        return (
            <div className={classes.divBorder}>
                <DataTabCheckBoxes
                    onChange={onChange}
                    tabContent={tabContent}
                />
                {this.renderSelectFields(
                    classes,
                    onChange,
                    Object.entries(tabContent).slice(3, 5)
                )}
                {this.renderTextFields(
                    classes,
                    onChange,
                    Object.entries(tabContent).slice(5, 9)
                )}
                {this.renderSelectFields(
                    classes,
                    onChange,
                    Object.entries(tabContent).slice(9, 11)
                )}
            </div>
        );
    };
}

DataTab.propTypes = {
    classes: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    tabContent: PropTypes.shape({
        showValues: PropTypes.bool,
        useCumulative: PropTypes.bool,
        useStacked: PropTypes.bool,
        category: PropTypes.string,
        trendLine: PropTypes.string,
        targetLineValue: PropTypes.string,
        targetLineTitle: PropTypes.string,
        baseLineValue: PropTypes.string,
        baseLineTitle: PropTypes.string,
        sortOrder: PropTypes.string,
        aggregation: PropTypes.string,
    }),
};
DataTab.defaultProps = {
    tabContent: {
        showValues: false,
        useCumululative: false,
        useStacked: false,
        category: '',
        trendLine: '',
        targetLineValue: '',
        targetLineTitle: '',
        baseLineValue: '',
        baseLineTitle: '',
        sortOrder: '',
        aggregation: '',
    },
};

export default withStyles(styles)(DataTab);
