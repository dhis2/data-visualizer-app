import PropTypes from 'prop-types'
import React from 'react'

const StackedBarIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd" transform="matrix(0 -1 -1 0 48 48)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <polygon fill="#147CD7" points="12 19 18 19 18 36 12 36" />
            <polygon fill="#FFC324" points="12 10 18 10 18 19 12 19" />
            <polygon fill="#147CD7" points="22 25 28 25 28 36 22 36" />
            <polygon fill="#FFC324" points="22 15 28 15 28 25 22 25" />
            <polygon fill="#147CD7" points="32 21 38 21 38 36 32 36" />
            <polygon fill="#FFC324" points="32 12 38 12 38 21 32 21" />
            <polygon fill="#4A5768" points="6 6 8 6 8 42 6 42" />
            <polygon fill="#4A5768" points="6 40 42 40 42 42 6 42" />
        </g>
    </svg>
)

StackedBarIcon.propTypes = {
    style: PropTypes.object,
}

export default StackedBarIcon
