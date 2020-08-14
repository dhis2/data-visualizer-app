import React from 'react'
import PropTypes from 'prop-types'

const AreaIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={style}>
        <g fill="none" fillRule="evenodd" transform="matrix(0 -1 -1 0 48 48)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <polygon fill="#4A5768" points="6 6 8 6 8 42 6 42" />
            <polygon fill="#4A5768" points="6 40 42 40 42 42 6 42" />
            <polygon
                fill="#90CAF9"
                points="28 36 34 29 27 24 31 17 20 10 12 10 12 36"
            />
            <polyline
                stroke="#147CD7"
                strokeWidth="2"
                points="28 36 34 29 27 24 31 17 20 10"
            />
        </g>
    </svg>
)

AreaIcon.propTypes = {
    style: PropTypes.object,
}

export default AreaIcon
