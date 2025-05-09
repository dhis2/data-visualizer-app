export function getStubContext() {
    return {
        i18n: {
            t: () => {},
        },
        store: {
            dispatch: () => {},
        },
    }
}
