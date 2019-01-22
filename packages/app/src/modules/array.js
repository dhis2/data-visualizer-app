export const toArray = param => (Array.isArray(param) ? param : [param]);

export const createSortFunction = key => (a, b) =>
    a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
