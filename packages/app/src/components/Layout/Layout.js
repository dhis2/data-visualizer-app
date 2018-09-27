import React from 'react';
import DefaultLayout from './DefaultLayout/DefaultLayout';

const types = {
    default: DefaultLayout,
};

const getLayoutByType = (type, props) => {
    const Layout = types[type];
    return <Layout {...props} />;
};

const Layout = ({ type = 'default' }) => getLayoutByType(type);

export default Layout;
