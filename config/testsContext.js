export function getStubContext() {
    return {
        i18n: {
            t: () => {},
        },
        baseUrl: '',
        dataEngine: {},
        //        d2: {
        //            currentUser: {
        //                firstName: 'Rainbow',
        //                surname: 'Dash',
        //                userSettings: {
        //                    get: (key) => userSettings[key],
        //                },
        //            },
        //        },
        store: {
            dispatch: () => {},
        },
    }
}
