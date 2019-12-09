import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'

const GaugeIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(0.000000, -12.000000)">
                <path
                    d="M2,36 C2,23.8497355 11.8497355,14 24,14 C36.1502645,14 46,23.8497355 46,36 L48,36 C48,22.745166 37.254834,12 24,12 C10.745166,12 0,22.745166 0,36 L2,36 Z"
                    fill="#9E9E9E"
                    fillRule="nonzero"
                />
                <path
                    d="M39.5630877,20.4405157 C39.0656993,19.9377314 38.5441136,19.4570095 38,19 C34.2678935,15.9151064 29.3575953,14 24,14 C11.8497355,14 2,23.8497355 2,36 L8,36 C8,27.163444 15.163444,20 24,20 C27.7876065,20 31.3827316,21.3146632 34.1773496,23.6246453 C34.5775703,23.9608232 34.9595684,24.3130995 35.3225781,24.6801975 L39.5630877,20.4405157 Z"
                    fill="#63A4FF"
                    fillRule="nonzero"
                />
            </g>
        </g>
    </SvgIcon>
)

GaugeIcon.propTypes = {
    style: PropTypes.object,
}

export default GaugeIcon
