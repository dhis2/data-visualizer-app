# data-visualizer-app

[![Build Status](https://travis-ci.org/dhis2/data-visualizer-app.svg)](https://travis-ci.org/dhis2/data-visualizer-app)
[![Test Coverage](https://codeclimate.com/github/dhis2/data-visualizer-app/badges/coverage.svg)](https://codeclimate.com/github/dhis2/data-visualizer-app/coverage)
[![Code Climate](https://codeclimate.com/github/dhis2/data-visualizer-app/badges/gpa.svg)](https://codeclimate.com/github/dhis2/data-visualizer-app)

This package contains the data-visualizer-app

## Developer guide

**THIS IS A WORK-IN-PROGRESS PORT TO THE APPLICATION PLATFORM**
See [the platform documentation](https://platform.dhis2.nu)

## Cypress

There are three required environment variables to run Cypress. Additionally, the application must be running in a separate process on `localhost:3000`:

```sh
# In one terminal
> DHIS2_BASE_URL=https://debug.dhis2.org/dev yarn start

# In another terminal
> CYPRESS_LOGIN_URL=https://debug.dhis2.org/dev CYPRESS_DHIS2_USERNAME=admin CYPRESS_DHIS2_PASSWORD=district yarn cy:e2e:open
```
