/* eslint-disable no-unused-vars */

const state = {
    // if a favorite is loaded, store the id here
    // default: null - no favorite is loaded
    id: 'favId',

    // the analytics object as retrieved from the API
    // typically set when opening an analytics object via the favorites menu
    visualization: {},

    // the current ui selection
    // stick to the api chart format so that we dont need to transform back and forth?
    current: {},

    // array of /api/dimensions loaded in left panel
    // default: null - not loaded yet
    // empty array means no dimensions were provided by the api
    dimensions: [],

    // list of recommended dimension ids
    // default: empty array
    // (no need to distinguish between null and empty array here i think,
    //  as they won't be displayed differently in the ui?)
    recommendationIds: [],
};

const dimension = {
    id: 'dimId',
    displayName: 'dimName',
};
