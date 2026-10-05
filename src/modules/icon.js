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

const ICON_SIZE = 48

const blobToDataUrl = (blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(blob)
    })

// DHIS2-20262: built-in icons are SVG, but custom icons uploaded in the Maintenance app are typically PNG
// non-SVG images are embedded as a data url in a minimal SVG wrapper because the single value
// renderer in analytics expects an SVG string
export const getIconSvgFromResponse = async (response) => {
    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('svg')) {
        const icon = await response.text()

        return icon.replaceAll('#333333', 'currentColor')
    }

    const dataUrl = await blobToDataUrl(await response.blob())

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}"><image href="${dataUrl}" width="${ICON_SIZE}" height="${ICON_SIZE}" preserveAspectRatio="xMidYMid meet"/></svg>`
}
