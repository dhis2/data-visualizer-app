/* eslint-disable no-unused-vars */

const state = {
    // Analytical object as retrieved from the API (with the correct field filtering)
    // Typically set when opening an analytics object via the favorites menu
    visualization: {},

    // Object holding the source of the currently shown visualization
    // Init state: null
    current: null,

    // Object {id:dimension} of dimensions to show in left panel
    // Init state: null
    // If no dimensions were returned by the api: {}
    dimensions: null,

    // Array of recommended dimension ids
    // Init state: []
    // Keeping them seperated from dimensions for performance reasons
    recommendedDimensionIds: [],

    // Object holding default and current state for the components
    ui: {
        type: 'column',
        options: {
            showData: true,
            // ...All options
        },
        layout: {
            columns: ['dx'],
            rows: ['pe'],
            filters: ['ou'],
        },
        itemsByDimension: {
            dx: [],
            pe: ['LAST_12_MONTHS'], // Initialised by https://play.dhis2.org/2.30/api/systemSettings.json?key=keyAnalysisRelativePeriod
            ou: ['USER_ORGUNIT'],
        },
    },
};

// Typical flow

// Open app, select dimensions, change an option etc -> this only changes "ui" in the store
// Layout, Options, Dimensions are controlled components, they just render what's in "ui"
// When update button is clicked, current selection is grabbed from "ui" and put in current on the appropriate format
// Then data is fetched from the backend and the visualization is created

// If you load an AO (analytical object) it will be stored in "visualization" and "current" -> the visualization is shown
// Change selection (updates "ui") and click update (updates "current") -> "visualization" and "current" are now different objects -> show unsaved state indicator

// When dx/ou in "itemsByDimension" change -> update "recommendedDimensionIds"
// Keeping recommended ids separated to avoid re-render of the full list, only updating the dots
