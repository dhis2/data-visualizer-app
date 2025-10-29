import { PivotTable } from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React from 'react'

const STYLE_PROP_DEFAULT = {}

const PivotPlugin = ({
    responses,
    legendSets,
    visualization,
    style = STYLE_PROP_DEFAULT,
    id: renderCounter,
    onToggleContextualMenu,
    availableWidth,
}) => {
    return (
        <div style={style}>
            <PivotTable
                visualization={visualization}
                data={responses[0].response}
                legendSets={legendSets}
                renderCounter={renderCounter}
                onToggleContextualMenu={onToggleContextualMenu}
                availableWidth={availableWidth}
            />
        </div>
    )
}

PivotPlugin.propTypes = {
    legendSets: PropTypes.arrayOf(PropTypes.object).isRequired,
    responses: PropTypes.arrayOf(PropTypes.object).isRequired,
    visualization: PropTypes.object.isRequired,
    availableWidth: PropTypes.number,
    id: PropTypes.number,
    style: PropTypes.object,
    onToggleContextualMenu: PropTypes.func,
}

export default PivotPlugin
