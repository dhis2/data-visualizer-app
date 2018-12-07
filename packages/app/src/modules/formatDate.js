/**
 *
 * @param {Date} value Javascript date
 * @param {String} uiLocale
 * @returns {String}
 */

const formatDate = (value = '', uiLocale = 'en') => {
    if (typeof global.Intl !== 'undefined' && Intl.DateTimeFormat) {
        return new Intl.DateTimeFormat(uiLocale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(new Date(value));
    }

    return value.substr(0, 19).replace('T', ' ');
};

export default formatDate;
