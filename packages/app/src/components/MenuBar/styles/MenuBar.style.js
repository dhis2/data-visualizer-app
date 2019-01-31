export default theme => ({
    menuBar: {
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing.unit}px`,
        height: '38px',
    },
    updateButton: {
        marginRight: theme.spacing.unit,
    },
    label: {
        fontSize: '15px',
        fontWeight: 400,
        textTransform: 'none',
    },
    grow: {
        flex: '1 1 0%',
    },
});
