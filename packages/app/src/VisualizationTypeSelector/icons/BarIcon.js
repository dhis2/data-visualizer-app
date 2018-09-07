import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const BarIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect fill="#63A4FF" x="2" y="4" width="17" height="10" />
            <rect fill="#1976D2" x="2" y="18" width="34" height="10" />
            <rect fill="#004BA0" x="2" y="32" width="40" height="10" />
            <rect fill="#9E9E9E" x="0" y="0" width="2" height="48" />
            <rect fill="#9E9E9E" x="0" y="46" width="48" height="2" />
        </g>
    </SvgIcon>
);

export default BarIcon;
