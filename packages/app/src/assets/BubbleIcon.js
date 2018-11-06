import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const BubbleIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <circle fill="#63A4FF" cx="18" cy="25" r="12" />
            <circle fill="#1C74D1" cx="28" cy="17" r="6" />
            <circle fill="#01499F" cx="36" cy="28" r="9" />
            <rect fill="#9E9E9E" x="0" y="0" width="2" height="48" />
            <rect fill="#9E9E9E" x="0" y="46" width="48" height="2" />
        </g>
    </SvgIcon>
);

export default BubbleIcon;
