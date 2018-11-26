export default theme => ({
    divContainer: {
        height: '450px',
    },
    tabsBar: {
        height: '48px',
        backgroundColor: theme.palette.common.white,
        borderBottom: `1px solid ${theme.colors.greyLight}`,
    },
    flexContainer: {
        justifyContent: 'space-evenly',
    },
    tab: {
        flexBasis: '160px',
    },
    formControlRoot: {
        paddingBottom: '5px',
    },
    formGroupContainer: {
        paddingTop: '10px',
    },
    formGroupRoot: {
        paddingBottom: '5px',
    },
    rangeAxisMin: {
        paddingRight: '15px',
    },
    textBaseRoot: {
        paddingBottom: '5px',
    },
    inputLabel: {
        fontSize: '15px',
    },
    formControlLabelRoot: {
        marginLeft: 15,
        alignItems: 'flex-end',
    },
    checkBoxRoot: {
        padding: '0px 5px',
    },
});
