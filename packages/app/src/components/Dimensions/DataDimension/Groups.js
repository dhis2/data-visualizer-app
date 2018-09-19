import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';
import Totals from './Totals';
import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions';

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
        minWidth: 316,
        width: 'inherit',
        paddingLeft: 5,
        paddingRight: 5,
    },
    dropDown: {
        padding: 0,
    },
    titleText: {
        fontSize: 13,
        fontWeight: 300,
        color: '#616161',
        paddingBottom: 15,
    },
};
const DEFAULT_KEY = 'indicators';

const INDICATOR = i18n.t('Select indicator group');
const DATA_ELEMENTS = i18n.t('Select data element group');
const DATA_SET = i18n.t('Select data sets');
const PROG_INDICATOR = i18n.t('Select program');

const DEFAULT_INDICATOR = i18n.t('[ All indicators ]');
const DEFAULT_DATA_ELEMENTS = i18n.t('[ All data elements ]');
const DEFAULT_DATA_SETS = i18n.t('[ All metrics ]');

const PLACEHOLDERS = {
    indicators: { label: INDICATOR, defaultAlternative: DEFAULT_INDICATOR },
    dataElements: {
        label: DATA_ELEMENTS,
        defaultAlternative: DEFAULT_DATA_ELEMENTS,
    },
    dataSets: { label: DATA_SET, defaultAlternative: DEFAULT_DATA_SETS },
    eventDataItems: { label: PROG_INDICATOR },
    programIndicators: { label: PROG_INDICATOR },
};

const REPORTING_RATES = 'REPORTING_RATES';
const REPORTING_RATES_ON_TIME = 'REPORTING_RATES_ON_TIME';
const ACTUAL_REPORTS = 'ACTUAL_REPORTS';
const ACTUAL_REPORTING_RATES_ON_TIME = 'ACTUAL_REPORTING_RATES_ON_TIME';
const EXPECTED_REPORTS = 'EXPECTED_REPORTS';

const DATA_SETS_CONSTANTS = [
    { id: REPORTING_RATES, displayName: i18n.t('Reporting rates') },
    {
        id: REPORTING_RATES_ON_TIME,
        displayName: i18n.t('Reporting rates on time'),
    },
    { id: ACTUAL_REPORTS, displayName: i18n.t('Actual reports') },
    {
        id: ACTUAL_REPORTING_RATES_ON_TIME,
        displayName: i18n.t('Actual reporting rates on time'),
    },
    { id: EXPECTED_REPORTS, displayName: i18n.t('Expected reports') },
];

export class Groups extends Component {
    state = {
        indicators: [],
        dataElements: [],
        dataSets: DATA_SETS_CONSTANTS,
        eventDataItems: [],
        programIndicators: [],
        dataDimId: '',
    };

    handleChange = async event => {
        const dataDimAlt = await apiFetchAlternatives(
            this.props.dataType,
            event.target.value
        );
        this.props.onContentChange(dataDimAlt);
        this.setState({ dataDimId: event.target.value });
    };

    renderDropDownItems = () => {
        const { dataType } = this.props;

        const items = [
            {
                id: 'DEFAULT',
                displayName: PLACEHOLDERS[dataType].defaultAlternative,
            },
            ...this.state[dataType],
        ];

        return dataType.length
            ? items.map(item => (
                  <MenuItem key={item.id} value={item.id}>
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
            const dataTypeAlternatives = await apiFetchGroups(dataType);
            this.setState({ [dataType]: dataTypeAlternatives });
        } else {
            console.log('dataType not set, or already fetched');
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
                        {PLACEHOLDERS[dataTypeKey].label}
                    </InputLabel>
                    <Select
                        value={this.state.dataDimId}
                        onChange={this.handleChange}
                        disableUnderline
                        SelectDisplayProps={{ style: style.dropDown }}
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
