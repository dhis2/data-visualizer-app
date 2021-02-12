import { getRelativePeriodsOptionsById, WEEKS, DAYS } from '@dhis2/analytics'

export const computeYoYMatrix = (responses, relativePeriodTypeUsed) => {
    const periodGroups = responses.reduce((list, res) => {
        list.push(res.metaData.dimensions.pe)

        return list
    }, [])

    if (relativePeriodTypeUsed === WEEKS) {
        periodGroups.sort((a, b) => b[0].split('W')[1] - a[0].split('W')[1])
        console.log('periodGroups', periodGroups)

        const periodKeyAxisIndexMatrix = periodGroups
            .shift()
            .map(periodId => [periodId])

        console.log('xAxis map start', periodKeyAxisIndexMatrix)
        periodGroups.forEach(periodGroup => {
            console.log('processing', periodGroup)

            periodGroup.forEach(periodId => {
                const [year, week] = periodId.split('W')

                console.log('period', year, week)

                // find week number in 1st "serie"
                const xAxisIndexForPeriod = periodKeyAxisIndexMatrix.findIndex(
                    periodKeys => {
                        console.log(
                            `lookup for same week (W${week}) in`,
                            periodKeys
                        )
                        return periodKeys[0].split('W')[1] === week
                    }
                )

                if (xAxisIndexForPeriod !== -1) {
                    periodKeyAxisIndexMatrix[xAxisIndexForPeriod].push(periodId)
                } else if (week === '1') {
                    const indexForW2 = periodKeyAxisIndexMatrix.findIndex(
                        periodKeys => {
                            console.log('lookup for W2 in ', periodKeys)
                            return (
                                periodKeys.findIndex(periodKey => {
                                    return /W2$/.test(periodKey)
                                }) !== -1
                            )
                        }
                    )

                    if (indexForW2 !== -1) {
                        periodKeyAxisIndexMatrix[indexForW2].push(periodId)
                    } else {
                        periodKeyAxisIndexMatrix.push([periodId])
                    }
                } else {
                    // find the right spot considering also the year
                    const indexForPrevWeekInYear = periodKeyAxisIndexMatrix.findIndex(
                        periodKeys => {
                            console.log(
                                `lookup for prev week (W${
                                    week - 1
                                }) of year ${year} in`,
                                periodKeys
                            )
                            return (
                                periodKeys.findIndex(periodKey => {
                                    console.log('pk', periodKey)
                                    return periodKey === `${year}W${week - 1}`
                                }) !== -1
                            )
                        }
                    )

                    periodKeyAxisIndexMatrix.splice(
                        indexForPrevWeekInYear + 1,
                        0,
                        [periodId]
                    )
                }
            })
        })

        console.log('periodKeyAxisIndexMatrix', periodKeyAxisIndexMatrix)
        return periodKeyAxisIndexMatrix
        // TODO daily case (Feb 29th)
    } else {
        console.log('non week-day relative periods')
        console.log(
            'assuming all period groups having the same amount of values'
        )

        const periodKeyAxisIndexMatrix = periodGroups.reduce(
            (list, periodGroup) => {
                periodGroup.forEach((periodId, index) => {
                    list[index].push(periodId)
                })

                return list
            },
            Array.from({ length: periodGroups[0].length }, () => [])
        )

        console.log('periodKeyAxisIndexMatrix', periodKeyAxisIndexMatrix)
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

export const getRelativePeriodTypeUsed = peItems => {
    if (
        getRelativePeriodsOptionsById(WEEKS)
            .getPeriods()
            .find(p => p.id === peItems[0].id)
    ) {
        return WEEKS
    } else if (
        getRelativePeriodsOptionsById(DAYS)
            .getPeriods()
            .find(p => p.id === peItems[0].id)
    ) {
        return DAYS
    }
}
