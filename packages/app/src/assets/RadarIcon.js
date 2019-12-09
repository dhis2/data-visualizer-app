import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'

const RadarIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <circle stroke="#9E9E9E" strokeWidth="2" cx="24" cy="24" r="23" />
            <circle stroke="#9E9E9E" strokeWidth="2" cx="24" cy="24" r="15" />
            <circle stroke="#9E9E9E" strokeWidth="2" cx="24" cy="24" r="5" />
            <circle fill="#1976D2" cx="24" cy="9" r="2" />
            <circle fill="#1976D2" cx="11" cy="31" r="2" />
            <circle fill="#63A4FF" cx="24" cy="39" r="2" />
            <circle fill="#004BA0" cx="39" cy="24" r="2" />
            <circle fill="#004BA0" cx="40" cy="40" r="2" />
        </g>
    </SvgIcon>
)

RadarIcon.propTypes = {
    style: PropTypes.object,
}

export default RadarIcon
