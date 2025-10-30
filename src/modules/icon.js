// DHIS2-20388: In 2.42 the analytics api started to return icon names instead of absolute urls as an agreed breaking change
// This means that "input" can be either an icon name or a full url
// "getIconName" extracts the icon name from either input format
export const getIconName = (input) => {
    if (typeof input !== 'string' || !input.trim()) {
        return null
    }

    const match = input.match(/\/([^/]+)\/icon\.svg$/)

    return match ? match[1] : input
}

// The url coming from the api was sometimes wrong because it relied on manual input in dhis.conf
// "getIconUrl" reconstructs the url even if input is already a url
export const getIconUrl = (input, baseUrl) => {
    const iconName = getIconName(input)
    return iconName ? `${baseUrl}/api/icons/${iconName}/icon.svg` : null
}
