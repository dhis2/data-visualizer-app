import React from 'react'
import PropTypes from 'prop-types'

const PieIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd" transform="rotate(90 24 24)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <circle cx="24" cy="24" r="16" stroke="#4A5768" strokeWidth="2" />
            <path
                fill="#FFC324"
                d="M11,24 C11,31.1797017 16.8202983,37 24,37 C31.1797017,37 37,31.1797017 37,24 C37,16.8202983 31.1797017,11 24,11 L24,24 L11,24 Z"
                transform="rotate(165 24 24)"
            />
            <path
                fill="#147CD7"
                d="M11,24 C11,31.1797017 16.8202983,37 24,37 C31.1797017,37 37,31.1797017 37,24 C37,16.8202983 31.1797017,11 24,11 L24,24 L11,24 Z"
                transform="rotate(-15 24 24)"
            />
        </g>
    </svg>
)

PieIcon.propTypes = {
    style: PropTypes.object,
}

export default PieIcon
