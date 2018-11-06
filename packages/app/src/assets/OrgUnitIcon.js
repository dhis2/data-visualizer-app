import React from 'react';

const styles = {
    icon: {
        paddingRight: '6px',
        alignSelf: 'center',
    },
};

const OrgUnitIcon = ({ style }) => {
    return (
        <svg
            style={{
                ...styles.icon,
                ...style,
            }}
            width="11px"
            height="12px"
            viewBox="0 0 11 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <desc>Created with sketchtool.</desc>
            <defs />
            <g
                id="Symbols"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g id="Icon/12x12/OrgUnit">
                    <g id="icon_unit_small">
                        <rect id="bounds" x="0" y="0" width="12" height="12" />
                        <rect
                            id="Rectangle-18"
                            stroke="#494949"
                            x="3.5"
                            y="0.5"
                            width="4"
                            height="3"
                        />
                        <rect
                            id="Rectangle-19"
                            fill="#494949"
                            x="5"
                            y="4"
                            width="1"
                            height="3"
                        />
                        <rect
                            id="Rectangle-20"
                            fill="#494949"
                            x="2"
                            y="6"
                            width="3"
                            height="1"
                        />
                        <rect
                            id="Rectangle-18"
                            stroke="#494949"
                            x="6.5"
                            y="8.5"
                            width="4"
                            height="3"
                        />
                        <rect
                            id="Rectangle-18"
                            stroke="#494949"
                            x="0.5"
                            y="8.5"
                            width="4"
                            height="3"
                        />
                        <rect
                            id="Rectangle-21"
                            fill="#494949"
                            x="2"
                            y="7"
                            width="1"
                            height="1"
                        />
                        <rect
                            id="Rectangle-22"
                            fill="#494949"
                            x="6"
                            y="6"
                            width="3"
                            height="1"
                        />
                        <rect
                            id="Rectangle-23"
                            fill="#494949"
                            x="8"
                            y="7"
                            width="1"
                            height="1"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default OrgUnitIcon;
