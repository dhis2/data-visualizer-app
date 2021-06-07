import PropTypes from 'prop-types'
import React from 'react'

const ArrowDownwardIcon = ({ style = { width: 18, height: 18 } }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={style}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
            fill="black"
        />
    </svg>
)

ArrowDownwardIcon.propTypes = {
    style: PropTypes.object,
}

export default ArrowDownwardIcon
