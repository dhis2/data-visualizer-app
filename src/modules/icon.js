// "getIconName" extracts and returns the icon name regardless of input being a name or a an absolute url"
export const getIconName = (input) => {
    if (typeof input !== 'string' || !input.trim()) {
        return null
    }
    const match = input.match(/\/([^/]+)\/icon\.svg$/)
    return match ? match[1] : input
}

// "getIconUrl" gets the icon name and returns a reconstructed absolute url
// We want to always return a reconstructed url because the url provided by the api was sometimes wrong
// DHIS2-20388: From 2.42 the analytics api will start to return icon names instead of absolute urls as an agreed breaking change
export const getIconUrl = (input, baseUrl) => {
    const iconName = getIconName(input)
    return iconName ? `${baseUrl}/api/icons/${iconName}/icon.svg` : null
}
