# node-musickit-api
A wrapper for the Apple Music API written in NodeJS

⚠️ This package is no longer being maintained as I no longer have access to a paid Apple Dev account ⚠️

## Installation
```bash
npm install node-musickit-api
# or
yarn add node-musickit-api
# or
bun add node-musickit-api
```

## Documentation
The documentation is viewable on [musickit.js.org](https://musickit.js.org/#/).

## Issues

As I am now for the foreseeable future cancelling any work on this package (because of no paid Apple Dev account) I will leave a list of issues with this package.

- [ ] The code quality is overall quite bad
- [ ] It isn't written in TypeScript nor have TS types
- [ ] The code should be built with promises in mind, not have them lazily patched on with a subpath (`node-musickit-api/promises`)
- [ ] Personalised routes should not be lazily patched on with a subpath (`node-musickit-api/personalized`)
- [ ] Personalized routes require a hacky workaround by authorizing with MusicKit.js (the official web lib by Apple), then grabbing the token and saving it as a file. Ideally the package should be able to handle auth.
- [ ] There isn't a way to check if you are logged in without performing a query first (see: https://github.com/Exerra/node-musickit-api/issues/10)
