export const computeGenericPeriodNames = responses => {
    let xAxisRes;

    responses.forEach(res => {
        if (xAxisRes) {
            xAxisRes =
                res.metaData.dimensions.pe.length >
                xAxisRes.metaData.dimensions.pe.length
                    ? res
                    : xAxisRes;
        } else {
            xAxisRes = res;
        }
    });

    const metadata = xAxisRes.metaData;
    const genericPeriodNames = [];

    metadata.dimensions.pe.forEach(periodId => {
        const name = metadata.items[periodId].name;

        // until the day the backend will support this in the API:
        // trim off the trailing year in the period name
        // english names should all have the year at the end of the string
        genericPeriodNames.push(name.replace(/\s+\d{4}$/, ''));
    });

    return genericPeriodNames;
};
