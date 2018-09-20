import isObject from 'd2-utilizr/lib/isObject';

// TODO, copied from dashboards-app
export function arrayToIdMap(array) {
    return sortArray(array).reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {});
}

export function entriesToObject(entries) {
    return entries.reduce(
        (obj, [key, value]) => ({ ...obj, [key]: value }),
        {}
    );
}

export const sortArray = array => {
    const sortedDimensions = array.sort((dimensionA, dimensionB) => {
        const nameA = dimensionA.displayName.toLowerCase(),
            nameB = dimensionB.displayName.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });

    return sortedDimensions;
};

export const filterArr = (filterArr, includeArr, flag) => {
    const RETRIEVE_INCLUDED = true;
    const REMOVE_INCLUDED = false;
    const REMOVE_ELEMENT = 'NOT_EQUAL';

    switch (flag) {
        case RETRIEVE_INCLUDED: {
            return filterArr.filter(item => includeArr.includes(item) && item);
        }
        case REMOVE_INCLUDED: {
            return filterArr.filter(item => !includeArr.includes(item) && item);
        }
        case REMOVE_ELEMENT: {
            return filterArr.filter(item => item.id !== includeArr.id);
        }
        default:
            return [];
    }
};

export function arrayGetById(array, id) {
    return array.find(item => item.id === id);
}

export function orArray(param) {
    return Array.isArray(param) ? param : [];
}

export function orObject(param) {
    return isObject(param) ? param : {};
}

// object

export const getPropsByKeys = (sourceObj, keys) =>
    keys.reduce(
        (obj, key) =>
            sourceObj.hasOwnProperty(key)
                ? { ...obj, [key]: sourceObj[key] }
                : obj,
        {}
    );
