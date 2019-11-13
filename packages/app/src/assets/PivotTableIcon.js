import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const PivotTableIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon points="0 0 48 0 48 48 0 48" />
            <rect
                stroke="#4A5768"
                strokeWidth="2"
                x="7"
                y="11"
                width="34"
                height="26"
            />
            <rect fill="#4A5768" x="8" y="18" width="32" height="2" />
            <rect fill="#4A5768" x="19" y="11" width="2" height="26" />
            <rect fill="#4A5768" x="8" y="24" width="32" height="2" />
            <rect fill="#4A5768" x="8" y="30" width="32" height="2" />
        </g>
    </SvgIcon>
);

export default PivotTableIcon;
