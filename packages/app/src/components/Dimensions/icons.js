import React, { Component } from 'react';
import i18n from '@dhis2/d2-i18n';

const style = {
    hintTextContainer: {
        position: 'absolute',
        height: 50,
        width: 150,
        backgroundColor: '#696969',
        borderRadius: 2,
    },
    renderPos: {},
    hintText: {
        color: 'white',
        fontSize: 12,
        position: 'relative',
        top: 8,
    },
    recommendedIcon: {
        position: 'static',
        backgroundColor: '#48A999',
        height: 7,
        width: 7,
        borderRadius: 5,
        marginTop: 8,
        marginLeft: 4,
    },
    dataIcon: {
        marginRight: 2,
        marginLeft: 7,
        marginTop: 5,
    },
    periodIcon: {
        position: 'relative',
        left: 6,
        marginRight: 10,
        marginTop: 5,
    },
    orgUnitIcon: {
        position: 'relative',
        left: 6,
        marginRight: 9,
        marginTop: 5,
    },
    genericDimIcon: {
        position: 'relative',
        bottom: 3,
        left: 9,
        marginRight: 14,
        marginTop: 11,
    },
    moreHorizIcon: {
        position: 'relative',
        left: 1,
        bottom: 2,
        display: 'inline-block',
    },
};

const TOP_PIXEL_PADDING_POS = 15;
const LEFT_PIXEL_PADDING_POS = 40;
const MAX_TOP_PIXEL_POS = 765;
const LAST_ELEMENT_LEFT_PIXEL_POS = 160;

export class RecommendedIcon extends Component {
    state = { mouseOver: false };

    onMouseOver = () => {
        this.setState({ mouseOver: true });
    };

    onMouseExit = () => {
        this.setState({ mouseOver: false });
    };

    showHintText = () => {
        const renderPos = this.calculateRenderPos();

        return (
            <div style={{ ...style.hintTextContainer, ...renderPos }}>
                <span style={style.hintText}>
                    {i18n.t('Dimension recommended with selected data')}
                </span>
            </div>
        );
    };

    calculateRenderPos = () => {
        const initialPos = this.refs.wrapper.getBoundingClientRect();
        const isOverflowing =
            initialPos.top + TOP_PIXEL_PADDING_POS > MAX_TOP_PIXEL_POS;

        const topPixelPos = isOverflowing
            ? MAX_TOP_PIXEL_POS
            : initialPos.top + TOP_PIXEL_PADDING_POS;

        const leftPixelPos = isOverflowing
            ? LAST_ELEMENT_LEFT_PIXEL_POS
            : initialPos.left - LEFT_PIXEL_PADDING_POS;

        return {
            top: topPixelPos,
            left: leftPixelPos,
        };
    };

    render = () => {
        return (
            <div
                style={style.recommendedIcon}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseExit}
                ref={'wrapper'}
            >
                {this.state.mouseOver ? this.showHintText() : null}
            </div>
        );
    };
}

export const DataIcon = () => {
    return (
        <svg
            style={style.dataIcon}
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>0CE35F95-11B0-4594-B76D-918904D3C4D1</title>
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

export const PeriodIcon = () => {
    return (
        <svg
            style={style.periodIcon}
            width="11px"
            height="11px"
            viewBox="0 0 11 11"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>619E56CE-6EA1-46F2-83A4-994ED2ADE298</title>
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

export const OrgUnitIcon = () => {
    return (
        <svg
            style={style.orgUnitIcon}
            width="11px"
            height="12px"
            viewBox="0 0 11 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>262CCA05-7B4F-45C2-981D-57F1EC91B010</title>
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

export const GenericDimension = () => {
    return (
        <svg
            style={style.genericDimIcon}
            width="6px"
            height="6px"
            viewBox="0 0 6 6"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>7D727F79-805A-499A-A2AA-A705C39FA166</title>
            <desc>Created with sketchtool.</desc>
            <defs />
            <g
                id="Symbols"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Icon/12x12/Data-dimension"
                    transform="translate(-3.000000, -3.000000)"
                    stroke="#494949"
                >
                    <g id="icon_dimension_small">
                        <rect
                            id="Rectangle-24"
                            x="3.5"
                            y="3.5"
                            width="5"
                            height="5"
                            rx="1"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};
export const MoreHorizontal = () => {
    return (
        <svg
            style={style.moreHorizIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="24"
            viewBox="0 0 24 24"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
    );
};

export default RecommendedIcon;
