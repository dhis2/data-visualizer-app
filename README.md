# Data visualizer app and plugin

[![Test Coverage](https://codeclimate.com/github/dhis2/data-visualizer-app/badges/coverage.svg)](https://codeclimate.com/github/dhis2/data-visualizer-app/coverage)
[![Code Climate](https://codeclimate.com/github/dhis2/data-visualizer-app/badges/gpa.svg)](https://codeclimate.com/github/dhis2/data-visualizer-app)

This is a repo that contains the data-visualizer-app and its plugin used both internally and built as a separate entrypoint so it can be used in other apps such as the dashboard app

## Getting started

To run data-visualizer-app from the repo root directory, install the dependencies:

```
$ yarn install
```

### Development

Run `yarn start` from the repo's root to start the app on `localhost:3000` and the plugin on `localhost:3001`.

Running the plugin on a different port allows for testing it in other apps.
For example, for testing it in dashboard app, run the dashboard app in a different port and via devtools override the plugin path with the host and port where the plugin is running.
Example steps:
1. in DV: `yarn start`
2. in dashboard: `yarn start`
At this point DV is running on localhost:3000, DV plugin on localhost:3001 and dashboard app on localhost:3002.
3. Point the browser to localhost:3002.
4. Add this entry to the dashboard app localStorage via devtools in the Application tab:
`dhis2.dashboard.pluginOverrides: { "VISUALIZATION": "http://localhost:3001" }`

With the same principle is possible to test several plugins at the same time, you just need to make sure the port configured in the override is the right one for the plugin you are overriding.

The following npm scripts can all be run from the repo root directory:

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
    "dhis2BaseUrl": "https://test.e2e.dhis2.org/dev",
    "dhis2Username": "admin",
    "dhis2Password": "district",
}
```

Run tests interactively (Cypress UI):

```
yarn cypress:live
```

Run tests in the console without Cypress UI:

```
yarn cypress:run
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

This repo is configured to deploy pull requests to netlify. This makes it simple to share a running implementation with others (e.g., tester, product manager, ux, fellow developers) prior
to merging to master.

Pull requests (I.E. #209) are available at:

`https://pr-209--dhis2-data-visualizer.netlify.app`

Netlify will also add a status check to each PR which links directly to the PR deployment.
