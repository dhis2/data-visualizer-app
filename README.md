# Data visualizer app and plugin

This is a yarn workspaces mono-repo that contains the data-visualizer-app. Eventually it will also contain the analytics plugins.

## Getting started

To run data-visualizer-app from the repo root directory, install the dependencies for all packages
and link all the packages in the repo, then make sure the plugin is built:

```
$ yarn install
$ yarn build
```

### Development

To build the plugin and start the app on `localhost:3000`, run `yarn start` from the repo root directory.

The following npm scripts can all be run from the repo root directory and will execute on all packages

#### Unit tests

```
$ yarn test
```

Run unit tests with coverage report

```
$ yarn coverage
```

#### Browser tests

We use Cypress for our browser tests.

Before running cypress, start the development server in another terminal session.
Ensure that you specify the correct DHIS2_BASE_URL.

```sh
> DHIS2_BASE_URL=http://localhost:8080 yarn start
```

There are plans to make this configurable. In order to run the tests, you need to define three environment variables:

```
CYPRESS_LOGIN_URL=http://localhost:8080 # This must match DHIS2_BASE_URL
CYPRESS_DHIS2_USERNAME=myusername
CYPRESS_DHIS2_PASSWORD=mypassword
```

Run tests interactively:

```
cd packages/app && yarn cy:e2e:open
```

Run tests in ci mode:

```
cd packages/app && yarn cy:e2e:run
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

### Build all packages

```
$ yarn build
```

#### Manual testing with Netlify

This repo is configured to deploy all branches to netlify. This makes it simple to share a running implementation with others (e.g., tester, product manager, ux, fellow developers) prior
to merging to master.

All netlfiy deployments run against play.dhis2.org/dev, so in order to use them, you must configure CORS for your particular branch:

1. Copy the URL of the deployment you want to enable, i.e. `https://dhis2-data-visualizer.netlify.com`
2. Visit the [system settings -- access](https://play.dhis2.org/dev/dhis-web-settings/index.html#/access) page on the DHIS2 instance you want to test against (i.e. `https://debug.dhis2.org/dev`)
3. Add the copied URL on a new line the in CORS Whitelist textbox **NOTE**: do **NOT** include a trailing slash
4. Back on [netlify](`https://dhis2-data-visualizer.netlify.com`), enter the DHIS2 instance URL in the Server input of the login dialog

The master branch is always available at:

`https://dhis2-data-visualizer.netlify.com`

Branches are available at (replace `/` and other special characters in `{branchname}` with `-`):

`https://{branchname}--dhis2-data-visualizer.netlify.com`

Pull requests (I.E. #209) are available at:

`https://deploy-preview-209--dhis2-data-visualizer.netlify.com`

Netlify will also add a status check to each PR which links directly to the PR deployment.
