import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import i18n from '@dhis2/d2-i18n'
import { useDataEngine } from '@dhis2/app-runtime'
import { Divider, Menu, MenuItem, Popper } from '@dhis2/ui-core'
import { VIS_TYPE_PIVOT_TABLE, DIMENSION_ID_ORGUNIT, layoutReplaceDimension } from '@dhis2/analytics'

import { apiFetchLegendSets } from './api/legendSets'
import { apiFetchOuData } from './api/organisationUnits'
import ChartPlugin from './ChartPlugin'
import PivotPlugin from './PivotPlugin'
import { fetchData } from './modules/fetchData'

import styles from './styles/VisualizationPlugin.style.js'

const LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM = 'BY_DATA_ITEM'
const LEGEND_DISPLAY_STRATEGY_FIXED = 'FIXED'

const ContextualMenu = ({ config, onClick }) => {
    const engine = useDataEngine()
    const [ouData, setOuData] = useState(undefined)

    const doFetchOuData = useCallback(
        async ouId => {
            const ouData = await apiFetchOuData(engine, ouId)

            return ouData
        },
        [engine]
    )

    useEffect(() => {
        setOuData(null)

        const doFetch = async () => {
            const ouData = await doFetchOuData(config.ouId)

            setOuData(ouData.orgUnits)
        }

        doFetch()

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [config])

    return (
        <Menu>
            {ouData &&
                <MenuItem label={i18n.t('Org. unit drill down/up')}>
                    <Menu>
                        {
                            Boolean(ouData?.children.length) && (
                                <>
                                    <MenuItem dense label={`Show level ${ouData.children[0].level} in ${ouData.name}`} onClick={() => onClick({ ou: { id: ouData.id, level: ouData.children[0].level } })}/>
                                    {ouData?.parent && <Divider />}
                                </>
                            )
                        }
                        {ouData?.parent &&
                                <MenuItem dense label={i18n.t('Show {{orgunit}}', { orgunit: ouData.parent.name })} onClick={() => onClick({ ou: { id: ouData.parent.id } })} />
                        }
                    </Menu>
                </MenuItem>
            }
        </Menu>
    )
}

export const VisualizationPlugin = ({
    d2,
    visualization,
    filters,
    forDashboard,
    onError,
    onLoadingComplete,
    onResponsesReceived,
    onDrill,
    ...props
}) => {
    const engine = useDataEngine()
    const [fetchResult, setFetchResult] = useState(null)
    const [contextualMenuRef, setContextualMenuRef] = useState(undefined)
    const [contextualMenuConfig, setContextualMenuConfig] = useState({})
    const [vis, setVis] = useState(visualization)

    const onToggleContextualMenu = (ref, data) => {
        console.log('context menu args', ref, data)

        setContextualMenuRef(ref)
        setContextualMenuConfig(data)
    }

    const closeContextualMenu = () => setContextualMenuRef(undefined)

    const onContextualMenuItemClick = args => {
        closeContextualMenu()
onDrill = undefined
        if (!onDrill) {
            if (args.ou) {
                console.log('replace ou dimension', args.ou)
                const ouItems = [
                    {id: args.ou.id }
                ]

                if (args.ou.level) {
                    ouItems.push({
                        id: args.ou.level
                    })
                }

                setVis(layoutReplaceDimension(visualization, DIMENSION_ID_ORGUNIT, ouItems))

                // TODO
                // if (args.pe) {
            }
        } else {
            onDrill(args)
        }
    }

    const doFetchData = useCallback(async () => {
        const result = await fetchData({
            visualization: vis,//visualization,
            filters,
            d2,
            forDashboard,
        })

        if (result.responses.length) {
            onResponsesReceived(result.responses)
        }

        return result
    }, [d2, filters, forDashboard, onResponsesReceived, vis])//visualization])

    const doFetchLegendSets = useCallback(
        async legendSetIds => {
            if (!legendSetIds.length) {
                return []
            }

            const response = await apiFetchLegendSets(engine, legendSetIds)

            if (response && response.legendSets) {
                return response.legendSets.legendSets
            }
        },
        [engine]
    )

    useEffect(() => {
        setVis(visualization)
    }, [visualization])

    useEffect(() => {
        setFetchResult(null)
        console.log('in effect')
        const doFetchAll = async () => {
            const { responses, extraOptions } = await doFetchData(
                vis, //ualization,
                filters,
                forDashboard
            )

            const legendSetIds = []

            //switch (visualization.legendDisplayStrategy) {
            switch (vis.legendDisplayStrategy) {
                case LEGEND_DISPLAY_STRATEGY_FIXED:
                    //if (visualization.legendSet && visualization.legendSet.id) {
                    if (vis.legendSet && vis.legendSet.id) {
                        //legendSetIds.push(visualization.legendSet.id)
                        legendSetIds.push(vis.legendSet.id)
                    }
                    break
                case LEGEND_DISPLAY_STRATEGY_BY_DATA_ITEM: {
                    // parse responses to extract legendSet ids from metaData
                    // multiple responses are only for YOY which does not support legends
                    // safe to use only the 1st
                    // dx dimensions might not be present, the empty array covers that case
                    const dxIds = responses[0].metaData.dimensions.dx || []

                    dxIds.forEach(dxId => {
                        const legendSetId =
                            responses[0].metaData.items[dxId].legendSet

                        if (legendSetId) {
                            legendSetIds.push(legendSetId)
                        }
                    })

                    break
                }
            }

            const legendSets = await doFetchLegendSets(legendSetIds)

            setFetchResult({
                visualization: vis,
                legendSets,
                responses,
                extraOptions,
            })
            onLoadingComplete()
        }

        doFetchAll().catch(error => {
            onError(error)
        })

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [vis, filters, forDashboard])

    if (!fetchResult) {
        return null
    }

    return (
        <>
        {(!fetchResult.visualization.type ||
        fetchResult.visualization.type === VIS_TYPE_PIVOT_TABLE) ?
            <PivotPlugin
                visualization={fetchResult.visualization}
                responses={fetchResult.responses}
                legendSets={fetchResult.legendSets}
                onToggleContextualMenu={onToggleContextualMenu}
                {...props}
            />
            :
            <ChartPlugin
                visualization={fetchResult.visualization}
                responses={fetchResult.responses}
                extraOptions={fetchResult.extraOptions}
                legendSets={fetchResult.legendSets}
                {...props}
            />
        }
        {contextualMenuRef &&
            createPortal(
                <div onClick={closeContextualMenu} style={styles.backdrop}>
                    <Popper reference={contextualMenuRef} placement="right">
                        <ContextualMenu config={contextualMenuConfig} onClick={onContextualMenuItemClick} />
                    </Popper>
                </div>,
                document.body
            )}
        </>
    )
}

VisualizationPlugin.defaultProps = {
    filters: {},
    forDashboard: false,
    onDrill: Function.prototype,
    onError: Function.prototype,
    onLoadingComplete: Function.prototype,
    onResponsesReceived: Function.prototype,
    visualization: {},
}
VisualizationPlugin.propTypes = {
    d2: PropTypes.object.isRequired,
    visualization: PropTypes.object.isRequired,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    onDrill: PropTypes.func,
    onError: PropTypes.func,
    onLoadingComplete: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}
