import React from 'react'
import PropTypes from 'prop-types'

const GlobeIcon = ({
    style = { width: 24, height: 24, paddingRight: '8px' },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={style}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g>
                <g>
                    <mask id="mask-globe-icon" fill="white">
                        <rect x="0" y="0" width="48" height="48" />
                    </mask>
                    <circle
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-globe-icon)"
                        cx="24"
                        cy="24"
                        r="23"
                    />
                    <polyline
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-globe-icon)"
                        points="1 21 4 24 8 26 9 24 6 19 11 18 18 12 14 9 16 6 15 3"
                    />
                    <polyline
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-globe-icon)"
                        points="47 25 45 21 43 19 40 18 37 18 34 17 32 18 30 23 33 27 37 27 38 30 38 38 38.5 42"
                    />
                    <polyline
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-globe-icon)"
                        points="38 6 37 7 34 6 32 8 34 10 33 12 33 15 37 14 39 15 43 12"
                    />
                    <polyline
                        stroke="#1976D2"
                        strokeWidth="2"
                        mask="url(#mask-globe-icon)"
                        points="18 46 16 41 15 36 13 34 10 31 11 28 14 26 18 27 20 29 23 30 25 32 25 36 23 40 21 47"
                    />
                </g>
            </g>
        </g>
    </svg>
)

GlobeIcon.propTypes = {
    style: PropTypes.object,
}

export default GlobeIcon
