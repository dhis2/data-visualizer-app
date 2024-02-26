import {
    getFixedDimensions,
    getRelativePeriodsOptionsById,
    DIMENSION_ID_DATA,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_PERIOD,
    WEEKLY,
    DAILY,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'

export const outlierTableHeadersMap = {
    [DIMENSION_ID_DATA]: 'dxname',
    [DIMENSION_ID_ORGUNIT]: 'ouname',
    [DIMENSION_ID_PERIOD]: 'pename',
}

export const getOutlierTableDimensionIdHeaderMap = ({ showHierarchy }) => ({
    [DIMENSION_ID_DATA]: 'dxname',
    [DIMENSION_ID_ORGUNIT]: showHierarchy ? 'ounamehierarchy' : 'ouname',
    [DIMENSION_ID_PERIOD]: 'pename',
})

export const getOutlierTableHeadersDetails = () => {
    const fixedDimensions = getFixedDimensions()

    return {
        dxname: {
            label: fixedDimensions[DIMENSION_ID_DATA]?.name,
        },
        ouname: {
            label: fixedDimensions[DIMENSION_ID_ORGUNIT]?.name,
        },
        ounamehierarchy: {
            label: fixedDimensions[DIMENSION_ID_ORGUNIT]?.name,
        },
        pename: {
            label: fixedDimensions[DIMENSION_ID_PERIOD]?.name,
        },
        cocname: {
            label: i18n.t('Category option combination'),
        },
        value: {
            label: i18n.t('Value'),
        },
        absdev: {
            label: i18n.t('Absolute deviation'),
            tooltip: i18n.t(
                'A measure of the absolute difference between each data point and a central value, usually the mean or median, providing a straightforward understanding of dispersion in the dataset.'
            ),
        },
        modifiedzscore: {
            label: i18n.t('Modified Z-score'),
            tooltip: i18n.t(
                'A measure of how far a data point deviates from the median, using the median absolute deviation instead of the standard deviation, making it robust against outliers.'
            ),
        },
        median: {
            label: i18n.t('Median'),
            tooltip: i18n.t(
                "The middle value in a dataset when the values are arranged in ascending or descending order. It's a robust measure of central tendency that is less affected by outliers compared to the mean."
            ),
        },
        medianabsdeviation: {
            label: i18n.t('Median absolute deviation'),
            tooltip: i18n.t(
                "A robust measure of variability, found by calculating the median of the absolute differences between each data point and the overall median. It's less influenced by outliers compared to other measures like the standard deviation."
            ),
        },
        zscore: {
            label: i18n.t('Z-score'),
            tooltip: i18n.t(
                'A measure of how many standard deviations a data point is from the mean of a dataset, providing insight into how unusual or typical that data point is relative to the rest of the distribution.'
            ),
        },
        mean: {
            label: i18n.t('Mean'),
            tooltip: i18n.t('Average of the value over time.'),
        },
        stddev: {
            label: i18n.t('Standard deviation'),
            tooltip: i18n.t(
                'A measure of how dispersed the data is in relation to the mean. Low standard deviation indicates data are clustered tightly around the mean, and high standard deviation indicates data are more spread out.'
            ),
        },
        lowerbound: {
            label: i18n.t('Min'),
            tooltip: i18n.t('Minimum score threshold'),
        },
        upperbound: {
            label: i18n.t('Max'),
            tooltip: i18n.t('Maximum score threshold'),
        },
    }
}

export const computeYoYMatrix = (responses, relativePeriodTypeUsed) => {
    const periodGroups = responses.reduce((list, res) => {
        list.push(res.metaData.dimensions.pe)

        return list
    }, [])

    if (relativePeriodTypeUsed === DAILY) {
        periodGroups.sort((a, b) => a[0].substr(-2) - b[0].substr(-2))

        const periodKeyAxisIndexMatrix = periodGroups
            .shift()
            .map((periodId) => [periodId])

        periodGroups.forEach((periodGroup) => {
            periodGroup.forEach((periodId) => {
                const matchGroups = periodId.match(/(\d{4})(\d{2})(\d{2})/)

                const month = matchGroups[2]
                const day = matchGroups[3]

                // find same month/day in 1st "serie"
                const xAxisIndexForPeriod = periodKeyAxisIndexMatrix.findIndex(
                    (periodKeys) => periodKeys[0].substr(4) === `${month}${day}`
                )

                if (xAxisIndexForPeriod !== -1) {
                    periodKeyAxisIndexMatrix[xAxisIndexForPeriod].push(periodId)
                } else if (month === '02' && day === '29') {
                    // February 29 special case
                    // find index for february 28
                    const indexForFeb28 = periodKeyAxisIndexMatrix.findIndex(
                        (periodKeys) =>
                            periodKeys.findIndex((periodKey) =>
                                /0228$/.test(periodKey)
                            ) !== -1
                    )

                    if (indexForFeb28 !== -1) {
                        periodKeyAxisIndexMatrix.splice(indexForFeb28 + 1, 0, [
                            periodId,
                        ])
                    } else {
                        periodKeyAxisIndexMatrix.push([periodId])
                    }
                } else {
                    periodKeyAxisIndexMatrix.push([periodId])
                }
            })
        })

        return periodKeyAxisIndexMatrix
    } else if (relativePeriodTypeUsed === WEEKLY) {
        periodGroups.sort((a, b) => b[0].split('W')[1] - a[0].split('W')[1])

        const periodKeyAxisIndexMatrix = periodGroups
            .shift()
            .map((periodId) => [periodId])

        periodGroups.forEach((periodGroup) => {
            periodGroup.forEach((periodId) => {
                const [year, week] = periodId.split('W')

                // find week number in 1st "serie"
                const xAxisIndexForPeriod = periodKeyAxisIndexMatrix.findIndex(
                    (periodKeys) => periodKeys[0].split('W')[1] === week
                )

                if (xAxisIndexForPeriod !== -1) {
                    periodKeyAxisIndexMatrix[xAxisIndexForPeriod].push(periodId)
                } else if (week === '1') {
                    const indexForW2 = periodKeyAxisIndexMatrix.findIndex(
                        (periodKeys) =>
                            periodKeys.findIndex((periodKey) =>
                                /W2$/.test(periodKey)
                            ) !== -1
                    )

                    if (indexForW2 !== -1) {
                        periodKeyAxisIndexMatrix[indexForW2].push(periodId)
                    } else {
                        periodKeyAxisIndexMatrix.push([periodId])
                    }
                } else {
                    // find the right spot considering also the year
                    const indexForPrevWeekInYear =
                        periodKeyAxisIndexMatrix.findIndex(
                            (periodKeys) =>
                                periodKeys.findIndex(
                                    (periodKey) =>
                                        periodKey === `${year}W${week - 1}`
                                ) !== -1
                        )

                    periodKeyAxisIndexMatrix.splice(
                        indexForPrevWeekInYear + 1,
                        0,
                        [periodId]
                    )
                }
            })
        })

        return periodKeyAxisIndexMatrix
    } else {
        const periodKeyAxisIndexMatrix = periodGroups.reduce(
            (list, periodGroup) => {
                periodGroup.forEach((periodId, index) => {
                    list[index].push(periodId)
                })

                return list
            },
            Array.from({ length: periodGroups[0].length }, () => [])
        )

        return periodKeyAxisIndexMatrix
    }
}

export const computeGenericPeriodNamesFromMatrix = (
    periodKeyAxisIndexMatrix,
    relativePeriodTypeUsed
) => {
    switch (relativePeriodTypeUsed) {
        case WEEKLY:
            return (
                periodKeyAxisIndexMatrix
                    // remove year, return "Wnn"
                    .map((periodKeys) => periodKeys[0].substr(4))
                    .flat()
            )
        case DAILY:
            return periodKeyAxisIndexMatrix
                .map((periodKeys) =>
                    // remove year, return "dd-mm"
                    periodKeys[0].substr(4).replace(/(\d{2})(\d{2})/, '$2-$1')
                )
                .flat()
    }
}

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

export const getRelativePeriodTypeUsed = (periodItems) => {
    if (
        getRelativePeriodsOptionsById(WEEKLY)
            .getPeriods()
            .find((period) => period.id === periodItems[0].id)
    ) {
        return WEEKLY
    } else if (
        getRelativePeriodsOptionsById(DAILY)
            .getPeriods()
            .find((period) => period.id === periodItems[0].id)
    ) {
        return DAILY
    }
}
