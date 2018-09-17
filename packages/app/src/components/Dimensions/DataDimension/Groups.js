import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';

const style = {
    container: {
        height: 53,
        width: 420,
        border: '1px solid #E0E0E0',
        borderBottom: 0,
        paddingTop: 5,
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
        fontSize: 14,
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
const DETAIL = i18n.t('Detail');
const TOTALS = i18n.t('Totals');
const INDICATOR = i18n.t('Select indicator group');
const DATA_ELEMENTS = i18n.t('Select data element group');
const DATA_SET = i18n.t('Select data sets');
const PROG_INDICATOR = i18n.t('Select program');

const PLACEHOLDERS = {
    indicators: INDICATOR,
    dataElements: DATA_ELEMENTS,
    dataSets: DATA_SET,
    eventDataItems: PROG_INDICATOR,
    programIndicators: PROG_INDICATOR,
};

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

const groups = {
    indicators: {},
    dataElements: {},
    dataSets: {},
    eventDataItems: {},
    programIndicators: {},
};

export class Groups extends Component {
    state = {
        dataType: {},
        detail: TOTALS,
    };

    handleChange = event => {
        const { dataType } = this.props;
        this.setState({
            [dataType]: {
                ...this.state[dataType],
                ...{ currentValue: event.target.value },
            },
        });
    };

    renderDropDownItem = () => {
        const { dataType } = this.props;

        if (this.state[dataType].items) {
            console.log('item, ', dataType, ' have items loaded alrdy');
            console.log(this.state[dataType]);
        } else {
            console.log('not loaded yet, fetching now');
        }
    };

    render = () => {
        const { dataType } = this.props;
        const dataTypeKey = this.props.dataType.length
            ? this.props.dataType
            : 'indicators';
        console.log(PLACEHOLDERS[dataTypeKey]);
        return (
            <div style={style.container}>
                <div style={style.groupContainer}>
                    <InputLabel style={style.titleText}>
                        {PLACEHOLDERS[dataTypeKey]}
                    </InputLabel>
                    <Select
                        value={this.state.value || ''}
                        onChange={this.handleChange}
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
                    <InputLabel style={style.titleText}>{DETAIL}</InputLabel>
                    <Select
                        onChange={event =>
                            this.setState({
                                detail: event.target.value,
                            })
                        }
                        value={this.state.detail}
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
