import React from 'react';

const styles = {
    icon: {
        paddingRight: '6px',
        alignSelf: 'center',
    },
};

const DataIcon = ({ style }) => {
    return (
        <svg
            style={{
                ...styles.icon,
                ...style,
            }}
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
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
                <g id="Icon/12x12/Data">
                    <g id="icon_data_small">
                        <rect id="bounds" x="0" y="0" width="12" height="12" />
                        <rect
                            id="Rectangle-18"
                            stroke="#494949"
                            x="0.5"
                            y="0.5"
                            width="4"
                            height="4"
                        />
                        <rect
                            id="Rectangle-18"
                            stroke="#494949"
                            x="7.5"
                            y="0.5"
                            width="4"
                            height="4"
                        />
                        <rect
                            id="Rectangle-18"
                            stroke="#494949"
                            x="7.5"
                            y="7.5"
                            width="4"
                            height="4"
                        />
                        <rect
                            id="Rectangle-18"
                            stroke="#494949"
                            x="0.5"
                            y="7.5"
                            width="4"
                            height="4"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default DataIcon;
