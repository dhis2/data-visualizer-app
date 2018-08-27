import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const BubbleIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
                <g>
                    <rect x="0" y="0" width="48" height="48" />
                    <circle fill="#64A3FE" cx="18" cy="25" r="12" />
                    <circle fill="#1C74D1" cx="28" cy="17" r="6" />
                    <circle fill="#01499F" cx="36" cy="28" r="9" />
                    <rect fill="#9E9E9E" x="0" y="0" width="2" height="48" />
                    <rect fill="#9E9E9E" x="0" y="46" width="48" height="2" />
                </g>
            </g>
        </g>
    </SvgIcon>
);

export default BubbleIcon;
