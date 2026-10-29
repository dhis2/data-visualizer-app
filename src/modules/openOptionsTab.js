// shortcut: a window event links the chart's colour picker to the Options menu, which lives in
// another tree and keeps its open tab in local state; move to redux if this leaves the prototype
const EVENT = 'dv-open-options-tab'

export const openOptionsTab = (tabKey) =>
    window.dispatchEvent(new CustomEvent(EVENT, { detail: tabKey }))

// Returns the unsubscribe function, so it can be returned from useEffect
export const onOpenOptionsTab = (callback) => {
    const listener = (event) => callback(event.detail)
    window.addEventListener(EVENT, listener)

    return () => window.removeEventListener(EVENT, listener)
}
