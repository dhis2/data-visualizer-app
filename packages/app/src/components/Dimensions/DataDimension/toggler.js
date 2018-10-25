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

/*

 if (!isCtrl±+Pressed && !isShiftPressed) {
            this.setState({ highlighted: [id], lastClickedIndex: index });
        } else if (isShiftPressed && this.state.lastClickedIndex !== null) {
            const minIndex =
                this.state.lastClickedIndex > index
                    ? index
                    : this.state.lastClickedIndex;

            const maxIndex =
                this.state.lastClickedIndex < index
                    ? index
                    : this.state.lastClickedIndex;

            const highlighted = this.props.items.slice(minIndex, maxIndex + 1);

            this.setState({ highlighted });
        } else {
            this.state.highlighted.includes(id)
                ? this.setState({
                      highlighted: this.state.highlighted.filter(
                          dataDimId => dataDimId !== id
                      ),
                  })
                : this.setState({
                      highlighted: [...this.state.highlighted, id],
                      lastClickedIndex: index,
                  });
        }

*/
