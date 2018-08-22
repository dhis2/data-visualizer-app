import isObject from 'd2-utilizr/lib/isObject';
// object

// TODO, copied from dashboards-app
export function arrayToIdMap(array) {
    return array.reduce((obj, item) => {
        obj[item.id] = { ...item, ...{ selected: false } };
        return obj;
    }, {});
}

export function arrayGetById(array, id) {
    return array.find(item => item.id === id);
}

export function orArray(param) {
    return Array.isArray(param) ? param : [];
}

export function orObject(param) {
    return isObject(param) ? param : {};
}
