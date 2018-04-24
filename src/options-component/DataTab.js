import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import classNames from 'classnames';
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
        marginRight: 75,
    },
    inputLabeltextSize: {
        fontSize: 13,
    },
    textFields: {
        marginRight: 20,
        width: 100,
    },
    formControlCoverWholeRow: {
        marginRight: '100%',
    },
    textFieldCoverWholeRow: {
        marginRight: '55%',
        width: 200,
    },
    dataTab: {
        borderBottom: '1px solid #E0E0E0',
        height: 480,
    },
};

const strings = {
    targetLineValue: 'Target line value',
    targetLineTitle: 'Target line title',
    baseLineValue: 'Base line value',
    baseLineTitle: 'Base line title',
    category: [
        'None',
        'Before first',
        'After last',
        'Before first and after last',
        'All',
    ],
    trendLine: ['None', 'Linear', 'Polynomial', 'Loess'],
    sortOrder: ['None', 'Low to high', 'High to low'],
    aggregation: [
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
};

class DataTab extends Component {
    state = {};

    renderTextFields = (classes, onChange, tabContent) => {
        return Object.entries(tabContent)
            .slice(5, 9)
            .map(([entry, value], i) => (
                <TextField
                    className={
                        i % 2 === 0
                            ? classes.textFields
                            : classes.textFieldCoverWholeRow
                    } // 2nd and 4th TextField component pads out rest of the row space
                    InputLabelProps={{ className: classes.inputLabeltextSize }}
                    key={i}
                    label={i18n.t(strings[entry])}
                    onChange={event => onChange(entry, event.target.value)}
                    type={i % 2 === 0 ? 'number' : 'string'} // 1st and 3rd TextField component are number specific
                    value={value}
                />
            ));
    };

    render = () => {
        const { classes, onChange, tabContent } = this.props;
        return (
            <div className={classes.dataTab}>
                <DataTabCheckBoxes
                    onChange={onChange}
                    tabContent={tabContent}
                />

                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.inputLabeltextSize}>
                        {i18n.t('Hide empty categories')}
                    </InputLabel>
                    <Select
                        onChange={event =>
                            onChange('category', event.target.value)
                        }
                        value={tabContent.category}
                    >
                        {strings.category.map((alternative, id) => (
                            <MenuItem key={id} value={i18n.t(alternative)}>
                                {alternative}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    className={classNames(
                        classes.formControl,
                        classes.formControlCoverWholeRow
                    )}
                >
                    <InputLabel className={classes.inputLabeltextSize}>
                        {i18n.t('Trend line')}
                    </InputLabel>
                    <Select
                        onChange={event =>
                            onChange('trendLine', event.target.value)
                        }
                        value={tabContent.trendLine}
                    >
                        {strings.trendLine.map((alternative, id) => (
                            <MenuItem key={id} value={i18n.t(alternative)}>
                                {i18n.t(alternative)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {this.renderTextFields(classes, onChange, tabContent)}

                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.inputLabeltextSize}>
                        {i18n.t('Sort order')}
                    </InputLabel>
                    <Select
                        onChange={event =>
                            onChange('sortOrder', event.target.value)
                        }
                        value={tabContent.sortOrder}
                    >
                        {strings.sortOrder.map((alternative, id) => (
                            <MenuItem key={id} value={i18n.t(alternative)}>
                                {i18n.t(alternative)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.inputLabeltextSize}>
                        {i18n.t('Aggregation type')}
                    </InputLabel>
                    <Select
                        onChange={event =>
                            onChange('aggregation', event.target.value)
                        }
                        value={tabContent.aggregation}
                    >
                        {strings.aggregation.map((alternative, id) => (
                            <MenuItem key={id} value={i18n.t(alternative)}>
                                {i18n.t(alternative)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    };
}

DataTab.propTypes = {
    classes: PropTypes.object,
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
