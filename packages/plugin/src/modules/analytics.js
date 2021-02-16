import { getRelativePeriodsOptionsById, WEEKS, DAYS } from '@dhis2/analytics'

export const computeYoYMatrix = (responses, relativePeriodTypeUsed) => {
    const periodGroups = responses.reduce((list, res) => {
        list.push(res.metaData.dimensions.pe)

        return list
    }, [])

    if (relativePeriodTypeUsed === WEEKS) {
        periodGroups.sort((a, b) => b[0].split('W')[1] - a[0].split('W')[1])

        const periodKeyAxisIndexMatrix = periodGroups
            .shift()
            .map(periodId => [periodId])

        periodGroups.forEach(periodGroup => {
            periodGroup.forEach(periodId => {
                const [year, week] = periodId.split('W')

                // find week number in 1st "serie"
                const xAxisIndexForPeriod = periodKeyAxisIndexMatrix.findIndex(
                    periodKeys => periodKeys[0].split('W')[1] === week
                )

                if (xAxisIndexForPeriod !== -1) {
                    periodKeyAxisIndexMatrix[xAxisIndexForPeriod].push(periodId)
                } else if (week === '1') {
                    const indexForW2 = periodKeyAxisIndexMatrix.findIndex(
                        periodKeys =>
                            periodKeys.findIndex(periodKey =>
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
                    const indexForPrevWeekInYear = periodKeyAxisIndexMatrix.findIndex(
                        periodKeys =>
                            periodKeys.findIndex(
                                periodKey => periodKey === `${year}W${week - 1}`
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
        // TODO daily case (Feb 29th)
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
        case WEEKS:
            return (
                periodKeyAxisIndexMatrix
                    // remove year, return "Wnn"
                    .map(periodKeys => periodKeys[0].substr(4))
                    .flat()
            )
        case DAYS:
            return periodKeyAxisIndexMatrix
                .map(periodKeys =>
                    // remove year, return "dd-mm"
                    periodKeys[0].substr(4).replace(/(\d{2})(\d{2})/, '$2-$1')
                )
                .flat()
    }
}

export const computeGenericPeriodNames = responses => {
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

export const getRelativePeriodTypeUsed = periodItems => {
    if (
        getRelativePeriodsOptionsById(WEEKS)
            .getPeriods()
            .find(period => period.id === periodItems[0].id)
    ) {
        return WEEKS
    } else if (
        getRelativePeriodsOptionsById(DAYS)
            .getPeriods()
            .find(period => period.id === periodItems[0].id)
    ) {
        return DAYS
    }
}
