import i18n from '@dhis2/d2-i18n'
import React from 'react'
import NoticeBox from '../../components/VisualizationOptions/NoticeBox.jsx'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType.jsx'
import ApprovalLevel from '../../components/VisualizationOptions/Options/ApprovalLevel.jsx'
import ColSubTotals from '../../components/VisualizationOptions/Options/ColSubTotals.jsx'
import ColTotals from '../../components/VisualizationOptions/Options/ColTotals.jsx'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly.jsx'
import Cumulative from '../../components/VisualizationOptions/Options/Cumulative.jsx'
import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues.jsx'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator.jsx'
import DisplayDensity from '../../components/VisualizationOptions/Options/DisplayDensity.jsx'
import FixColumnHeaders from '../../components/VisualizationOptions/Options/FixColumnHeaders.jsx'
import FixRowHeaders from '../../components/VisualizationOptions/Options/FixRowHeaders.jsx'
import FontSize from '../../components/VisualizationOptions/Options/FontSize.jsx'
import HideEmptyColumns from '../../components/VisualizationOptions/Options/HideEmptyColumns.jsx'
import HideEmptyRows from '../../components/VisualizationOptions/Options/HideEmptyRows.jsx'
import NumberType from '../../components/VisualizationOptions/Options/NumberType.jsx'
import ParamOrganisationUnit from '../../components/VisualizationOptions/Options/ParamOrganisationUnit.jsx'
import ParamParentOrganisationUnit from '../../components/VisualizationOptions/Options/ParamParentOrganisationUnit.jsx'
import ParamReportingPeriod from '../../components/VisualizationOptions/Options/ParamReportingPeriod.jsx'
import Regression from '../../components/VisualizationOptions/Options/Regression.jsx'
import RowSubTotals from '../../components/VisualizationOptions/Options/RowSubTotals.jsx'
import RowTotals from '../../components/VisualizationOptions/Options/RowTotals.jsx'
import ShowDimensionLabels from '../../components/VisualizationOptions/Options/ShowDimensionLabels.jsx'
import ShowHierarchy from '../../components/VisualizationOptions/Options/ShowHierarchy.jsx'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.jsx'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder.jsx'
import Subtitle from '../../components/VisualizationOptions/Options/Subtitle.jsx'
import Title from '../../components/VisualizationOptions/Options/Title.jsx'
import TopLimit from '../../components/VisualizationOptions/Options/TopLimit.jsx'
import getAdvancedTemplate from './sections/templates/advanced.js'
import getDisplayTemplate from './sections/templates/display.js'
import getEmptyDataTemplate from './sections/templates/emptyData.js'
import getTotalsTemplate from './sections/templates/totals.js'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.jsx'
import getLimitValuesTab from './tabs/limitValues.jsx'
import getSeriesTab from './tabs/series.jsx'
import getStyleTab from './tabs/style.js'

export default ({
    hasCumulativeValuesInPt,
    hasDimensionItemsInColumns,
    hasDimensionItemsInRows,
}) => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([
                <CumulativeValues />,
                <ShowDimensionLabels />,
                <SkipRounding />,
            ]),
        }),
        getTotalsTemplate({
            hasCumulativeValuesInPt,
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
                <Subtitle label={i18n.t('Table subtitle')} />,
                <DisplayDensity />,
                <FontSize />,
                <DigitGroupSeparator />,
                <FixColumnHeaders
                    columnsHasItems={hasDimensionItemsInColumns}
                />,
                <FixRowHeaders rowsHasItems={hasDimensionItemsInRows} />,
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
