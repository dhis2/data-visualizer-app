# data-visualizer-app

[![Build Status](https://travis-ci.org/dhis2/data-visualizer-app.svg)](https://travis-ci.org/dhis2/data-visualizer-app)
[![Test Coverage](https://codeclimate.com/github/dhis2/data-visualizer-app/badges/coverage.svg)](https://codeclimate.com/github/dhis2/data-visualizer-app/coverage)
[![Code Climate](https://codeclimate.com/github/dhis2/data-visualizer-app/badges/gpa.svg)](https://codeclimate.com/github/dhis2/data-visualizer-app)

This package contains the as-yet unreleased data-visualizer-app

It was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and later ejected.

## Developer guide

### Prerequisites

To use the data-visualizer-app in development mode, it is necessary to have a running DHIS2 instance, and be logged in to it. This is because the app requests resources, like react and react-dom, from the DHIS2 core resources. Most developers use their local DHIS2 instance. If you haven't configured your DHIS2_HOME env variable and set up a config.json, then the app will default to using localhost:8080 with the admin user (see
[config/webpack.config.dev.js](config/webpack.config.dev.js#L35)).

### Starting the app in dev mode

Prior to starting the app, be sure to follow the startup instructions in the [root README.md](../../README.md#Getting started) file. After you have completed those steps then:

```
$ yarn start
```

The webpack-dev-server will start up on localhost:3000, by default.

### Available scripts

```
$ yarn lint // lint files
$ yarn watch // run tests in watch mode
$ yarn coverage // run tests and output coverage report
$ yarn prettier-ci // run prettier and list non-compliant files
$ yarn prettier-write // run prettier and fix
```

### Create a build of the app

```
$ yarn build
```
