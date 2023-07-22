<p align="center">
    <a href="https://webdriver.io/">
        <img alt="WebdriverIO loves Nuxt" width="60%" src="https://raw.githubusercontent.com/webdriverio-community/wdio-vite-service/main/.github/assets/banner.png">
    </a>
</p>

# WDIO Vite Service [![Tests](https://github.com/webdriverio-community/wdio-vite-service/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/webdriverio-community/wdio-vite-service/actions/workflows/test.yml)

This service helps you to launch your application when using [Vite](https://vitejs.dev/) as build tool. It automatically starts the Vite server using your `vite.conf.js` before launching the test.

## Installation

If you are getting started with WebdriverIO you can use the configuration wizard to set everything up:

```sh
npm init wdio@latest .
```

It will install all necessary plugins for you. If you are adding this service on an existing setup, you can always install it via:

```bash
npm install wdio-vite-service --save-dev
```

## Configuration

To enable the service, just add it to your `services` list in your `wdio.conf.js` file, e.g.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['vite'],
    // ...
};
```

You can apply service option by passing in an array with a config object, e.g.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['vite', {
            configFile: './custom.vite.conf.js'
        }]
    ],
    // ...
};
```

## Usage

If your config is set up accordingly, the service will set the [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) option to point to your application. You can navigate to it via the [`url`](https://webdriver.io/docs/api/browser/url) command, e.g.:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Vite + Lit + TS')
await expect($('aria/Vite + Lit')).toBePresent()
```

## Options

### `configFile`

Path to config file.

Type: `string`<br />
Default: _vite.conf.ts_

### `configRoot`

Root directory of the project.

Type: `string`<br />
Default: `process.cwd()`

### `mode`

Define the mode used to start the server. See also Vite [Modes](https://vitejs.dev/guide/env-and-mode.html#modes).

Type: `string`<br />
Default: `development`

### `logLevel`

Adjust console output verbosity.

Type: `'info' | 'warn' | 'error' | 'silent'`<br />
Default: `'info'`

----

For more information on WebdriverIO see the [homepage](https://webdriver.io).
