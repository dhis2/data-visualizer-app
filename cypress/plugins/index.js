const {
    networkShim,
    chromeAllowXSiteCookies,
} = require('@dhis2/cypress-plugins')

/* eslint-disable-next-line no-unused-vars */
module.exports = (on, config) => {
    networkShim(on)
    chromeAllowXSiteCookies(on)
}
