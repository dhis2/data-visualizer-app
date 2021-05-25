import { enableAutoLogin } from '@dhis2/cypress-commands'

import './commands'

enableAutoLogin()

export const exactMatch = string =>
    new RegExp(`^${string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'gm') //eslint-disable-line no-useless-escape
