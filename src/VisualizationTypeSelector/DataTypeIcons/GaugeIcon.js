import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const GaugeIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(0.000000, -12.000000)">
                <g>
                    <mask id="mask-2" fill="white">
                        <rect x="0" y="0" width="48" height="48" />
                    </mask>
                    <path
                        d="M46.9786516,35 C46.4550953,22.7613838 36.3674943,13 24,13 C11.6325057,13 1.54490474,22.7613838 1.02134837,35 L46.9786516,35 Z"
                        stroke="#9E9E9E"
                        strokeWidth="2"
                        mask="url(#mask-2)"
                    />
                    <path
                        d="M42.7639198,33 C42.0405355,28.4482973 39.6833532,24.331649 36.0886748,21.3123226 C32.7604879,18.5613019 28.4908958,17 24,17 C14.5273927,17 6.6738508,23.9320431 5.23550347,33 L42.7639198,33 Z"
                        stroke="#63A4FF"
                        strokeWidth="6"
                        mask="url(#mask-2)"
                    />
                </g>
            </g>
        </g>
    </SvgIcon>
);

export default GaugeIcon;
