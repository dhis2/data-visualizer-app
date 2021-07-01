import PropTypes from 'prop-types'
import React from 'react'

const FontColorIcon = ({ color }) => (
    <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="12" cy="12" fillRule="evenodd" fill={color} r="7" />
    </svg>
)

FontColorIcon.defaultProps = {
    color: '#000000',
}

FontColorIcon.propTypes = {
    color: PropTypes.string,
}

export default FontColorIcon
