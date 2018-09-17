import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import i18n from '@dhis2/d2-i18n';

const style = {
    detailContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: '40%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    titleText: {
        fontSize: 14,
        color: '#616161',
    },
};

const DETAIL = i18n.t('Detail');
const TOTALS = i18n.t('Totals');
const DETAILS = i18n.t('Details');
const alternatives = [DETAILS, TOTALS];

export class Totals extends Component {
    state = {};

    handleChange = event => {
        this.setState({ detailOrTotals: event.target.value });
    };

    render = () => {
        return (
            <div style={style.detailContainer}>
                <InputLabel style={style.titleText}>{DETAIL}</InputLabel>
                <Select
                    onChange={this.handleChange}
                    value={this.state.detailOrTotals || ''}
                >
                    {alternatives.map((item, key) => (
                        <MenuItem key={key} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        );
    };
}

export default Totals;
