import PropTypes from 'prop-types'
import React from 'react'

const BarIcon = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd" transform="matrix(0 -1 -1 0 48 48)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <polygon fill="#147CD7" points="12 22 18 22 18 36 12 36" />
            <polygon fill="#147CD7" points="22 9 28 9 28 36 22 36" />
            <polygon fill="#147CD7" points="32 19 38 19 38 36 32 36" />
            <polygon fill="#4A5768" points="6 6 8 6 8 42 6 42" />
            <polygon fill="#4A5768" points="6 40 42 40 42 42 6 42" />
        </g>
    </svg>
)

BarIcon.propTypes = {
    style: PropTypes.object,
}

export default BarIcon
