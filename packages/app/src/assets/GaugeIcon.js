import React from 'react'
import PropTypes from 'prop-types'

const GaugeIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd" transform="rotate(90 24 24)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <path
                stroke="#4A5768"
                strokeWidth="2"
                d="M32,8 C23.163444,8 16,15.163444 16,24 C16,32.836556 23.163444,40 32,40 L32,40"
            />
            <path
                stroke="#147CD7"
                strokeWidth="6"
                d="M24.1695806,17.7796867 C22.8114502,19.4870869 22,21.6487813 22,24 C22,29.5228475 26.4771525,34 32,34"
            />
        </g>
    </svg>
)

GaugeIcon.propTypes = {
    style: PropTypes.object,
}

export default GaugeIcon
