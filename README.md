# EMPOWERWEALTH Test TASK - CUSTOM PERSISTANCE COOKIE

## Solved problem in this application

Without storing the value of the secret in a cookie, design and implement (i.e. code) a client-side solution which facilitates the storage of a secret value which can persist and be read between different tabs within the same web browser session, but also ensures that the value of the secret cannot be retrieved if the browser is closed and reopened.

## Important Note \*

As there is no way to check if browser is restarted, assumed that the browser is closed if all tabs (that has the current host).
i.e: Assume browser is closed if browser is opened but only empty tabs are there.

## Installation

- Install node.js and npm (https://nodejs.dev/en/learn/how-to-install-nodejs/)
- Install yarn by running (optional) `npm install -g yarn`
- Go to the project root and install dependencies `yarn` or `npm install`

## Available Scripts

- `yarn start`

  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test`

  Launches the test runner in the interactive watch mode.

- `yarn build`

  Builds the app for production to the `build` folder.\
