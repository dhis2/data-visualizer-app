import { getInstance } from 'd2';
import { onError } from './index';
import flow from 'lodash-es/flow';

export const NAMESPACE = 'analytics';
export const CURRENT_AO_KEY = 'currentAnalyticalObject';

export const hasNamespace = async d2 =>
    await d2.currentUser.dataStore.has(NAMESPACE);

export const getNamespace = async (d2, hasNamespace) =>
    hasNamespace
        ? await d2.currentUser.dataStore.get(NAMESPACE)
        : await d2.currentUser.dataStore.create(NAMESPACE);

export const prepareCurrentAnalyticalObject = (current, metadata) =>
    flow(
        removeUnnecessaryAttributesFromAnalyticalObject,
        appendDimensionItemNamesToAnalyticalObject.bind(this, metadata)
    )(current);

export const removeUnnecessaryAttributesFromAnalyticalObject = current => ({
    ...current,
    id: undefined,
    name: undefined,
    displayName: undefined,
});

export const appendDimensionItemNamesToAnalyticalObject = (
    metadata,
    current
) => {
    const appendNames = dimension => ({
        ...dimension,
        items: dimension.items.map(item => ({
            ...item,
            name: metadata[item.id].name,
        })),
    });

    return {
        ...current,
        columns: current.columns.map(appendNames),
        filters: current.filters.map(appendNames),
        rows: current.rows.map(appendNames),
    };
};

export const apiSave = async (data, key, namespace) => {
    try {
        const d2 = await getInstance();
        const ns =
            namespace || (await getNamespace(d2, await hasNamespace(d2)));

        return ns.set(key, data);
    } catch (error) {
        return onError(error);
    }
};

export const apiFetch = async (key, namespace) => {
    try {
        const d2 = await getInstance();
        const ns =
            namespace || (await getNamespace(d2, await hasNamespace(d2)));

        return ns.get(key);
    } catch (error) {
        return onError(error);
    }
};

export const apiSaveAOInUserDataStore = (current, key = CURRENT_AO_KEY) =>
    apiSave(current, key);

export const apiFetchAOFromUserDataStore = (key = CURRENT_AO_KEY) =>
    apiFetch(key);
