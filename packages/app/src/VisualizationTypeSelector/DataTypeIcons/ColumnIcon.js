import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const ColumnIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
                <g>
                    <rect x="0" y="0" width="48" height="48" />
                    <rect fill="#63A4FF" x="6" y="14" width="10" height="32" />
                    <rect fill="#1976D2" x="20" y="24" width="10" height="22" />
                    <rect fill="#004BA0" x="36" y="4" width="10" height="42" />
                    <rect fill="#9E9E9E" x="0" y="0" width="2" height="48" />
                    <rect fill="#9E9E9E" x="0" y="46" width="48" height="2" />
                </g>
            </g>
        </g>
    </SvgIcon>
);

export default ColumnIcon;
