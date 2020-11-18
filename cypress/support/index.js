import { registerCommands } from '@dhis2/cypress-commands'

import './commands'
import { loginAndPersistSession } from './server'

registerCommands()
loginAndPersistSession()
