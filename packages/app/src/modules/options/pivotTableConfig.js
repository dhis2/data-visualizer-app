/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import ShowDimensionLabels from '../../components/VisualizationOptions/Options/ShowDimensionLabels'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import ColTotals from '../../components/VisualizationOptions/Options/ColTotals'
import ColSubTotals from '../../components/VisualizationOptions/Options/ColSubTotals'
import RowTotals from '../../components/VisualizationOptions/Options/RowTotals'
import RowSubTotals from '../../components/VisualizationOptions/Options/RowSubTotals'
import HideEmptyColumns from '../../components/VisualizationOptions/Options/HideEmptyColumns'
import HideEmptyRows from '../../components/VisualizationOptions/Options/HideEmptyRows'
import NumberType from '../../components/VisualizationOptions/Options/NumberType'
import Title from '../../components/VisualizationOptions/Options/Title'
import DisplayDensity from '../../components/VisualizationOptions/Options/DisplayDensity'
import FontSize from '../../components/VisualizationOptions/Options/FontSize'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator'
import MeasureCriteria from '../../components/VisualizationOptions/Options/MeasureCriteria'
import ParamReportingPeriod from '../../components/VisualizationOptions/Options/ParamReportingPeriod'
import ParamOrganisationUnit from '../../components/VisualizationOptions/Options/ParamOrganisationUnit'
import ParamParentOrganisationUnit from '../../components/VisualizationOptions/Options/ParamParentOrganisationUnit'
import Regression from '../../components/VisualizationOptions/Options/Regression'
import Cumulative from '../../components/VisualizationOptions/Options/Cumulative'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder'
import TopLimit from '../../components/VisualizationOptions/Options/TopLimit'
import ApprovalLevel from '../../components/VisualizationOptions/Options/ApprovalLevel'
import ShowHierarchy from '../../components/VisualizationOptions/Options/ShowHierarchy'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import getSeriesTab from './tabs/series'
import getDataTab from './tabs/data'
import getAdvancedTemplate from './templates/advanced'
import getDisplayTemplate from './templates/display'
import getTotalsTemplate from './templates/totals'
import getEmptyDataTemplate from './templates/emptyData'
import getLegendTab from './tabs/legend'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([
                <ShowDimensionLabels />,
                <SkipRounding />,
            ]),
        }),
        getTotalsTemplate({
            content: React.Children.toArray([
                <ColTotals />,
                <ColSubTotals />,
                <RowTotals />,
                <RowSubTotals />,
            ]),
        }),
        getEmptyDataTemplate({
            content: React.Children.toArray([
                <HideEmptyColumns />,
                <HideEmptyRows />,
            ]),
        }),
        getAdvancedTemplate({
            content: React.Children.toArray([
                <AggregationType />,
                <NumberType />,
                <CompletedOnly />,
                <ApprovalLevel />,
            ]),
        }),
    ]),
    getLegendTab(),
    getSeriesTab(),
    {
        key: 'style-tab',
        label: i18n.t('Style'),
        content: [
            {
                key: 'style-section-1',
                content: React.Children.toArray([
                    <Title label={i18n.t('Table title')} />,
                    <DisplayDensity />,
                    <FontSize />,
                    <DigitGroupSeparator />,
                ]),
            },
            {
                key: 'style-section-2',
                label: i18n.t('Labels'),
                content: React.Children.toArray([<ShowHierarchy />]),
            },
        ],
    },
    {
        key: 'limitValues-tab',
        label: i18n.t('Limit values'),
        content: [
            /*
            {
                key: 'limitValues-limit-numbers',
                label: i18n.t('Limit number of values'),
                content: [<TopLimit />],
            },*/
            {
                key: 'limitValues-limit-min-max',
                label: i18n.t('Limit minimum/maximum values'),
                content: React.Children.toArray([<MeasureCriteria />]),
            },
        ],
    },
    {
        key: 'parameters-tab',
        label: i18n.t('Parameters'),
        content: [
            {
                key: 'parameters-section-1',
                content: React.Children.toArray([
                    <ParamReportingPeriod />,
                    <ParamOrganisationUnit />,
                    <ParamParentOrganisationUnit />,
                    <Regression />,
                    <Cumulative />,
                    <SortOrder />,
                    <TopLimit />,
                ]),
            },
        ],
    },
]
