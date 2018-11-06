import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const YearOverYearColumnIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
                <polygon points="0 0 48 0 48 48 0 48"></polygon>
                <polygon fill="#63A4FF" points="6 14 11 14 11 46 6 46"></polygon>
                <polygon fill="#63A4FF" points="20 23 25 23 25 46 20 46"></polygon>
                <polygon fill="#63A4FF" points="34 30 39 30 39 46 34 46"></polygon>
                <polygon fill="#004BA0" points="11 26 16 26 16 46 11 46"></polygon>
                <polygon fill="#004BA0" points="25 16 30 16 30 46 25 46"></polygon>
                <polygon fill="#004BA0" points="39 9 44 9 44 46 39 46"></polygon>
                <polygon fill="#9E9E9E" points="0 0 2 0 2 48 0 48"></polygon>
                <polygon fill="#9E9E9E" points="0 46 48 46 48 48 0 48"></polygon>
            </g>
        </g>
    </SvgIcon>
);

export default YearOverYearColumnIcon;
