import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'

const StackedColumnIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect fill="#63A4FF" x="6" y="14" width="10" height="32" />
            <rect
                fill="#9EC6FF"
                transform="translate(11.000000, 16.500000) scale(1, -1) translate(-11.000000, -16.500000) "
                x="6"
                y="7"
                width="10"
                height="19"
            />
            <rect fill="#1976D2" x="20" y="20" width="10" height="26" />
            <rect
                fill="#63A4FF"
                transform="translate(25.000000, 15.500000) scale(1, -1) translate(-25.000000, -15.500000) "
                x="20"
                y="11"
                width="10"
                height="9"
            />
            <rect fill="#004BA0" x="36" y="33" width="10" height="13" />
            <rect
                fill="#1976D2"
                transform="translate(41.000000, 23.500000) scale(1, -1) translate(-41.000000, -23.500000) "
                x="36"
                y="14"
                width="10"
                height="19"
            />
            <rect fill="#9E9E9E" x="0" y="0" width="2" height="48" />
            <rect fill="#9E9E9E" x="0" y="46" width="48" height="2" />
        </g>
    </SvgIcon>
)

StackedColumnIcon.propTypes = {
    style: PropTypes.object,
}

export default StackedColumnIcon
