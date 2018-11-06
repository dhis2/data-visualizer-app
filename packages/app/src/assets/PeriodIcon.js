import React from 'react';

const styles = {
    icon: {
        paddingRight: '6px',
        alignSelf: 'center',
    },
};

const PeriodIcon = ({ style }) => {
    return (
        <svg
            style={{
                ...styles.icon,
                ...style,
            }}
            width="11px"
            height="11px"
            viewBox="0 0 11 11"
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
                <g id="Icon/12x12/Date">
                    <g id="icon_date_small">
                        <rect id="bounds" x="0" y="0" width="12" height="12" />
                        <rect
                            id="Rectangle-9"
                            fill="#494949"
                            x="5"
                            y="2"
                            width="1"
                            height="4"
                        />
                        <rect
                            id="Rectangle-17"
                            fill="#494949"
                            x="5"
                            y="5"
                            width="3"
                            height="1"
                        />
                        <circle
                            id="Oval-3"
                            stroke="#494949"
                            cx="5.5"
                            cy="5.5"
                            r="5"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default PeriodIcon;
