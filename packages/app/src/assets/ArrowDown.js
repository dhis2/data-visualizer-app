import React from 'react'
import PropTypes from 'prop-types'

const ArrowDown = ({ style = { width: 16, height: 16 } }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        version="1.1"
        style={style}
    >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path
                d="M7.29289,11.7071 C7.68342,12.0976 8.31658,12.0976 8.70711,11.7071 L13.7071,6.70711 C14.0976,6.31658 14.0976,5.68342 13.7071,5.29289 C13.3166,4.90237 12.6834,4.90237 12.2929,5.29289 L8,9.58579 L3.70711,5.29289 C3.31658,4.90237 2.68342,4.90237 2.29289,5.29289 C1.90237,5.68342 1.90237,6.31658 2.29289,6.70711 L7.29289,11.7071 Z"
                fill="#4A5768"
            ></path>
        </g>
    </svg>
)

ArrowDown.propTypes = {
    style: PropTypes.object,
}

export default ArrowDown
