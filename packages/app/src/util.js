import isObject from 'd2-utilizr/lib/isObject';
// object

// TODO, copied from dashboards-app
export function arrayToIdMap(array) {
    return sortArray(array).reduce((obj, item) => {
        obj[item.id] = {
            ...item,
<<<<<<< HEAD
<<<<<<< HEAD
            ...{ selected: false },
=======
>>>>>>> a3b035fdcddd18970f189423de490d4eac4a4d69
=======
>>>>>>> edbf974edef3a9c0fe87241256b9c6c0d8417593
        };
        return obj;
    }, {});
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

export function arrayGetById(array, id) {
    return array.find(item => item.id === id);
}

export function orArray(param) {
    return Array.isArray(param) ? param : [];
}

export function orObject(param) {
    return isObject(param) ? param : {};
}
