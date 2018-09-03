# Data visualizer app and plugin

This is a lerna repo that contains the data-visualizer-app. Eventually it will also contain the analytics plugins.

## Getting started

To run data-visualizer-app from the repo root directory, install the dependencies for all packages
and link all the packages in the repo:

```
$ yarn install
$ yarn bootstrap
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

Lint:

```
$ yarn lint
```

Run tests:

```
$ yarn test
```

Run tests with coverage report

```
$ yarn coverage
```

Run prettier and write changes:

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
