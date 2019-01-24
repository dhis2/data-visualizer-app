import React from 'react';
import i18n from '@dhis2/d2-i18n';

import { DATA_SETS_CONSTANTS } from '../modules/dataSets';

export const CHART_AGGREGATE_AGGREGATABLE_TYPES = [
    'BOOLEAN',
    'TRUE_ONLY',
    'INTEGER',
    'INTEGER_POSITIVE',
    'INTEGER_NEGATIVE',
    'INTEGER_ZERO_OR_POSITIVE',
    'NUMBER',
    'UNIT_INTERVAL',
    'PERCENTAGE',
];

export const ALL_ID = 'ALL';

const INDICATORS = 'indicators';
const DATA_ELEMENTS = 'dataElements';
const DATA_SETS = 'dataSets';
const EVENT_DATA_ITEMS = 'eventDataItems';
const PROGRAM_INDICATORS = 'programIndicators';

const TOTALS = 'totals';
const DETAIL = 'detail';

const programText = i18n.t('Program');
const selectProgramText = i18n.t('Select a program');

export const dataTypes = {
    [INDICATORS]: {
        id: INDICATORS,
        name: i18n.t('Indicators'),
        groupLabel: i18n.t('Select indicator group'),
        defaultGroup: { id: ALL_ID, name: i18n.t('[ All groups ]') },
        groupDetail: false,
    },
    [DATA_ELEMENTS]: {
        id: DATA_ELEMENTS,
        name: i18n.t('Data elements'),
        groupLabel: i18n.t('Select data element group'),
        defaultGroup: { id: ALL_ID, name: i18n.t('[ All data elements ]') },
        groupDetail: {
            alternatives: {
                [TOTALS]: i18n.t('Totals'),
                [DETAIL]: i18n.t('Details'),
            },
            default: TOTALS,
        },
    },
    [DATA_SETS]: {
        id: DATA_SETS,
        name: i18n.t('Data sets'),
        groupLabel: i18n.t('Select data sets'),
        defaultGroup: { id: ALL_ID, name: i18n.t('[ All metrics ]') },
        groupDetail: false,
        augmentAlternatives: (alternatives, groupId) =>
            getReportingRates(alternatives, groupId),
    },
    [EVENT_DATA_ITEMS]: {
        id: EVENT_DATA_ITEMS,
        name: i18n.t('Event data items'),
        groupLabel: programText,
        placeholder: () => <span>{selectProgramText}</span>,
        defaultGroup: null,
        groupDetail: false,
    },
    [PROGRAM_INDICATORS]: {
        id: PROGRAM_INDICATORS,
        name: i18n.t('Program indicators'),
        groupLabel: programText,
        placeholder: () => <span>{selectProgramText}</span>,
        defaultGroup: null,
        groupDetail: false,
    },
};

export function defaultGroupId(dataType) {
    return dataTypes[dataType].defaultGroup
        ? dataTypes[dataType].defaultGroup.id
        : '';
}

export function defaultGroupDetail(dataType) {
    return dataTypes[dataType].groupDetail
        ? dataTypes[dataType].groupDetail.default
        : '';
}

export const DEFAULT_DATATYPE_ID = INDICATORS;

const getReportingRates = (contents, groupSetId) => {
    let dataSets = [];

    const reportingRateIndex = DATA_SETS_CONSTANTS.find(
        item => item.id === groupSetId
    );

    groupSetId === ALL_ID
        ? DATA_SETS_CONSTANTS.forEach(
              reportingRate =>
                  (dataSets = [
                      ...dataSets,
                      ...contents.map(dataSet =>
                          concatReportingRate(dataSet, reportingRate)
                      ),
                  ])
          )
        : (dataSets = contents.map(dataSet =>
              concatReportingRate(dataSet, reportingRateIndex)
          ));

    return dataSets;
};

const concatReportingRate = (dataSet, reportingRate) => {
    return {
        id: `${dataSet.id}.${reportingRate.id}`,
        name: `${dataSet.name} (${reportingRate.name})`,
    };
};
