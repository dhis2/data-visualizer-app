export const toggler = (
    id,
    isCtrlPressed,
    isShiftPressed,
    index,
    lastClickedIndex,
    highlightedIds,
    items
) => {
    if (!isCtrlPressed && !isShiftPressed) {
        return {
            ids: [id],
            lastClickedIndex: index,
        };
    } else if (isShiftPressed) {
        const minIndex = lastClickedIndex > index ? index : lastClickedIndex;
        const maxIndex = lastClickedIndex < index ? index : lastClickedIndex;

        return {
            ids: items.slice(minIndex, maxIndex + 1),
            lastClickedIndex,
        };
    } else {
        return highlightedIds.includes(id)
            ? {
                  ids: highlightedIds.filter(itemId => itemId !== id),
                  lastClickedIndex,
              }
            : {
                  ids: [...highlightedIds, id],
                  lastClickedIndex: index,
              };
    }
};
