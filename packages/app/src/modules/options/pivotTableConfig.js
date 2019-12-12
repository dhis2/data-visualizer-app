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
import LegendDisplayStyle from '../../components/VisualizationOptions/Options/LegendDisplayStyle'
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

export default [
    {
        key: 'data-tab',
        label: i18n.t('Data'),
        content: [
            {
                key: 'data-section-1',
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([
                    <ShowDimensionLabels />,
                    <SkipRounding />,
                ]),
                /* eslint-enable react/jsx-key */
            },
            {
                key: 'data-display-totals',
                label: i18n.t('Display totals'),
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([
                    <ColTotals />,
                    <ColSubTotals />,
                    <RowTotals />,
                    <RowSubTotals />,
                ]),
                /* eslint-enable react/jsx-key */
            },
            {
                key: 'data-display-empty-data',
                label: i18n.t('Display empty data'),
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([
                    <HideEmptyColumns />,
                    <HideEmptyRows />,
                ]),
                /* eslint-enable react/jsx-key */
            },
            {
                key: 'data-advanced',
                label: i18n.t('Advanced'),
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([
                    <AggregationType />,
                    <NumberType />,
                ]),
                /* eslint-enable react/jsx-key */
            },
        ],
    },
    {
        key: 'legend-tab',
        label: i18n.t('Legend'),
        content: [
            {
                key: 'legend-legend-type',
                label: i18n.t('Legend type'),
                content: React.Children.toArray([]),
            },
            {
                key: 'legend-legend-setup',
                label: i18n.t('Legend setup'),
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([<LegendDisplayStyle />]),
                /* eslint-enable react/jsx-key */
            },
        ],
    },
    {
        key: 'style-tab',
        label: i18n.t('Style'),
        content: [
            {
                key: 'style-section-1',
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([
                    <Title label={i18n.t('Table title')} />,
                    <DisplayDensity />,
                    <FontSize />,
                    <DigitGroupSeparator />,
                ]),
                /* eslint-enable react/jsx-key */
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
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([<MeasureCriteria />]),
                /* eslint-enable react/jsx-key */
            },
        ],
    },
    {
        key: 'parameters-tab',
        label: i18n.t('Parameters'),
        content: [
            {
                key: 'parameters-section-1',
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([
                    <ParamReportingPeriod />,
                    <ParamOrganisationUnit />,
                    <ParamParentOrganisationUnit />,
                    <Regression />,
                    <Cumulative />,
                    <SortOrder />,
                    <TopLimit />,
                ]),
                /* eslint-enable react/jsx-key */
            },
        ],
    },
]
