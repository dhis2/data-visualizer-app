import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const PieIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <SvgIcon viewBox="0,0,48,48" style={style}>
        <defs>
            <mask id="mask-2" fill="white">
                <rect x="0" y="0" width="48" height="48" />
            </mask>
            <mask id="mask-4" fill="white">
                <circle cx="24" cy="24" r="24" />
            </mask>
            <mask
                id="mask-6"
                maskContentUnits="userSpaceOnUse"
                maskUnits="objectBoundingBox"
                x="0"
                y="0"
                width="48"
                height="48"
                fill="white"
            >
                <path d="M24,48 C37.254834,48 48,37.254834 48,24 C48,10.745166 37.254834,0 24,0 C10.745166,0 0,10.745166 0,24 C0,37.254834 10.745166,48 24,48 Z" />
            </mask>
            <mask
                id="mask-8"
                maskContentUnits="userSpaceOnUse"
                maskUnits="objectBoundingBox"
                x="0"
                y="0"
                width="48"
                height="48"
                fill="white"
            >
                <path d="M24,48 C37.254834,48 48,37.254834 48,24 C48,10.745166 37.254834,0 24,0 C10.745166,0 0,10.745166 0,24 C0,37.254834 10.745166,48 24,48 Z" />
            </mask>
            <mask
                id="mask-10"
                maskContentUnits="userSpaceOnUse"
                maskUnits="objectBoundingBox"
                x="0"
                y="0"
                width="48"
                height="48"
                fill="white"
            >
                path d="M24,48 C37.254834,48 48,37.254834 48,24 C48,10.745166
                37.254834,0 24,0 C10.745166,0 0,10.745166 0,24 C0,37.254834
                10.745166,48 24,48 Z" />
            </mask>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
                <mask id="mask-2" fill="white">
                    <rect x="0" y="0" width="48" height="48" />
                </mask>
                <g mask="url(#mask-2)">
                    <g transform="translate(24.000000, 24.000000) rotate(-135.000000) translate(-24.000000, -24.000000) ">
                        <mask id="mask-4" fill="white">
                            <circle cx="24" cy="24" r="24" />
                        </mask>
                        <g
                            stroke="none"
                            fill="none"
                            strokeDasharray="30.17142857142857,240"
                            mask="url(#mask-4)"
                            strokeWidth="48"
                        >
                            <path
                                mask="url(#mask-6)"
                                stroke="#63A4FF"
                                d="M24,48 C37.254834,48 48,37.254834 48,24 C48,10.745166 37.254834,0 24,0 C10.745166,0 0,10.745166 0,24 C0,37.254834 10.745166,48 24,48 Z"
                            />
                        </g>
                        <g
                            stroke="none"
                            fill="none"
                            strokeDasharray="82.97142857142858,240"
                            mask="url(#mask-4)"
                            transform="translate(24.000000, 24.000000) rotate(-72.000000) translate(-24.000000, -24.000000) "
                            strokeWidth="48"
                        >
                            <path
                                mask="url(mask-8)"
                                stroke="#1976D2"
                                d="M24,48 C37.254834,48 48,37.254834 48,24 C48,10.745166 37.254834,0 24,0 C10.745166,0 0,10.745166 0,24 C0,37.254834 10.745166,48 24,48 Z"
                            />
                        </g>
                        <g
                            stroke="none"
                            fill="none"
                            strokeDasharray="37.71428571428572,240"
                            mask="url(#mask-4)"
                            transform="translate(24.000000, 24.000000) rotate(-270.000000) translate(-24.000000, -24.000000) "
                            strokeWidth="48"
                        >
                            <path
                                mask="url(mask-10)"
                                stroke="#004BA0"
                                d="M24,48 C37.254834,48 48,37.254834 48,24 C48,10.745166 37.254834,0 24,0 C10.745166,0 0,10.745166 0,24 C0,37.254834 10.745166,48 24,48 Z"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </SvgIcon>
);

export default PieIcon;
