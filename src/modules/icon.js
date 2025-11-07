// "getIconName" extracts and returns the icon name regardless of "iconStr" being a name or a an absolute url"
export const getIconName = (iconStr) => {
    if (typeof iconStr !== 'string' || !iconStr.trim()) {
        return null
    }
    const regex = /\/([^/]+)\/icon\.svg$/
    const match = regex.exec(iconStr)
    return match ? match[1] : iconStr
}

// "iconStr" parameter can be either an icon name or an absolute url
// "getIconUrl" always returns a reconstructed url because the url provided by the api was sometimes wrong before 42.4
// DHIS2-20388: From 42.4 the analytics api will start to return icon names instead of absolute urls as an agreed breaking change
export const getIconUrl = (iconStr, baseUrl) => {
    const iconName = getIconName(iconStr)
    return iconName ? `${baseUrl}/api/icons/${iconName}/icon.svg` : null
}
