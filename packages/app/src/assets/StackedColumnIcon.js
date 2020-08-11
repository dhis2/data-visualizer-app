import React from 'react'
import PropTypes from 'prop-types'

const StackedColumnIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd">
            <polygon points="0 0 48 0 48 48 0 48" />
            <polygon fill="#147CD7" points="12 25 18 25 18 36 12 36" />
            <polygon fill="#FFC324" points="12 15 18 15 18 25 12 25" />
            <polygon fill="#147CD7" points="22 29 28 29 28 36 22 36" />
            <polygon fill="#FFC324" points="22 17 28 17 28 29 22 29" />
            <polygon fill="#147CD7" points="32 27 38 27 38 36 32 36" />
            <polygon fill="#FFC324" points="32 9 38 9 38 27 32 27" />
            <polygon fill="#4A5768" points="6 6 8 6 8 42 6 42" />
            <polygon fill="#4A5768" points="6 40 42 40 42 42 6 42" />
        </g>
    </svg>
)

StackedColumnIcon.propTypes = {
    style: PropTypes.object,
}

export default StackedColumnIcon
