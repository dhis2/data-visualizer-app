import '@dhis2/cli-utils-cypress/support'

import './commands'
import { loginAndPersistSession } from './server'

loginAndPersistSession()
