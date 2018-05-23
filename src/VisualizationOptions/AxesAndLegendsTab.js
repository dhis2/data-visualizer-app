import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import i18n from '@dhis2/d2-i18n';

const styles = {
    numberField: {
        minHeight: 55,
        marginRight: 20,
        width: 120,
    },
    rangeAxistextField: {
        minHeight: 55,
        width: '40%',
        marginRight: '60%',
    },
    domainAxisTextField: {
        width: '40%',
        marginRight: 80,
    },
    domainAxisSubtitleTextField: {
        minHeight: 55,
        width: '40%',
        marginRight: 80,
    },
    inputLabeltextSize: {
        fontSize: 13,
    },
    coverRestofRowSpace: {
        minHeight: 55,
        width: 120,
        marginRight: '65%',
    },
    hideChartLegendCheckbox: {
        minHeight: 55,
        marginRight: '80%',
    },
    divBorder: {
        borderBottom: '1px solid #E0E0E0',
        height: 480,
    },
};

const strings = {
    axisMin: 'Range axis min',
    axisMax: 'Range axis max',
    tickSteps: 'Range axis tick step',
    decimals: 'Range axis decimals',
    rangeTitle: 'Range axis title',
    domainTitle: 'Domain axis title',
    domainSubtitle: 'Domain axis subtitle',
    hideChartTitle: 'Hide chart title',
    hideLegend: 'Hide chart legend',
    hideSubtitle: 'Hide chart subtitle',
};

export class AxesAndLegendsTab extends Component {
    state = {};

    renderTextFields = (classes, onChange, tabContent) => {
        return Object.entries(tabContent)
            .slice(11, 17)
            .map(([entry, value], i) => (
                <TextField
                    className={
                        i === 0 || i > 3
                            ? i === 0
                                ? classes.numberField
                                : i === 5
                                    ? classes.domainAxisTextField
                                    : classes.rangeAxistextField
                            : classes.coverRestofRowSpace
                    }
                    label={i18n.t(strings[entry])}
                    InputLabelProps={{ className: classes.inputLabeltextSize }}
                    key={i}
                    onChange={event => onChange(entry, event.target.value)}
                    type={i <= 3 ? 'number' : 'string'} // first 4 textFields are number specific
                    value={value}
                />
            ));
    };

    render = () => {
        const { classes, onChange, tabContent } = this.props;

        return (
            <div className={classes.divBorder}>
                <FormControlLabel
                    className={classes.hideChartLegendCheckbox}
                    control={
                        <Checkbox
                            checked={tabContent.hideChartLegend}
                            color={'primary'}
                            onChange={event =>
                                onChange(
                                    'hideChartLegend',
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label={i18n.t(strings.hideLegend)}
                />

                {this.renderTextFields(classes, onChange, tabContent)}

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={tabContent.hideChartTitle}
                            color={'primary'}
                            onChange={event =>
                                onChange('hideChartTitle', event.target.checked)
                            }
                        />
                    }
                    label={i18n.t(strings.hideChartTitle)}
                />
                <TextField
                    className={classes.domainAxisSubtitleTextField}
                    label={i18n.t(strings.domainSubtitle)}
                    fullWidth
                    InputLabelProps={{ className: classes.inputLabeltextSize }}
                    onChange={event =>
                        onChange('domainSubtitle', event.target.value)
                    }
                    value={i18n.t(tabContent.domainSubtitle)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={tabContent.hideSubtitle}
                            color={'primary'}
                            onChange={event =>
                                onChange('hideSubtitle', event.target.checked)
                            }
                        />
                    }
                    label={i18n.t(strings.hideSubtitle)}
                />
            </div>
        );
    };
}

AxesAndLegendsTab.propTypes = {
    classes: PropTypes.object,
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
