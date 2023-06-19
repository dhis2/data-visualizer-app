import { enableAutoLogin } from '@dhis2/cypress-commands'

import './commands.js'

enableAutoLogin()

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    // This prevents a benign error:
    //   This error means that ResizeObserver was not able to deliver all
    //   observations within a single animation frame. It is benign (your site
    //   will not break).
    //
    // Source: https://stackoverflow.com/a/50387233/1319140
    if (resizeObserverLoopErrRe.test(err.message)) {
        // returning false here prevents Cypress from failing the test
        return false
    }
})
