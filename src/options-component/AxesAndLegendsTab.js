import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import TextField from 'material-ui-next/TextField';
import { FormControlLabel } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import strings from './utils';

const styles = {
    numberField: {
        marginRight: 20,
        width: 120,
    },
    rangeAxistextField: {
        width: '40%',
        marginRight: '60%',
    },
    domainAxisTextField: {
        width: '40%',
        marginRight: 80,
    },
    domainAxisSubtitleTextField: {
        width: '40%',
        marginRight: 80,
    },
    inputLabeltextSize: {
        fontSize: 13,
    },
    coverRestofRowSpace: {
        width: 120,
        marginRight: '65%',
    },
    hideChartLegendCheckbox: {
        // Pads out the remaining row space - "special case"
        marginRight: '80%',
    },
    divBorder: {
        borderBottom: '1px solid rgb(158, 158, 158)',
        paddingBottom: 35,
    },
};

const renderTextFields = (classes, tabContent, onChange) => {
    //Loop through Axes & Legend variable's and render each item with a <TextField/> with correlated string
    return tabContent.map(([key, value], i) => (
        <TextField
            // Ugly Nested terniary: check if its the first or last element,
            // if outer condition is true: 	i == 0 will render a small numberField
            //								else check if its the last element which will render a longer textField and pad out the remaining row space
            //						 		Else it must be "Domain Axis" textField which have a checkbox right next to it (i.e dont pad out the rest of the row)
            className={
                i === 0 || i > 3
                    ? i === 0
                        ? classes.numberField
                        : i === 5
                            ? classes.domainAxisTextField
                            : classes.rangeAxistextField
                    : classes.coverRestofRowSpace
            }
            label={strings.axes[key]}
            InputLabelProps={{ className: classes.inputLabeltextSize }}
            onChange={event => {
                onChange(key, event.target.value);
            }}
            type={i <= 3 ? 'number' : 'string'} // first 4 textFields are number specific
            value={value}
            key={i}
        />
    ));
};

const AxesAndLegendsTab = props => {
    const { classes, tabContent, onChange } = props;
    //Loop through the number fields and render accordingly via "renderTextFields();"
    let textFields = Object.entries(tabContent).slice(10, 16);

    return (
        <div className={classes.divBorder}>
            <FormControlLabel
                className={classes.hideChartLegendCheckbox}
                label={strings.axes.hideLegend}
                control={
                    <Checkbox
                        checked={tabContent.hideChartLegend}
                        color={'primary'}
                        onChange={event => {
                            onChange('hideChartLegend', event.target.checked);
                        }}
                    />
                }
            />

            {renderTextFields(classes, textFields, onChange)}

            <FormControlLabel
                label={strings.axes.hideChartTitle}
                control={
                    <Checkbox
                        checked={tabContent.hideChartTitle}
                        color={'primary'}
                        onChange={event => {
                            onChange('hideChartTitle', event.target.checked);
                        }}
                    />
                }
            />

            <TextField
                className={classes.domainAxisSubtitleTextField}
                label={strings.axes.domainSubtitle}
                InputLabelProps={{ className: classes.inputLabeltextSize }}
                fullWidth
                onChange={event => {
                    onChange('domainSubtitle', event.target.value);
                }}
                value={tabContent.domainSubtitle}
            />

            <FormControlLabel
                label={strings.axes.hideSubtitle}
                control={
                    <Checkbox
                        checked={tabContent.hideSubtitle}
                        color={'primary'}
                        onChange={event => {
                            onChange('hideSubtitle', event.target.checked);
                        }}
                    />
                }
            />
        </div>
    );
};

AxesAndLegendsTab.propTypes = {
    onChange: PropTypes.func.isRequired,
    tabContent: PropTypes.shape({
        axisMin: PropTypes.string,
        axisMax: PropTypes.string,
        tickSteps: PropTypes.string,
        decimals: PropTypes.string,
        rangeTitle: PropTypes.string,
        domainTitle: PropTypes.string,
        domainSubtitle: PropTypes.string,
    }),
};

AxesAndLegendsTab.defaultProps = {
    tabContent: {
        axisMin: '',
        axisMax: '',
        tickSteps: '',
        decimals: '',
        rangeTitle: '',
        domainTitle: '',
        domainSubtitle: '',
    },
};

export default withStyles(styles)(AxesAndLegendsTab);
