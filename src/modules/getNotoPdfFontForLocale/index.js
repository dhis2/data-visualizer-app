import { NOTO_FONT_LOOKUP } from './notoFontLookup.js'

const fontsDir = `${process.env.PUBLIC_URL}/fonts`

const findInNotoFontLookup = (callback) => {
    for (const [fontName, scriptsAndLanguages] of NOTO_FONT_LOOKUP) {
        if (callback(scriptsAndLanguages)) {
            return {
                normal: `${fontsDir}/${fontName}-Regular.ttf`,
                bold: `${fontsDir}/${fontName}-Bold.ttf`,
                // Note that these fonts do not actually have italic variants
                bolditalic: `${fontsDir}/${fontName}-Regular.ttf`,
                italic: `${fontsDir}/${fontName}-Regular.ttf`,
            }
        }
    }
}

const getScriptAndRegionFromJavaLocaleCode = (javaLocaleCode) => {
    const [rawLanguage, region, script] = javaLocaleCode.split('_')
    /* This will ensure that 3 character ISO639-2 language codes
     * for which a 2 character ISO639-1 code also exists are
     * normalized to the 2 character ISO639-1 code */
    const jsLocale = new Intl.Locale(rawLanguage, { script, region })

    return {
        language: jsLocale.language,
        script,
    }
}

export const getNotoPdfFontForLocale = (javaLocale = 'en') => {
    const { script, language } =
        getScriptAndRegionFromJavaLocaleCode(javaLocale)
    return (
        /* First scan the entire lookup to find a script match because script
         * matches should take precedence over language matches, since a
         * language can be written in multiple scripts */
        findInNotoFontLookup(({ scripts }) => scripts.has(script)) ??
        // Then scan for language matches
        findInNotoFontLookup(({ languages }) => languages.has(language)) ?? {
            /* If no match is found return the Noto base font.
             * Note that this does have italic variants */
            normal: `${fontsDir}/NotoSans-Regular.ttf`,
            bold: `${fontsDir}/NotoSans-Bold.ttf`,
            bolditalic: `${fontsDir}/NotoSans-BoldItalic.ttf`,
            italic: `${fontsDir}/NotoSans-Italic.ttf`,
        }
    )
}
