export const computeGenericPeriodNames = (responses) => {
    const xAxisRes = responses.reduce((out, res) => {
        if (out.metaData) {
            if (
                res.metaData.dimensions.pe.length >
                out.metaData.dimensions.pe.length
            ) {
                out = res
            }
        } else {
            out = res
        }

        return out
    }, {})

    const metadata = xAxisRes.metaData

    return metadata.dimensions.pe.reduce((genericPeriodNames, periodId) => {
        const name = metadata.items[periodId].name

        // until the day the backend will support this in the API:
        // trim off the trailing year in the period name
        // english names should all have the year at the end of the string
        genericPeriodNames.push(name.replace(/\s+\d{4}$/, ''))

        return genericPeriodNames
    }, [])
}
