import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const RadarIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
                <mask id="mask-2" fill="white">
                    <rect x="0" y="0" width="48" height="48" />
                </mask>
                <circle
                    stroke="#9E9E9E"
                    strokeWidth="2"
                    mask="url(#mask-2)"
                    cx="24"
                    cy="24"
                    r="23"
                />
                <circle
                    stroke="#9E9E9E"
                    strokeWidth="2"
                    mask="url(#mask-2)"
                    cx="24"
                    cy="24"
                    r="15"
                />
                <circle
                    stroke="#9E9E9E"
                    strokeWidth="2"
                    mask="url(#mask-2)"
                    cx="24"
                    cy="24"
                    r="5"
                />
                <circle
                    fill="#1976D2"
                    mask="url(#mask-2)"
                    cx="24"
                    cy="9"
                    r="2"
                />
                <circle
                    fill="#1976D2"
                    mask="url(#mask-2)"
                    cx="11"
                    cy="31"
                    r="2"
                />
                <circle
                    fill="#63A4FF"
                    mask="url(#mask-2)"
                    cx="24"
                    cy="39"
                    r="2"
                />
                <circle
                    fill="#004BA0"
                    mask="url(#mask-2)"
                    cx="39"
                    cy="24"
                    r="2"
                />
                <circle
                    fill="#004BA0"
                    mask="url(#mask-2)"
                    cx="40"
                    cy="40"
                    r="2"
                />
            </g>
        </g>
    </SvgIcon>
);

export default RadarIcon;
