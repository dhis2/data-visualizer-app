import React from 'react'
import PropTypes from 'prop-types'

const RadarIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd" transform="rotate(90 24 24)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <circle cx="24" cy="24" r="16" stroke="#4A5768" strokeWidth="2" />
            <circle cx="24" cy="24" r="9" stroke="#4A5768" strokeWidth="2" />
            <circle cx="24" cy="33" r="3" fill="#147CD7" />
            <circle cx="10" cy="16" r="3" fill="#147CD7" />
            <circle cx="37" cy="15" r="3" fill="#147CD7" />
            <polygon
                stroke="#147CD7"
                strokeWidth="2"
                points="24 33 10 16 37 15"
            />
        </g>
    </svg>
)

RadarIcon.propTypes = {
    style: PropTypes.object,
}

export default RadarIcon
