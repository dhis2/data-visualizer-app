import isObject from 'd2-utilizr/lib/isObject';

// TODO, copied from dashboards-app
export function arrayToIdMap(array) {
    return array.reduce((obj, item) => {
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

export const arrayIsEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false;

    let isEqual = true;

    array1.forEach(item => {
        if (!array2.includes(item)) isEqual = false;
    });

    return isEqual;
};

export const sortArray = (array, propName) => {
    return array.sort((itemA, itemB) => {
        const nameA = itemA[propName].toLowerCase();
        const nameB = itemB[propName].toLowerCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
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
