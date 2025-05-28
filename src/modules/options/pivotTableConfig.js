import i18n from '@dhis2/d2-i18n'
import React from 'react'
import NoticeBox from '../../components/VisualizationOptions/NoticeBox.js'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType.js'
import ApprovalLevel from '../../components/VisualizationOptions/Options/ApprovalLevel.js'
import ColSubTotals from '../../components/VisualizationOptions/Options/ColSubTotals.js'
import ColTotals from '../../components/VisualizationOptions/Options/ColTotals.js'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly.js'
import Cumulative from '../../components/VisualizationOptions/Options/Cumulative.js'
import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues.js'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator.js'
import DisplayDensity from '../../components/VisualizationOptions/Options/DisplayDensity.js'
import FixColumnHeaders from '../../components/VisualizationOptions/Options/FixColumnHeaders.js'
import FixRowHeaders from '../../components/VisualizationOptions/Options/FixRowHeaders.js'
import FontSize from '../../components/VisualizationOptions/Options/FontSize.js'
import HideEmptyColumns from '../../components/VisualizationOptions/Options/HideEmptyColumns.js'
import HideEmptyRows from '../../components/VisualizationOptions/Options/HideEmptyRows.js'
import NumberType from '../../components/VisualizationOptions/Options/NumberType.js'
import ParamOrganisationUnit from '../../components/VisualizationOptions/Options/ParamOrganisationUnit.js'
import ParamParentOrganisationUnit from '../../components/VisualizationOptions/Options/ParamParentOrganisationUnit.js'
import ParamReportingPeriod from '../../components/VisualizationOptions/Options/ParamReportingPeriod.js'
import Regression from '../../components/VisualizationOptions/Options/Regression.js'
import RowSubTotals from '../../components/VisualizationOptions/Options/RowSubTotals.js'
import RowTotals from '../../components/VisualizationOptions/Options/RowTotals.js'
import ShowDimensionLabels from '../../components/VisualizationOptions/Options/ShowDimensionLabels.js'
import ShowHierarchy from '../../components/VisualizationOptions/Options/ShowHierarchy.js'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.js'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder.js'
import Subtitle from '../../components/VisualizationOptions/Options/Subtitle.js'
import Title from '../../components/VisualizationOptions/Options/Title.js'
import TopLimit from '../../components/VisualizationOptions/Options/TopLimit.js'
import {
    OPTION_AGGREGATION_TYPE,
    OPTION_APPROVAL_LEVEL,
    OPTION_COL_TOTALS,
    OPTION_COMPLETED_ONLY,
    OPTION_CUMULATIVE_VALUES,
    OPTION_CUMULATIVE,
    OPTION_DIGIT_GROUP_SEPARATOR,
    OPTION_DISPLAY_DENSITY,
    OPTION_FIX_COLUMN_HEADERS,
    OPTION_FIX_ROW_HEADERS,
    OPTION_FONT_SIZE,
    OPTION_GRAND_PARENT_ORGANISATION_UNIT,
    OPTION_HIDE_EMPTY_COLUMNS,
    OPTION_HIDE_EMPTY_ROWS,
    OPTION_LEGEND,
    OPTION_MEASURE_CRITERIA,
    OPTION_NUMBER_TYPE,
    OPTION_ORGANISATION_UNIT,
    OPTION_PARENT_ORGANISATION_UNIT,
    OPTION_REGRESSION,
    OPTION_REPORTING_PERIOD,
    OPTION_ROW_SUB_TOTALS,
    OPTION_ROW_TOTALS,
    OPTION_SERIES,
    OPTION_SHOW_DIMENSION_LABELS,
    OPTION_SHOW_HIERARCHY,
    OPTION_SKIP_ROUNDING,
    OPTION_SORT_ORDER,
    OPTION_SUBTITLE,
    OPTION_TITLE,
    OPTION_TOP_LIMIT,
} from '../options.js'
import getAdvancedTemplate from './sections/templates/advanced.js'
import getDisplayTemplate from './sections/templates/display.js'
import getEmptyDataTemplate from './sections/templates/emptyData.js'
import getTotalsTemplate from './sections/templates/totals.js'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.js'
import getLimitValuesTab from './tabs/limitValues.js'
import getSeriesTab from './tabs/series.js'
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

export const pivotTableOptionNames = () => [
    // Data tab
    OPTION_CUMULATIVE_VALUES,
    OPTION_SHOW_DIMENSION_LABELS,
    OPTION_SKIP_ROUNDING,
    'colSubTotals',
    OPTION_COL_TOTALS,
    OPTION_ROW_TOTALS,
    OPTION_ROW_SUB_TOTALS,
    OPTION_HIDE_EMPTY_COLUMNS,
    OPTION_HIDE_EMPTY_ROWS,
    OPTION_AGGREGATION_TYPE,
    OPTION_NUMBER_TYPE,
    OPTION_COMPLETED_ONLY,
    OPTION_APPROVAL_LEVEL,
    // Legend tab
    OPTION_LEGEND,
    // Series tab
    OPTION_SERIES,
    // Style tab
    OPTION_TITLE,
    OPTION_SUBTITLE,
    OPTION_DISPLAY_DENSITY,
    OPTION_FONT_SIZE,
    OPTION_DIGIT_GROUP_SEPARATOR,
    OPTION_FIX_COLUMN_HEADERS,
    OPTION_FIX_ROW_HEADERS,
    OPTION_SHOW_HIERARCHY,
    // Limit values tab
    OPTION_MEASURE_CRITERIA,
    // Parameters tab
    OPTION_REPORTING_PERIOD,
    OPTION_ORGANISATION_UNIT,
    OPTION_PARENT_ORGANISATION_UNIT,
    OPTION_GRAND_PARENT_ORGANISATION_UNIT,
    OPTION_REGRESSION,
    OPTION_CUMULATIVE,
    OPTION_SORT_ORDER,
    OPTION_TOP_LIMIT,
]
