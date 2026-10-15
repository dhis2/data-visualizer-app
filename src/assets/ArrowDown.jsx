import PropTypes from 'prop-types'
import React from 'react'

const ArrowDown = ({ style = { width: 16, height: 16 } }) => (
    <svg
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.146 6.146a.5.5 0 01.638-.057l.07.057L8 9.293l3.146-3.147a.5.5 0 01.638-.057l.07.057a.5.5 0 01.057.638l-.057.07-3.5 3.5a.5.5 0 01-.638.057l-.07-.057-3.5-3.5a.5.5 0 010-.708z"
            fill="currentColor"
        ></path>
    </svg>
)

ArrowDown.propTypes = {
    style: PropTypes.object,
}

export default ArrowDown
