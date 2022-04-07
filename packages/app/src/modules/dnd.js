const DATA_TYPE_TEXT = 'text'

export const setDataTransfer = (e, source) => {
    e.dataTransfer.setData(
        DATA_TYPE_TEXT,
        JSON.stringify({
            dimensionId: e.target.dataset.dimensionid,
            source,
        })
    )
}