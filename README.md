# Data visualizer app and plugin

This is a lerna repo that contains the data-visualizer-app. Eventually it will also contain the analytics plugins.

## Getting started

To run data-visualizer-app from the repo root directory, install the dependencies for all packages
and link all the packages in the repo, then make sure the plugin is built:

```
$ yarn install
$ yarn build
```

### Development

The data-visualizer-app package is the only "app" in the repo. You can start it in 2 different ways:

From the repo root directory:

```
$ yarn start-app
```

Or from the package directory (packages/app):

```
$ cd packages/app
$ yarn start
```

The following npm scripts can all be run from the repo root directory and will execute on all packages

#### Lint

```
$ yarn lint
```

#### Unit tests

```
$ yarn test
```

Run unit tests with coverage report

```
$ yarn coverage
```

#### Browser tests

We use Cypress for our browser tests. Currently the tests can only run against the dhis2 server localhost:8080.
There are plans to make this configurable. In order to run the tests, you need to define two environment variables:

```
CYPRESS_DHIS2_USERNAME=myusername
CYPRESS_DHIS2_PASSWORD=mypassword
```

Run tests interactively:

```
yarn cy:e2e:open
```

Run tests in ci mode:

```
yarn cy:e2e:run
```

#### Prettier and write changes

```
$ yarn prettier-write
```

Run prettier and just report failing files (useful for ci)

```
$ yarn prettier-ci
```

### Build the all packages

```
$ yarn build
```

#### Manual testing with Netlify

This repo is configured to deploy all branches to netlify. This makes it simple to share a running implementation with others (e.g., tester, product manager, ux, fellow developers) prior
to merging to master.

All netlfiy deployments run against play.dhis2.org/dev, so in order to use them, you must configure CORS for your particular branch:

1. Copy the URL of the deployment you want to enable, i.e. `https://dhis2-data-visualizer.netlify.com`
2. Visit the play/dev [system settings -- access](https://play.dhis2.org/dev/dhis-web-settings/index.html#/access) page
3. Add the copied URL on a new line the in CORS Whitelist textbox **NOTE**: do NOT include a trailing slash

The master branch is always available at:

`https://dhis2-data-visualizer.netlify.com`

Branches are available at (replace `/` and other special characters in `{branchname}` with `-`):

`https://{branchname}--dhis2-data-visualizer.netlify.com`

Pull requests (I.E. #209) are available at:

`https://deploy-preview-209--dhis2-data-visualizer.netlify.com`

Netlify will also add a status check to each PR which links directly to the PR deployment.
