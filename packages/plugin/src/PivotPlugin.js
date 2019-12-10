import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash-es/isEqual'
import i18n from '@dhis2/d2-i18n'
import {
    api as d2aApi,
    table as d2aTable,
    config as d2aConfig,
    Layout as d2aLayout,
    Response as d2aResponse,
} from 'd2-analysis'
import { apiFetchVisualization } from './api/visualization'
import {
    apiFetchAnalytics,
} from './api/analytics'
import { getOptionsForRequest } from './modules/options'
import LoadingMask from './widgets/LoadingMask'

import { pivotTableStyles } from './styles/PivotPlugin.style.js';

class PivotPlugin extends Component {
    constructor(props) {
        super(props)

        this.canvasRef = React.createRef()

        this.recreateVisualization = Function.prototype

        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        this.renderTable()
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.config, prevProps.config)) {
            this.renderTable()
            return
        }

        if (!isEqual(this.props.filters, prevProps.filters)) {
            this.renderTable()
            return
        }

        // id set by DV app, style works in dashboards
        if (
            this.props.id !== prevProps.id ||
            !isEqual(this.props.style, prevProps.style)
        ) {
            this.recreateVisualization(0) // disable animation
            return
        }
    }

    getRequestOptions = (visualization, filters) => {
        const options = getOptionsForRequest().reduce(
            (map, [option, props]) => {
                // only add parameter if value !== default
                if (
                    visualization[option] !== undefined &&
                    visualization[option] !== props.defaultValue
                ) {
                    map[option] = visualization[option]
                }

                return map
            },
            {}
        )

        // interpretation filter
        if (filters.relativePeriodDate) {
            options.relativePeriodDate = filters.relativePeriodDate
        }

        // global filters
        // userOrgUnit
        if (filters.userOrgUnit && filters.userOrgUnit.length) {
            const ouIds = filters.userOrgUnit.map(
                ouPath => ouPath.split('/').slice(-1)[0]
            )

            options.userOrgUnit = ouIds.join(';')
        }

        return options
    }

    getConfigById = id => {
        return apiFetchVisualization(this.props.d2, 'reportTable', id)
    }

    renderTable = async () => {
        const {
            config,
            filters,
            forDashboard,
            onResponsesReceived,
            onError,
        } = this.props

        const i18nManager = {
            get: string => i18n.t(string),
        }

        const appManager = {
            getLegendSetById: () => '',
            getApiPath: () => '',
        }

        const uiManager = {}

        const d2aOptionConfig = new d2aConfig.OptionConfig()
        d2aOptionConfig.setI18nManager(i18nManager)
        d2aOptionConfig.init()

        const refs = {
            api: d2aApi,
            appManager,
            uiManager,
            i18nManager,
            optionConfig: d2aOptionConfig,
        }

        try {
            const visualization =
                Object.keys(config).length === 1 && config.id
                    ? await this.getConfigById(config.id)
                    : config

            const options = this.getRequestOptions(visualization, filters)

            const responses = await apiFetchAnalytics(
                this.props.d2,
                visualization,
                options
            )

            if (responses.length) {
                onResponsesReceived(responses)
            }

            this.recreateVisualization = () => {
                const remappedOptions = {
                    showColTotals: visualization.colTotals,
                    showRowTotals: visualization.rowTotals,
                    showColSubTotals: visualization.colSubTotals,
                    showRowSubTotals: visualization.rowSubTotals,
                    numberType: visualization.numberType || 'VALUE', // TODO read default from options, perhaps better idea is to compute layout content in app
                }

                const layout = new d2aLayout(
                    refs,
                    visualization,
                    remappedOptions
                )

                const extraOptions = { renderLimit: 100000, trueTotals: true }

                const pivotTable = new d2aTable.PivotTable(
                    refs,
                    layout,
                    new d2aResponse(refs, responses[0].response),
                    extraOptions
                )

                pivotTable.initialize()

                pivotTable.build()

                this.canvasRef.current.innerHTML = pivotTable.render()
            }

            this.recreateVisualization()

            this.setState({ isLoading: false })
        } catch (error) {
            onError(error)
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.isLoading ? <LoadingMask /> : null}
                <div ref={this.canvasRef} style={this.props.style}>
                    <style jsx>{pivotTableStyles}</style>
                </div>
            </Fragment>
        )
    }
}

PivotPlugin.defaultProps = {
    config: {},
    filters: {},
    forDashboard: false,
    style: {},
    animation: 200,
    onError: Function.prototype,
    onResponsesReceived: Function.prototype,
}

PivotPlugin.propTypes = {
    config: PropTypes.object.isRequired,
    d2: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    id: PropTypes.number,
    style: PropTypes.object,
    onResponsesReceived: PropTypes.func,
}

export default PivotPlugin
