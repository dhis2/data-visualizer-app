let dataEngineMock

function mockInit() {
    dataEngineMock = {
        query: jest.fn(),
        mutate: jest.fn(),
    }
}

function values(object) {
    return Object.keys(object).map((key) => object[key])
}

function mockClear() {
    values(dataEngineMock)
        .filter((property) => typeof property === 'function')
        .forEach((spyFn) => spyFn.mockClear())
}

export default function DataEngine() {
    return dataEngineMock
}

DataEngine.mockReset = mockInit
DataEngine.mockClear = mockClear

mockInit()
