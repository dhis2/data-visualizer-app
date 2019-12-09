import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'

const GlobeIcon = ({
    style = { width: 24, height: 24, paddingRight: '8px' },
}) => (
    <SvgIcon viewBox="0 0 48 48" style={style}>
        <title>icon_chart_GIS</title>
        <desc>Created with Sketch.</desc>
        <defs>
            <rect id="path-1" x="0" y="0" width="48" height="48" />
        </defs>
        <g
            id="Symbols"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="Icon/48x48/chart_GIS">
                <g id="icon_chart_GIS">
                    <mask id="mask-2" fill="white">
                        <use xlinkHref="#path-1" />
                    </mask>
                    <g id="Bounds" />
                    <circle
                        id="Oval-4"
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-2)"
                        cx="24"
                        cy="24"
                        r="23"
                    />
                    <polyline
                        id="Path-6"
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-2)"
                        points="1 21 4 24 8 26 9 24 6 19 11 18 18 12 14 9 16 6 15 3"
                    />
                    <polyline
                        id="Path-7"
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-2)"
                        points="47 25 45 21 43 19 40 18 37 18 34 17 32 18 30 23 33 27 37 27 38 30 38 38 38.5 42"
                    />
                    <polyline
                        id="Path-5"
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-2)"
                        points="38 6 37 7 34 6 32 8 34 10 33 12 33 15 37 14 39 15 43 12"
                    />
                    <polyline
                        id="Path-8"
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-2)"
                        points="18 46 16 41 15 36 13 34 10 31 11 28 14 26 18 27 20 29 23 30 25 32 25 36 23 40 21 47"
                    />
                </g>
            </g>
        </g>
    </SvgIcon>
)

GlobeIcon.propTypes = {
    style: PropTypes.object,
}

export default GlobeIcon
