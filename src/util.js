// object

// TODO, copied from dashboards-app
export function arrayToIdMap(array) {
    return array.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {});
}

export function arrayGetById(array, id) {
    return array.find(item => item.id === id);
}
