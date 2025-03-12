const config = {
    type: 'app',
    name: 'data-visualizer',
    id: '6f656971-c392-42d8-8363-eb37d9287f3d',
    title: 'Data Visualizer',
    coreApp: true,

    minDHIS2Version: '2.40',

    pluginType: 'DASHBOARD',

    direction: 'auto',

    pwa: {
        enabled: true,
        caching: {
            patternsToOmitFromAppShell: [/.*/],
        },
    },

    entryPoints: {
        app: './src/AppWrapper.jsx',
        plugin: './src/PluginWrapper.jsx',
    },
}

module.exports = config
