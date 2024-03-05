import PropTypes from 'prop-types'
import React from 'react'

const OutlierTableIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,48,48" style={style}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 10h36v12h-2V12H8v24h16v2H6V10Z"
            fill="#4A5768"
        />
        <path d="M40 18H8v2h32v-2Z" fill="#4A5768" />
        <path d="M21 11h-2v26h2V11Z" fill="#4A5768" />
        <path d="M24 24H8v2h16v-2ZM24 30H8v2h16v-2Z" fill="#4A5768" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m42.793 40.207-4.5-4.5 1.414-1.414 4.5 4.5-1.414 1.414Z"
            fill="#1471D1"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34 36a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
            fill="#1471D1"
        />
        <path fill="#1471D1" d="M33 32h2v2h-2zM33 26h2v5h-2z" />
    </svg>
)

OutlierTableIcon.propTypes = {
    style: PropTypes.object,
}

export default OutlierTableIcon
