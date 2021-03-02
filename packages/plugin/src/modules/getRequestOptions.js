import { getOptionsForRequest } from './options'

export const getRequestOptions = (visualization, filters, userSettings) => {
    const options = getOptionsForRequest().reduce((map, [option, props]) => {
        // only add parameter if value !== default
        if (
            visualization[option] !== undefined &&
            visualization[option] !== props.defaultValue
        ) {
            map[option] = visualization[option]
        }

        return map
    }, {})

    // interpretation filter
    if (filters.relativePeriodDate) {
        options.relativePeriodDate = filters.relativePeriodDate
    }

    if (userSettings?.displayProperty) {
        switch (userSettings.displayProperty) {
            case 'displayShortName':
                options.displayProperty = 'SHORTNAME'
                break
            case 'displayName':
                options.displayProperty = 'NAME'
                break
        }
    }

    // global filters
    // userOrgUnit
    if (filters.userOrgUnit && filters.userOrgUnit.length) {
        const ouIds = filters.userOrgUnit.map(
            ouPath => ouPath.split('/').slice(-1)[0]
        )

        options.userOrgUnit = ouIds.join(';')
    }

    return options
}
