export const TITLE_PROP = 'title'
export const SUBTITLE_PROP = 'subtitle'
export const SERIES_PROP = 'series'
export const LEGEND_PROP = 'legend'
export const PLOT_LINES_PROP = 'plotLines'
export const Y_AXIS_PROP = 'yAxis'
export const X_AXIS_PROP = 'xAxis'

export const CONFIG_DEFAULT_TITLE = {
    margin: 30,
    align: 'center',
    style: {
        color: '#212934',
        fontSize: '18px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    text: 'Sierra Leone',
}

export const CONFIG_DEFAULT_SUBTITLE = {
    align: 'center',
    style: {
        color: '#4a5768',
        fontSize: '13px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    text: undefined,
}

export const CONFIG_DEFAULT_LEGEND = {
    symbolWidth: 11,
    symbolHeight: 11,
    itemMarginBottom: 2,
    align: 'center',
    itemStyle: {
        fontSize: '13px',
        fontWeight: 'normal',
        color: '#212934',
        fontStyle: 'normal',
    },
}

export const CONFIG_DEFAULT_SERIES_AXIS_LABELS = {
    style: {
        color: '#404b5a',
        fontSize: '11px',
        fontWeight: 'normal',
        fontStyle: 'normal',
    },
}

export const CONFIG_DEFAULT_CATEGORY_AXIS_LABELS = CONFIG_DEFAULT_SERIES_AXIS_LABELS

export const CONFIG_DEFAULT_VERTICAL_AXIS_TITLE = {
    align: 'middle',
    margin: 15,
    style: {
        color: '#212934',
        fontSize: '13px',
        fontWeight: 'normal',
        fontStyle: 'normal',
    },
    //"text": "some text"
}

export const CONFIG_DEFAULT_HORIZONTAL_AXIS_TITLE = CONFIG_DEFAULT_VERTICAL_AXIS_TITLE

export const CONFIG_DEFAULT_TARGET_LINE = {
    color: '#212934',
    width: 2,
    zIndex: 4,
    value: 123,
    label: {
        y: -7,
        style: {
            color: '#212934',
            fontSize: '13px',
            fontWeight: 'normal',
            fontStyle: 'normal',
        },
        text: 'some text',
        align: 'left',
        x: 10,
    },
}

export const CONFIG_DEFAULT_BASE_LINE = CONFIG_DEFAULT_TARGET_LINE

export const CONFIG_DEFAULT_TREND_LINE = {
    type: 'line',
    //name: 'some name (trend)',
    dashStyle: 'solid',
    //color: 'rgb(141, 160, 30)',
    lineWidth: 1,
    marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
    },
    zIndex: 1,
    // data: []
}
