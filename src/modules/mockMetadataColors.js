// PROTOTYPE ONLY: stands in for the `style.color` property on data items.
// Items not listed here behave as if no colour is set in metadata.
export const MOCK_METADATA_COLORS = {
    fbfJHSPpUQD: '#1565c0', // ANC 1st visit
    cYeuwXTCPkU: '#2e7d32', // ANC 2nd visit
    Uvn6LCg7dVU: '#6a1b9a', // ANC 1 Coverage
    OdiHJayrsKo: '#ef6c00', // ANC 2 Coverage
    AUqdhY4mpvp: '#c62828', // ANC => 4 Coverage
}

export const getMetadataColor = (id) => MOCK_METADATA_COLORS[id]
