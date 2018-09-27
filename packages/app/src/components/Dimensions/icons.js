import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '@dhis2/d2-i18n';
import * as fromReducers from '../../reducers';

const style = {
    hintTextContainer: {
        position: 'absolute',
        height: 50,
        width: 150,
        backgroundColor: '#696969',
        borderRadius: 2,
        zIndex: 100,
    },
    renderPos: {},
    hintText: {
        color: 'white',
        fontSize: 12,
        position: 'relative',
        top: 5,
        left: 5,
    },
    recommendedIcon: {
        position: 'static',
        backgroundColor: '#48A999',
        height: 7,
        width: 7,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 4,
    },
    iconWrapper: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    icon: {
        position: 'relative',
        top: '14%',
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

    checkIfRecommended = () => {
        const { isRecommended, isSelected, id } = this.props;

        return isRecommended.includes(id) && !isSelected;
    };

    showHintText = () => {
        const renderPos = this.getRenderPos();

        return (
            <div style={{ ...style.hintTextContainer, ...renderPos }}>
                <span style={style.hintText}>
                    {i18n.t('Dimension recommended with selected data')}
                </span>
            </div>
        );
    };

    getRenderPos = () => {
        const initialPos = this.refs.recommendedWrapper.getBoundingClientRect();

        const isOverflowing =
            initialPos.top + window.scrollY + TOP_PIXEL_PADDING_POS >
            MAX_TOP_PIXEL_POS;

        const topPixelPos = isOverflowing
            ? MAX_TOP_PIXEL_POS
            : initialPos.top + TOP_PIXEL_PADDING_POS + window.scrollY;

        const leftPixelPos = isOverflowing
            ? LAST_ELEMENT_LEFT_PIXEL_POS
            : initialPos.left - LEFT_PIXEL_PADDING_POS;

        return {
            top: topPixelPos,
            left: leftPixelPos,
        };
    };

    render = () => {
        const HintText = this.state.mouseOver ? this.showHintText() : null;

        return this.checkIfRecommended() ? (
            <div
                style={style.recommendedIcon}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseExit}
                ref={'recommendedWrapper'}
            >
                {HintText}
            </div>
        ) : null;
    };
}

const mapStateToProps = state => ({
    isRecommended: fromReducers.fromRecommendedIds.sGetRecommendedIds(state),
});

export default connect(mapStateToProps)(RecommendedIcon);

export const DataIcon = () => {
    return (
        <div style={style.iconWrapper}>
            <svg
                style={style.icon}
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
                            <rect
                                id="bounds"
                                x="0"
                                y="0"
                                width="12"
                                height="12"
                            />
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
        </div>
    );
};

export const PeriodIcon = () => {
    return (
        <div style={style.iconWrapper}>
            <svg
                style={style.icon}
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
                            <rect
                                id="bounds"
                                x="0"
                                y="0"
                                width="12"
                                height="12"
                            />
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
        </div>
    );
};

export const OrgUnitIcon = () => {
    return (
        <div style={style.iconWrapper}>
            <svg
                style={style.icon}
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
                            <rect
                                id="bounds"
                                x="0"
                                y="0"
                                width="12"
                                height="12"
                            />
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
        </div>
    );
};

export const GenericDimension = () => {
    return (
        <div style={style.iconWrapper}>
            <div
                style={{
                    height: 4,
                    width: 4,
                    border: '1px solid #494949',
                    borderRadius: 1,
                    position: 'relative',
                    top: '37%',
                }}
            />
        </div>
    );
};
export const MoreHorizontal = () => {
    return (
        <svg
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
