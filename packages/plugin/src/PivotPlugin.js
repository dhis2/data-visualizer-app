import React from 'react'
import PropTypes from 'prop-types'

import { PivotTable } from '@dhis2/analytics'

const PivotPlugin = ({
    responses,
    legendSets,
    visualization,
    style,
    id: renderCounter,
}) => {
    return (
        <div style={style}>
            <PivotTable
                visualization={visualization}
                data={responses[0].response}
                legendSets={legendSets}
                renderCounter={renderCounter}
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
}

export default PivotPlugin
