import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 53,
        width: 420,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        display: 'flex',
    },
    groupContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: 'inherit',
        paddingLeft: 5,
        paddingRight: 5,
    },
    detailContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: '40%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    MenuProps: {
        PaperProps: {
            display: 'grid',
        },
    },
    titleText: {
        fontSize: 12,
        color: '#616161',
    },
    dropDownItem: {
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 10,
    },
};

const GROUP = i18n.t('Group');
const DETAILS = i18n.t('Details');
const TOTALS = i18n.t('Totals');
const detailOrTotals = [
    {
        id: 'details',
        displayName: DETAILS,
    },
    {
        id: 'totals',
        displayName: TOTALS,
    },
];

export class Groups extends Component {
    state = { group: '', detailOrTotals: DETAILS };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render = () => {
        return (
            <div style={style.container}>
                <div style={style.groupContainer}>
                    <span style={style.titleText}>{GROUP}</span>
                    <Select
                        value={this.state.group}
                        onChange={this.handleChange('group')}
                        MenuProps={style.MenuProps}
                    >
                        {detailOrTotals.map(item => (
                            <MenuItem
                                style={style.dropDownItem}
                                key={item.id}
                                value={item.displayName}
                            >
                                {item.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div style={style.detailContainer}>
                    <span style={style.titleText}>{DETAILS}</span>
                    <Select
                        value={this.state.detailOrTotals}
                        onChange={this.handleChange('detailOrTotals')}
                        style={style.dropDown}
                    >
                        {detailOrTotals.map(item => (
                            <MenuItem
                                style={style.dropDownItem}
                                key={item.id}
                                value={item.displayName}
                            >
                                {item.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
        );
    };
}

export default Groups;
