import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import i18n from '@dhis2/d2-i18n';
import Totals from './Totals';
import { apiFetchGroups, apiFetchAlternatives } from '../../../api/dimensions'; // TODO
import { colors } from '../../../colors';
import { DATA_SETS_CONSTANTS, getReportingRates } from './defaults';

const style = {
    container: {
        height: 53,
        width: 420,
        border: `1px solid ${colors.greyLight}`,
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
        color: colors.greyDark,
        paddingBottom: 15,
    },
};

const INDICATOR = i18n.t('Select indicator group');
const DATA_ELEMENTS = i18n.t('Select data element group');
const DATA_SET = i18n.t('Select data sets');
const PROG_INDICATOR = i18n.t('Select program');

const ALL_INDICATORS = i18n.t('[ All indicators ]');
const ALL_DATA_ELEMENTS = i18n.t('[ All data elements ]');
const ALL_METRICS = i18n.t('[ All metrics ]');

const DEFAULTS = {
    indicators: { label: INDICATOR, defaultAlternative: ALL_INDICATORS },
    dataElements: {
        label: DATA_ELEMENTS,
        defaultAlternative: ALL_DATA_ELEMENTS,
    },
    dataSets: { label: DATA_SET, defaultAlternative: ALL_METRICS },
};

export class Groups extends Component {
    state = {
        indicators: [],
        dataElements: [],
        dataSets: DATA_SETS_CONSTANTS,
        eventDataItems: [],
        programIndicators: [],
        dataDimId: '',
    };

    // TODO : Flytt opp og refactor, dobbeltsjekk API call
    handleChange = async event => {
        let newContent = await apiFetchAlternatives(
            this.props.dataType,
            event.target.value
        );

        if (this.props.dataType === 'dataSets')
            newContent = getReportingRates(newContent, event.target.value);

        this.setState({ dataDimId: event.target.value });
        this.props.onGroupChange(newContent);
    };

    haveDefaultAlternatives = () => {
        return (
            this.props.dataType !== 'eventDataItems' &&
            this.props.dataType !== 'programIndicators'
        );
    };

    getDefaultAlternative = () => {
        return this.haveDefaultAlternatives()
            ? {
                  id: 'ALL',
                  displayName: DEFAULTS[this.props.dataType].defaultAlternative,
              }
            : null;
    };

    getCurrentGroupType = () => {
        return this.haveDefaultAlternatives()
            ? DEFAULTS[this.props.dataType].label
            : PROG_INDICATOR;
    };

    renderDropDownItems = () => {
        const { dataType } = this.props;
        let optionItems = this.state[dataType];

        if (this.haveDefaultAlternatives())
            optionItems = [
                this.getDefaultAlternative(),
                ...this.state[dataType],
            ];

        return dataType.length
            ? optionItems.map(item => (
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

    // fetch if dataType have changed and API call have not yet been made
    async componentDidUpdate() {
        const { dataType } = this.props;

        if (this.shouldFetchItems()) {
            const dataTypeAlternatives = await apiFetchGroups(dataType);
            this.setState({ [dataType]: dataTypeAlternatives });
        }
    }

    render = () => {
        const label = this.getCurrentGroupType();
        const renderItems = this.renderDropDownItems();
        const showTotals = this.props.dataType === 'dataElements';

        return (
            <div style={style.container}>
                <div style={style.groupContainer}>
                    <InputLabel style={style.titleText}>{label}</InputLabel>
                    <Select
                        value={this.state.dataDimId}
                        onChange={this.handleChange}
                        SelectDisplayProps={{ style: style.dropDown }}
                        disableUnderline
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
