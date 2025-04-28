export function getStubContext() {
    return {
        i18n: {
            t: () => {},
        },
        baseUrl: '',
        dataEngine: {},
        store: {
            dispatch: () => {},
        },
    }
}
