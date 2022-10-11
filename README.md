# Data visualizer app and plugin

[![Build Status](https://travis-ci.org/dhis2/data-visualizer-app.svg)](https://travis-ci.org/dhis2/data-visualizer-app)
[![Test Coverage](https://codeclimate.com/github/dhis2/data-visualizer-app/badges/coverage.svg)](https://codeclimate.com/github/dhis2/data-visualizer-app/coverage)
[![Code Climate](https://codeclimate.com/github/dhis2/data-visualizer-app/badges/gpa.svg)](https://codeclimate.com/github/dhis2/data-visualizer-app)

This is a repo that contains the data-visualizer-app and its plugin used both internally and built as a separate entrypoint so it can be used in other apps (dashboard app).

## Getting started

To run data-visualizer-app from the repo root directory, install the dependencies:

```
$ yarn install
```

### Development

Run `yarn start` from the repo's root to start the app on `localhost:3000` and the plugin on `localhost:3001`.

The plugin running on a different port allows for testing it in other apps.
For example, for testing it in dashboard app, run the dashboard app in a different port and via devtools override the plugin path with the host and port where the plugin is running.
Add this entry to the dashboard app localStorage:
`dashboard-app-plugin-overrides: { "VISUALIZATION": "http://localhost:3001" }`

The following npm scripts can all be run from the repo root directory

#### Unit tests

```
$ yarn test
```

Run unit tests with coverage report

```
$ yarn coverage
```

#### e2e tests

Cypress is used for e2e browser tests. This automatically runs on CI for PRs, the result can be seen on the [Cypress dashboard](https://dashboard.cypress.io/projects/sojh88/). To run the tests locally, define the following in a local `cypress.env.json` file, e.g.:

```sh
{
    "dhis2_base_url": "localhost:8080",
    "dhis2_username": "admin",
    "dhis2_password": "district",
}
```

Run tests interactively (Cypress UI):

```
yarn cypress:live
```

#### Linting and Formatting

Automatically fix all fixable code-style violations (prettier and eslint)

```
$ yarn format
```

Check all files for code-style violations (prettier and eslint)

```
$ yarn lint
```

### Build app and plugin

```
$ yarn build
```

#### Manual testing with Netlify

This repo is configured to deploy all branches to netlify. This makes it simple to share a running implementation with others (e.g., tester, product manager, ux, fellow developers) prior
to merging to master.

All netlfiy deployments run against play.dhis2.org/dev, so in order to use them, you must configure CORS for your particular branch:

1. Copy the URL of the deployment you want to enable, i.e. `https://dhis2-data-visualizer.netlify.com`
2. Visit the [system settings -- access](https://play.dhis2.org/dev/dhis-web-settings/index.html#/access) page on the DHIS2 instance you want to test against (i.e. `https://debug.dhis2.org/dev`)
3. Add the copied URL on a new line the in CORS Whitelist textbox **NOTE**: do NOT include a trailing slash
4. Back on [netlify](`https://dhis2-data-visualizer.netlify.com`), enter the DHIS2 instance URL in the Server input of the login dialog

The master branch is always available at:

`https://dhis2-data-visualizer.netlify.com`

Branches are available at (replace `/` and other special characters in `{branchname}` with `-`):

`https://{branchname}--dhis2-data-visualizer.netlify.com`

Pull requests (I.E. #209) are available at:

`https://deploy-preview-209--dhis2-data-visualizer.netlify.com`

Netlify will also add a status check to each PR which links directly to the PR deployment.
