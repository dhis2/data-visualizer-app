import PropTypes from 'prop-types'
import React from 'react'

const YearOverYearColumnIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd">
            <polygon points="0 0 48 0 48 48 0 48" />
            <polygon fill="#FFC324" points="15 20 18 20 18 36 15 36" />
            <polygon fill="#147CD7" points="12 14 15 14 15 36 12 36" />
            <polygon fill="#147CD7" points="22 22 25 22 25 36 22 36" />
            <polygon fill="#FFC324" points="25 12 28 12 28 36 25 36" />
            <polygon fill="#147CD7" points="32 14 35 14 35 36 32 36" />
            <polygon fill="#FFC324" points="35 27 38 27 38 36 35 36" />
            <polygon fill="#4A5768" points="6 6 8 6 8 42 6 42" />
            <polygon fill="#4A5768" points="6 40 42 40 42 42 6 42" />
        </g>
    </svg>
)

YearOverYearColumnIcon.propTypes = {
    style: PropTypes.object,
}

export default YearOverYearColumnIcon
