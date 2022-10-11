const config = {
    type: 'app',
    name: 'data-visualizer',
    title: 'Data Visualizer',
    coreApp: true,

    entryPoints: {
        app: './src/AppWrapper.js',
        plugin: './src/PluginWrapper.js',
    },
}

module.exports = config
