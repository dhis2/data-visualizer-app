import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'

const PieIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <defs>
            <mask id="mask-4" fill="white">
                <circle cx="24" cy="24" r="24" />
            </mask>
        </defs>
        <g stroke="none" strokeWidth="0" fill="none" fillRule="evenodd">
            <g transform="translate(24.000000, 24.000000) rotate(-135.000000) translate(-24.000000, -24.000000) ">
                <g
                    stroke="none"
                    fill="none"
                    strokeDasharray="30.17142857142857,240"
                    mask="url(#mask-4)"
                    strokeWidth="48"
                >
                    <path
                        stroke="#63A4FF"
                        d="M24 48C37.254834 48 48 37.254834 48 24 48 10.745166 37.254834 0 24 0 10.745166 0 0 10.745166 0 24 0 37.254834 10.745166 48 24 48Z"
                    />
                </g>
                <g
                    stroke="none"
                    fill="none"
                    strokeDasharray="82.97142857142858,240"
                    mask="url(#mask-4)"
                    transform="translate(24.000000, 24.000000) rotate(-72.000000) translate(-24.000000, -24.000000) "
                    strokeWidth="48"
                >
                    <path
                        stroke="#1976D2"
                        d="M24 48C37.254834 48 48 37.254834 48 24 48 10.745166 37.254834 0 24 0 10.745166 0 0 10.745166 0 24 0 37.254834 10.745166 48 24 48Z"
                    />
                </g>
                <g
                    stroke="none"
                    fill="none"
                    strokeDasharray="37.71428571428572,240"
                    mask="url(#mask-4)"
                    transform="translate(24.000000, 24.000000) rotate(-270.000000) translate(-24.000000, -24.000000) "
                    strokeWidth="48"
                >
                    <path
                        stroke="#004BA0"
                        d="M24 48C37.254834 48 48 37.254834 48 24 48 10.745166 37.254834 0 24 0 10.745166 0 0 10.745166 0 24 0 37.254834 10.745166 48 24 48Z"
                    />
                </g>
            </g>
        </g>
    </SvgIcon>
)

PieIcon.propTypes = {
    style: PropTypes.object,
}

export default PieIcon
