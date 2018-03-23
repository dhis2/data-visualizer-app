/* eslint-disable no-unused-vars */

const storeDesign = {
    // if a favorite is loaded, store the id here
    // default: null - no favorite is loaded
    id: 'abcdefghijk',

    // the current ui selection
    // stick to the api chart format so that we dont need to transform back and forth?
    current: {},

    // list of /api/dimensions loaded in left panel
    dimensions: [],

    // list of recommended dimension ids
    // default: empty array
    recommendationIds: [],
};
