import { PivotTable } from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React from 'react'

const PivotPlugin = ({
    responses,
    legendSets,
    visualization,
    style,
    id: renderCounter,
    onToggleContextualMenu,
}) => {
    return (
        <div style={style}>
            <PivotTable
                visualization={visualization}
                data={responses[0].response}
                legendSets={legendSets}
                renderCounter={renderCounter}
                onToggleContextualMenu={onToggleContextualMenu}
            />
        </div>
    )
}

PivotPlugin.defaultProps = {
    style: {},
}

PivotPlugin.propTypes = {
    legendSets: PropTypes.arrayOf(PropTypes.object).isRequired,
    responses: PropTypes.arrayOf(PropTypes.object).isRequired,
    visualization: PropTypes.object.isRequired,
    id: PropTypes.number,
    style: PropTypes.object,
    onToggleContextualMenu: PropTypes.func,
}

export default PivotPlugin
