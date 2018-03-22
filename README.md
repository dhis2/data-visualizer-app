# Data-visualizer-app

This repo contains the as-yet unreleased data-visualizer app.

It was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Developer guide

### Prerequisites

To use the data-visualizer-app in development mode, it is necessary to have a running DHIS2 instance, and be logged in to it. This is because the app requests resources, like react and react-dom, from the DHIS2 core resources. Most developers use their local DHIS2 instance. If you haven't configured your DHIS2_HOME env variable and set up a config.json, then the app will default to using localhost:8080 with the admin user (see
[config/webpack.config.dev.js](config/webpack.config.dev.js#L35)).

### Installation

First clone the repo, then:

```
yarn install
yarn start
```

The webpack-dev-server will start up on localhost:3000, by default.

### Running tests

`yarn test or yarn coverage`

### Other useful things to know

#### eslint/prettier

The data-visualizer-app uses **eslint** for code correctness checking, and **prettier** for formatting, and the build will fail if any of the checks fail. To make life easier, we suggest that you add the eslint and prettier plugins to your editor. But if you prefer, you can run the following before pushing your code:

```
yarn lint
yarn prettify
```

#### d2/d2-ui

The data-visualizer-app uses the d2 library for communicating with the DHIS2 api. And when relevant, we use d2-ui components, rather than using material-ui directly. Make sure to upgrade these dependencies regularly, and contribute to them.
