import 'jest-enzyme'
import 'jest-webgl-canvas-mock'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
