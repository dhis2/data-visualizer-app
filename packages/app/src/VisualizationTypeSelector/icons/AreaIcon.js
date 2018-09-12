import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const AreaIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
                <mask id="mask-2" fill="white">
                    <rect x="0" y="0" width="48" height="48" />
                </mask>
                <g />
                <polygon
                    stroke="#1976D2"
                    strokeWidth="2"
                    fill="#63A4FF"
                    mask="url(#mask-2)"
                    points="4 28 16 16 26.7935166 26.7935166 33.0558406 20.5311926 53 36 53 51 0 51 0 28"
                />
                <rect fill="#9E9E9E" x="0" y="0" width="2" height="48" />
                <rect fill="#9E9E9E" x="0" y="46" width="48" height="2" />
            </g>
        </g>
    </SvgIcon>
);

export default AreaIcon;
