import 'jest-enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const INVALID_ARG_0 =
    'Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s'
const INVALID_ARG_1 = 'undefined'
const INVALID_ARG_2 =
    " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."

const originalConsoleError = global.console.error

global.console.error = function () {
    const isMessageToIgnore =
        arguments[0] === INVALID_ARG_0 &&
        arguments[1] === INVALID_ARG_1 &&
        arguments[2] === INVALID_ARG_2

    if (!isMessageToIgnore) {
        originalConsoleError.apply(null, arguments)
    }
}
