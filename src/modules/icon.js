// In 2.42 the analytics api started to return icon names instead of absolute urls
// https://dhis2.atlassian.net/browse/DHIS2-20388
// Input can be either an icon name or a full url
// This function extracts the icon name from either input format
export const getIconName = (input) => {
    if (typeof input !== 'string' || !input.trim()) {
        return null
    }

    const match = input.match(/\/([^/]+)\/icon\.svg$/)
    if (match) {
        // URL case → extract the part between /api/icons/ and /icon.svg
        return match[1]
    }

    // Otherwise assume it's already the icon name
    return input
}

// Reconstruct the url even if input is already a url
// The url was sometimes wrong because it relied on manual input in dhis.conf
export const getIconUrl = (input, baseUrl) => {
    const iconName = getIconName(input)
    return iconName ? `${baseUrl}/api/icons/${iconName}/icon.svg` : null
}
