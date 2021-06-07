import PropTypes from 'prop-types'
import React from 'react'

const ScatterIcon = ({
    style = { paddingRight: '8px', width: 24, height: 24 },
}) => (
    <svg
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
    >
        <g fill="none" fillRule="evenodd">
            <path d="m0 0h48v48h-48z" />
            <path d="m6 42v-36h2v34h34v2z" fill="#4a5768" />
            <path
                d="m14 27c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7-2c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7-7c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm8 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-10c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"
                fill="#147cd7"
            />
            <path
                d="m20 31c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm10-4c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm-9-8c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm11-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"
                fill="#ffc324"
            />
        </g>
    </svg>
)

ScatterIcon.propTypes = {
    style: PropTypes.object,
}

export default ScatterIcon
