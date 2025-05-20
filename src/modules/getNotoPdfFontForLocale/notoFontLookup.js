/* Full list of languages:
 * https://www.loc.gov/standards/iso639-2/php/English_list.php
 * Full list of scripts:
 * https://unicode.org/iso15924/iso15924-codes.html
 * An overview of scripts commonly used with different languages:
 * https://www.unicode.org/cldr/charts/44/supplemental/languages_and_scripts.html
 * We have identified the following languages/scripts which
 * require a custom Noto font bundle:
 * - Arabic
 * - Bengali/Bangla
 * - Ethiopic
 * - Hewbrew
 * - Japanese
 * - Khmer
 * - Korean
 * - Lao
 * - Myanmar
 * - Odia
 * - Simplified Chinese
 * - Sinhala
 * - Thai
 * The lookup below describes the scripts and languages per
 * custom font bundle. It's likely that this lookup is not
 * complete and that new font-bundles and script- and
 * language-codes will be added in the future. When adding a
 * new font bundle here, new .ttf files also need to be added to
 * `./public/fonts`.
 * Note about the language sets: some language codes correspond to
 * multiple scripts, but we can only add a single font bundle when
 * convering to PDF. The Latn script is supported without a font
 * bundle, so if a language corresponds to Latn plus one additional
 * script, we can include the bundle for that script. However if the
 * language * corresponds to multiple non-ASCII scripts then choosing
 * the correct font bundle based on a language code is technicaly
 * impossible. The only way to ensure the correct font bundle for
 * PDF generation is by ensuring that the locale string contains a
 * script section. In the lookup below these ambiguous languages
 * have been disabled, because it is better to serve the base Noto
 * font in these cases. */

export const NOTO_FONT_LOOKUP = new Map([
    [
        'NotoSansArabic',
        {
            scripts: new Set(['Arab']),
            languages: new Set([
                'arq',
                'ar', // Technically maps to both Arab and Syrc but we assume Arab
                // 'az', (Arab + Cyrl)
                'bqi',
                // 'bft', (Arab + Tibt)
                'bal',
                'bej',
                'brh',
                'ckb',
                'swb',
                // 'cop', (Arab + Grek + Copt)
                'dcc',
                // 'doi', (Arab + Deva + Takr)
                // 'cjm', (Arab + Cham)
                'arz',
                'glk',
                'gju',
                'ha',
                'haz',
                'id',
                // 'inh', (Arab + Cyrl)
                'dyo',
                'jrb',
                'gjk',
                // 'ks', (Arab + Deva)
                // 'kk', (Arab + Cyrl)
                'khw',
                // 'ku', (Arab + Cyrl)
                // 'ky', (Arab + Cyrl)
                'lki',
                'ms',
                'mzn',
                'ary',
                // 'ttt', (Arab + Cyrl)
                'ars',
                'wni',
                'zdj',
                'fia',
                'hno',
                'lrc',
                'kvx',
                'prd',
                'ps',
                'mfa',
                'fa',
                // 'pa', (Arab + Guru)
                // 'rhg', (Arab + Rohg)
                'skr',
                // 'sd' (Arab + Deva + Khoj + Sind)
                // 'so',(Arab + Osma)
                'hnd',
                'sdh',
                'luz',
                'sus',
                // 'shi', (Arab + Tfng)
                // 'tg', (Arab + Cyrl)
                // 'tly', (Arab + Cyrl)
                'aeb',
                'tr',
                // 'tk', (Arab + Cyrl)
                'ur',
                'ug',
                // 'uz', (Arab + Cyrl)
                'kxp',
                'bgn',
                // 'cja' (Arab + Cham)
                'lah',
                'wo',
                'gbz',
            ]),
        },
    ],
    [
        'NotoSansJP',
        {
            scripts: new Set(['Jpan']),
            languages: new Set(['ja']),
        },
    ],
    [
        'NotoSansKR',
        {
            scripts: new Set(['Kore']),
            languages: new Set(['ko']),
        },
    ],
    [
        'NotoSansSC',
        {
            scripts: new Set(['Hans']),
            languages: new Set([
                'yue',
                'zh',
                'gan',
                'hak',
                'lzh',
                'nan',
                'wuu',
                'hsn',
                'za',
            ]),
        },
    ],
    [
        'NotoSansThai',
        {
            scripts: new Set(['Thai']),
            languages: new Set([
                'lwl',
                'kdt',
                'tts',
                'kxm',
                'nod',
                // 'pi' (Deva + Sinh + Thai)
                'sou',
                'th',
                'lcp',
            ]),
        },
    ],
    [
        'NotoSansHebrew',
        {
            scripts: new Set(['Hebr']),
            languages: new Set([
                'he',
                'jrb',
                'jpr',
                'lad',
                // 'sam', (Hebr + Samr)
                'yi',
            ]),
        },
    ],
    [
        'NotoSansLao',
        {
            scripts: new Set(['Laoo']),
            languages: new Set(['hnj', 'kjg', 'lo']),
        },
    ],
    [
        'NotoSansEthiopic',
        {
            scripts: new Set(['Ethi']),
            languages: new Set(['am', 'byn', 'gez', 'om', 'tig', 'ti', 'wal']),
        },
    ],
    [
        'NotoSansMyanmar',
        {
            scripts: new Set(['Mymr']),
            languages: new Set(['my', 'kht', 'mnw', 'shn']),
        },
    ],
    [
        'NotoSansBengali',
        {
            scripts: new Set(['Beng']),
            languages: new Set([
                'as',
                'bn',
                'bpy',
                // 'ccp', (Beng + Cakm)
                'grt',
                'kha',
                // 'mni', (Beng, Mtei)
                'lus',
                // 'unx' (Beng + Deva),
                // 'unr' (Beng + Deva),
                'rkt',
                // 'sat' (Beng + Deva + Orya + Olck)
                // 'syl' (Beng + Sylo)
            ]),
        },
    ],
    [
        'NotoSansKhmer',
        {
            scripts: new Set(['Khmr']),
            languages: new Set(['km']),
        },
    ],
    [
        'NotoSansOriya',
        {
            scripts: new Set(['Orya']),
            languages: new Set([
                // 'kxv', (Orya + Deva + Telu)
                'or',
                // 'sat' (Orya + Beng + Deva + Olck)
            ]),
        },
    ],
    [
        'NotoSansSinhala',
        {
            scripts: new Set(['Sinh']),
            languages: new Set([
                'si',
                // 'pi', (Sihn + Deva + Thai)
                // 'sa', (Sihn + Deva + Gran + Shrd + Sidd)
            ]),
        },
    ],
])
