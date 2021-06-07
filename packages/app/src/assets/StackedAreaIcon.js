import PropTypes from 'prop-types'
import React from 'react'

const StackedAreaIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd" transform="matrix(0 -1 -1 0 48 48)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <polygon fill="#4A5768" points="6 6 8 6 8 42 6 42" />
            <polygon fill="#4A5768" points="6 40 42 40 42 42 6 42" />
            <polygon
                fill="#FFE7A7"
                points="33 36 27 28 30 23 25 17 27 10 17 10 21 17 18 23 22 28 17 36"
            />
            <polygon
                fill="#90CAF9"
                points="16 36 22 28 18 23 21 17 17 10 12 10 12 36"
            />
            <polyline
                stroke="#FFC324"
                strokeWidth="2"
                points="33 36 27 28 30 23 25 17 27 10"
            />
            <polyline
                stroke="#147CD7"
                strokeWidth="2"
                points="16 36 22 28 18 23 21 17 16.5 10"
            />
        </g>
    </svg>
)

StackedAreaIcon.propTypes = {
    style: PropTypes.object,
}

export default StackedAreaIcon
