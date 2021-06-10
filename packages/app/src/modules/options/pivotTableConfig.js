/* eslint-disable react/jsx-key */
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import NoticeBox from '../../components/VisualizationOptions/NoticeBox'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import ApprovalLevel from '../../components/VisualizationOptions/Options/ApprovalLevel'
import ColSubTotals from '../../components/VisualizationOptions/Options/ColSubTotals'
import ColTotals from '../../components/VisualizationOptions/Options/ColTotals'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import Cumulative from '../../components/VisualizationOptions/Options/Cumulative'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator'
import DisplayDensity from '../../components/VisualizationOptions/Options/DisplayDensity'
import FontSize from '../../components/VisualizationOptions/Options/FontSize'
import HideEmptyColumns from '../../components/VisualizationOptions/Options/HideEmptyColumns'
import HideEmptyRows from '../../components/VisualizationOptions/Options/HideEmptyRows'
import NumberType from '../../components/VisualizationOptions/Options/NumberType'
import ParamOrganisationUnit from '../../components/VisualizationOptions/Options/ParamOrganisationUnit'
import ParamParentOrganisationUnit from '../../components/VisualizationOptions/Options/ParamParentOrganisationUnit'
import ParamReportingPeriod from '../../components/VisualizationOptions/Options/ParamReportingPeriod'
import Regression from '../../components/VisualizationOptions/Options/Regression'
import RowSubTotals from '../../components/VisualizationOptions/Options/RowSubTotals'
import RowTotals from '../../components/VisualizationOptions/Options/RowTotals'
import ShowDimensionLabels from '../../components/VisualizationOptions/Options/ShowDimensionLabels'
import ShowHierarchy from '../../components/VisualizationOptions/Options/ShowHierarchy'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder'
import Title from '../../components/VisualizationOptions/Options/Title'
import TopLimit from '../../components/VisualizationOptions/Options/TopLimit'
import getAdvancedTemplate from './sections/templates/advanced'
import getDisplayTemplate from './sections/templates/display'
import getEmptyDataTemplate from './sections/templates/emptyData'
import getTotalsTemplate from './sections/templates/totals'
import getDataTab from './tabs/data'
import getLegendTab from './tabs/legend'
import getLimitValuesTab from './tabs/limitValues'
import getSeriesTab from './tabs/series'
import getStyleTab from './tabs/style'

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
    getStyleTab([
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
    ]),
    getLimitValuesTab(),
    {
        key: 'parameters-tab',
        label: i18n.t('Parameters'),
        content: [
            {
                key: 'parameters-section-1',
                content: React.Children.toArray([
                    <NoticeBox
                        text={i18n.t(
                            'These options only apply to legacy tables like standard reports. Options set here will have no effect on tables made in Data Visualizer.'
                        )}
                        title={i18n.t('Applies to standard reports only')}
                        warning
                    />,
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
