# Reusable React Components

Check out the `packages` directory for the list of reusable React components.

## Publishing an NPM package via Lerna

### Bootstrap packages

    npm run bootstrap

### Testing

Before publishing ensure all tests pass.

    npm test

### Publishing a new package

In order to publish a new NPM package we need to set a public access during the first publishing.

    npm run publish --access public

### Publishing an existing package

    npm run publish
