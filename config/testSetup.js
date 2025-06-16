import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import 'jest-webgl-canvas-mock'

configure({ testIdAttribute: 'data-test' })
