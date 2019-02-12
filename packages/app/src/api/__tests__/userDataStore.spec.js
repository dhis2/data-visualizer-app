import * as d2lib from 'd2';
import * as userDataStore from '../userDataStore';
import {
    apiSave,
    apiFetch,
    hasNamespace,
    getNamespace,
    apiSaveAOInUserDataStore,
    apiFetchAOFromUserDataStore,
    prepareCurrentAnalyticalObject,
    NAMESPACE,
    CURRENT_AO_KEY,
} from '../userDataStore';

let mockD2;
let mockNamespace;

describe('api: user data store', () => {
    beforeEach(() => {
        mockNamespace = {
            get: jest.fn(),
            set: jest.fn(),
        };
        mockD2 = {
            currentUser: {
                dataStore: {
                    has: jest.fn().mockResolvedValue(false), // false default value for test purposes
                    get: jest.fn().mockResolvedValue(mockNamespace),
                    create: jest.fn().mockResolvedValue(mockNamespace),
                },
            },
        };
        d2lib.getInstance = () => Promise.resolve(mockD2);
    });

    describe('prepareCurrentAnalyticalObject', () => {
        it('removes corresponding attributes', () => {
            const unprocessed = {
                id: 'SOME_ID',
                name: 'Analytical object typical name',
                displayName: 'Analytical object typical name',
                key: 'value',
            };
            const processed = prepareCurrentAnalyticalObject(unprocessed);
            const keysToRemove = ['id', 'name', 'displayName'];

            keysToRemove.forEach(key => {
                expect(unprocessed[key]).not.toBeUndefined();
            });

            keysToRemove.forEach(key => {
                expect(processed[key]).toBeUndefined();
            });
        });
    });

    describe('hasNamespace', () => {
        it('uses result of "has" method of d2.currentUser.dataStore object', async () => {
            const result = await hasNamespace(mockD2);

            expect(mockD2.currentUser.dataStore.has).toBeCalledTimes(1);
            expect(mockD2.currentUser.dataStore.has).toBeCalledWith(NAMESPACE);
            expect(result).toEqual(false);
        });
    });

    describe('getNamespace', () => {
        it('retrieves and returns namespace if it exists', async () => {
            const result = await getNamespace(mockD2, true);

            expect(mockD2.currentUser.dataStore.get).toBeCalledTimes(1);
            expect(mockD2.currentUser.dataStore.create).toBeCalledTimes(0);
            expect(result).toMatchObject(mockNamespace);
        });

        it('creates and returns namespace if it doesnt exist', async () => {
            const result = await getNamespace(mockD2, false);

            expect(mockD2.currentUser.dataStore.get).toBeCalledTimes(0);
            expect(mockD2.currentUser.dataStore.create).toBeCalledTimes(1);
            expect(result).toMatchObject(mockNamespace);
        });
    });

    describe('apiSave', () => {
        it('uses d2 namespace.set for saving data under given key', async () => {
            const data = {};
            const key = 'someKey';

            await apiSave(data, key, mockNamespace);

            expect(mockNamespace.set).toBeCalledTimes(1);
            expect(mockNamespace.set).toBeCalledWith(key, data);
        });
    });

    describe('apiFetch', () => {
        it('uses d2 namespace.get for retrieving data by given key', async () => {
            const key = 'someKey';

            await apiFetch(key, mockNamespace);

            expect(mockNamespace.get).toBeCalledTimes(1);
            expect(mockNamespace.get).toBeCalledWith(key);
        });
    });

    describe('apiSaveAoInUserDataStore', () => {
        beforeEach(() => {
            userDataStore.getNamespace = () => Promise.resolve(mockNamespace);
        });

        it('uses default key unless specified', async () => {
            const data = {};

            await apiSaveAOInUserDataStore(data);

            expect(mockNamespace.set).toBeCalledTimes(1);
            expect(mockNamespace.set).toBeCalledWith(CURRENT_AO_KEY, data);
        });
    });

    describe('apiFetchAOFromUserDataStore', () => {
        beforeEach(() => {
            userDataStore.getNamespace = () => Promise.resolve(mockNamespace);
        });

        it('uses default key unless specified', async () => {
            await apiFetchAOFromUserDataStore();

            expect(mockNamespace.get).toBeCalledTimes(1);
            expect(mockNamespace.get).toBeCalledWith(CURRENT_AO_KEY);
        });
    });
});
