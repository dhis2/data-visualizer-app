const userSettings = {
    keyDbLocale: 'ponyLang',
}

export function getStubContext() {
    return {
        i18n: {
            t: () => {},
        },
        d2: {
            currentUser: {
                firstName: 'Rainbow',
                surname: 'Dash',
                userSettings: {
                    get: (key) => userSettings[key],
                },
            },
        },
        store: {
            dispatch: () => {},
        },
    }
}
