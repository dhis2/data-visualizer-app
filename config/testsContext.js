export function getStubContext() {
    return {
        i18n: {
            t: () => {},
        },
        dataEngine: {},
        store: {
            dispatch: () => {},
        },
    }
}
