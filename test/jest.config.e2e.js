const unitConfig = require('../jest.config');

/** @type {import('jest').Config} */
const e2eConfig = {
  ...unitConfig,
  rootDir: '.',
  testRegex: '.e2e-spec.ts$',
};

module.exports = e2eConfig;
