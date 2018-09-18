import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';
import Totals from './Totals';
import { apiFetchAlternatives } from '../../../api/dimensions';

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
    titleText: {
        fontSize: 14,
        color: '#616161',
    },
};
const INDICATOR = i18n.t('Select indicator group');
const DATA_ELEMENTS = i18n.t('Select data element group');
const DATA_SET = i18n.t('Select data sets');
const PROG_INDICATOR = i18n.t('Select program');
const DEFAULT_KEY = 'indicators';

const PLACEHOLDERS = {
    indicators: INDICATOR,
    dataElements: DATA_ELEMENTS,
    dataSets: DATA_SET,
    eventDataItems: PROG_INDICATOR,
    programIndicators: PROG_INDICATOR,
};

export class Groups extends Component {
    state = {
        indicators: [],
        dataElements: [],
        dataSets: [],
        eventDataItems: [],
        programIndicators: [],
        displayValue: '',
    };

    handleChange = event => {
        this.setState({ displayValue: event.target.value });
    };

    renderDropDownItems = () => {
        const { dataType } = this.props;
        return dataType.length
            ? this.state[dataType].map(item => (
                  <MenuItem key={item.id} value={item.displayName}>
                      {item.displayName}
                  </MenuItem>
              ))
            : null;
    };

    shouldFetchItems = () => {
        return (
            this.props.dataType.length &&
            !this.state[this.props.dataType].length
        );
    };

    async componentDidUpdate() {
        const { dataType } = this.props;

        if (this.shouldFetchItems()) {
            const dataTypeAlternatives = await apiFetchAlternatives(dataType);
            this.setState({ [dataType]: dataTypeAlternatives });
            //this.props.onContentChange(dataTypeAlternatives);
            console.log(this.state);
        } else {
            console.log('already fetched');
        }
    }

    render = () => {
        const dataTypeKey = this.props.dataType.length
            ? this.props.dataType
            : DEFAULT_KEY;

        const showTotals = dataTypeKey === 'dataElements';
        const renderItems = this.renderDropDownItems();

        return (
            <div style={style.container}>
                <div style={style.groupContainer}>
                    <InputLabel style={style.titleText}>
                        {PLACEHOLDERS[dataTypeKey]}
                    </InputLabel>
                    <Select
                        value={this.state.displayValue}
                        onChange={this.handleChange}
                        MenuProps={style.MenuProps}
                    >
                        {renderItems}
                    </Select>
                </div>
                {showTotals ? <Totals /> : null}
            </div>
        );
    };
}

export default Groups;
