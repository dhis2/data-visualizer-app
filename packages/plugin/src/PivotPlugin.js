import React from 'react'
import PropTypes from 'prop-types'

import { PivotTable } from '@dhis2/analytics'

const PivotPlugin = ({ responses, legendSets, visualization, style }) => {
    return (
        <div style={{ width: '100%', height: '100%', ...style }}>
            <PivotTable
                visualization={visualization}
                data={responses[0].response}
                legendSets={legendSets}
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
    style: PropTypes.object,
}

export default PivotPlugin
