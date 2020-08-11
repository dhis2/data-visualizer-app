import React from 'react'
import PropTypes from 'prop-types'

const LineIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd" transform="matrix(0 -1 -1 0 48 48)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <polygon fill="#4A5768" points="6 6 8 6 8 42 6 42" />
            <polygon fill="#4A5768" points="6 40 42 40 42 42 6 42" />
            <polyline
                stroke="#147CD7"
                strokeWidth="2"
                points="30 36 23 30 29 24 17 18 28 10"
            />
        </g>
    </svg>
)

LineIcon.propTypes = {
    style: PropTypes.object,
}

export default LineIcon
