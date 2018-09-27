import React from 'react';
import DefaultLayout from './DefaultLayout/DefaultLayout';

const types = {
    default: <DefaultLayout />,
};

const Layout = ({ type = 'default' }) => types[type];

export default Layout;
