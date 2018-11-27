export default theme => ({
    dialogContent: {
        height: '500px',
        overflowY: 'scroll',
    },
    tabsBar: {
        height: '48px',
        backgroundColor: theme.palette.common.white,
        borderBottom: `1px solid ${theme.colors.greyLight}`,
    },
    tab: {
        width: '160px',
    },
    formControlRoot: {
        paddingBottom: '5px',
    },
    formControlLabelRoot: {
        marginLeft: '15px',
        alignItems: 'flex-end',
    },
    formGroupContainer: {
        paddingTop: '10px',
    },
    switchBase: {
        top: '5px',
    },
    formGroupRoot: {
        paddingBottom: '5px',
    },
    rangeAxisMin: {
        paddingRight: '15px',
    },
    targetLineRoot: {
        alignItems: 'baseline',
    },
    targetLineValue: {
        paddingRight: '15px',
    },
    baseLine: {
        alignItems: 'baseline',
        marginRight: '25px',
    },
    baseLineValue: {
        paddingRight: '15px',
    },
    textBaseRoot: {
        paddingBottom: '5px',
    },
    inputLabel: {
        fontSize: '15px',
    },

    checkBoxRoot: {
        padding: '0px 5px',
    },
});
