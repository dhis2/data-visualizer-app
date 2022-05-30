import { parse, stringify } from 'query-string'
import { useState, useEffect } from 'react'
import history from '../../modules/history.js'

const options = { parseBooleans: true }

const useInterpretationQueryParams = () => {
    const [params, setParams] = useState(
        parse(history.location.search, options)
    )
    useEffect(() => {
        const unlisten = history.listen(({ location }) => {
            if (location.state?.isModalOpening) {
                setParams(parse(history.location.search, options))
            }
            if (location.state?.isModalClosing) {
                setParams(parse(history.location.search, options))
            }
        })
        return unlisten
    }, [])

    return params
}

const removeInterpretationQueryParams = () => {
    const parsed = parse(history.location.search, options)
    // Keep all other query params intact
    const parsedWithoutInterpretationId = Object.entries(parsed).reduce(
        (acc, [key, value]) => {
            if (key !== 'interpretationId' && key !== 'initialFocus') {
                acc[key] = value
            }
            return acc
        },
        {}
    )
    const search = stringify(parsedWithoutInterpretationId)

    history.push(
        {
            ...history.location,
            search,
        },
        {
            isModalClosing: true,
        }
    )
}

export { useInterpretationQueryParams, removeInterpretationQueryParams }
