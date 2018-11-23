// Fix for vertical flex scrolling in Firefox/Safari:
// Wrap the list in a div with position:relative (and flex:1 instead of on the list)
// On the list, set position:absolute, width:100%, height:100%

export const styles = {
    list: {
        height: 'calc(100vh - 157px)',
        overflow: 'auto',
        padding: '0 8px 0 0',
        marginTop: '0px',
    },
};
