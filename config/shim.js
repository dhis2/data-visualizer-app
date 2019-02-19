import 'babel-polyfill';

global.requestAnimationFrame = callback => {
    setTimeout(callback, 0);
};

// needed for headerbar beta
global.DHIS_CONFIG = { baseUrl: 'http://localhost:8080' };
global.manifest = {};
