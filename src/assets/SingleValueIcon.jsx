import PropTypes from 'prop-types'
import React from 'react'

const SingleValueIcon = ({ style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <g fill="none" fillRule="evenodd">
            <polygon points="0 0 48 0 48 48 0 48" />
            <rect
                width="34"
                height="20"
                x="7"
                y="14"
                stroke="#4A5768"
                strokeWidth="2"
            />
            <text
                fill="#147CD7"
                fontFamily="iAWriterDuoS-Bold, iA Writer Duo S"
                fontSize="15"
                fontWeight="bold"
                letterSpacing=".6"
            >
                <tspan x="10" y="29">
                    123
                </tspan>
            </text>
        </g>
    </svg>
)

SingleValueIcon.propTypes = {
    style: PropTypes.object,
}

export default SingleValueIcon
