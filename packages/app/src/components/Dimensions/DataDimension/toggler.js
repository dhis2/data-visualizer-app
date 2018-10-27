export const toggler = (
    id,
    isCtrlPressed,
    isShiftPressed,
    index,
    lastClickedIndex,
    highlightedIds,
    items
) => {
    let ids;
    let newIndex = lastClickedIndex;

    if (!isCtrlPressed && !isShiftPressed) {
        ids = [id];
        newIndex = index;
    } else if (isShiftPressed) {
        const minIndex = getMinIndex(lastClickedIndex, index);
        const maxIndex = getMaxIndex(lastClickedIndex, index);

        ids = mergeIds(highlightedIds, items, minIndex, maxIndex);
    } else {
        const newArr = updateArray(highlightedIds, id, lastClickedIndex, index);
        ids = newArr.ids;
        newIndex = newArr.newIndex;
    }

    return {
        ids,
        lastClickedIndex: newIndex,
    };
};

const getMinIndex = (lastClickedIndex, index) =>
    lastClickedIndex > index ? index : lastClickedIndex;

const getMaxIndex = (lastClickedIndex, index) =>
    lastClickedIndex < index ? index : lastClickedIndex;

const mergeIds = (highlightedIds, items, minIndex, maxIndex) =>
    items
        .slice(minIndex, maxIndex + 1)
        .filter(id => !highlightedIds.includes(id))
        .concat(highlightedIds);

const updateArray = (highlightedIds, id, lastClickedIndex, index) => {
    let ids;
    let newIndex = lastClickedIndex;

    if (highlightedIds.includes(id))
        ids = highlightedIds.filter(itemId => itemId !== id);
    else {
        ids = [...highlightedIds, id];
        newIndex = index;
    }

    return {
        ids,
        newIndex,
    };
};
