import { customNotoFontLookup } from './customNotoFontLookup.js'

const NOTO_SANS_BASE_FONT_NAME = 'NotoSans'

const findCustomNotoFont = (callback) => {
    for (const [fontName, lookup] of customNotoFontLookup) {
        if (callback(lookup)) {
            return fontName
        }
    }
}

const getNotoFontNameForJavaLocale = (javaLocaleCode) => {
    const [rawLanguage, region, script] = javaLocaleCode.split('_')
    /* This will ensure that 3 character ISO639-2 language codes
     * for which a 2 character ISO639-1 code also exists are
     * normalized to the 2 character ISO639-1 code */
    const jsLocale = new Intl.Locale(rawLanguage, { script, region })
    const language = jsLocale.language

    return (
        findCustomNotoFont(({ scripts }) => scripts.has(script)) ??
        findCustomNotoFont(({ languages }) => languages.has(language)) ??
        NOTO_SANS_BASE_FONT_NAME
    )
}

const getNotoFontVariantsForFontName = (fontName = '') =>
    /* Only the base font has "Italic" and "BoldItalic", the script-specific
     * fonts do not, so we just use Regular for those */
    fontName === NOTO_SANS_BASE_FONT_NAME
        ? {
              normal: `${process.env.PUBLIC_URL}/fonts/NotoSans-Regular.ttf`,
              bold: `${process.env.PUBLIC_URL}/fonts/NotoSans-Bold.ttf`,
              bolditalic: `${process.env.PUBLIC_URL}/fonts/NotoSans-BoldItalic.ttf`,
              italic: `${process.env.PUBLIC_URL}/fonts/NotoSans-Italic.ttf`,
          }
        : {
              normal: `${process.env.PUBLIC_URL}/fonts/${fontName}-Regular.ttf`,
              bold: `${process.env.PUBLIC_URL}/fonts/${fontName}-Bold.ttf`,
              bolditalic: `${process.env.PUBLIC_URL}/fonts/${fontName}-Regular.ttf`,
              italic: `${process.env.PUBLIC_URL}/fonts/${fontName}-Regular.ttf`,
          }

export const getNotoFontVariantsForLocale = (javaLocale = 'en') => {
    const fontName = getNotoFontNameForJavaLocale(javaLocale)
    return getNotoFontVariantsForFontName(fontName)
}
