import React from 'react'
import PropTypes from 'prop-types'

const PivotTableIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 48 0 48 48 0 48" />
            <rect
                stroke="#4A5768"
                strokeWidth="2"
                x="7"
                y="11"
                width="34"
                height="26"
            />
            <rect fill="#4A5768" x="8" y="18" width="32" height="2" />
            <rect fill="#4A5768" x="19" y="11" width="2" height="26" />
            <rect fill="#4A5768" x="8" y="24" width="32" height="2" />
            <rect fill="#4A5768" x="8" y="30" width="32" height="2" />
        </g>
    </svg>
)

PivotTableIcon.propTypes = {
    style: PropTypes.object,
}

export default PivotTableIcon
