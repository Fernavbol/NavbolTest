module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['step-definitions/hooks.ts', 'step-definitions/**/*.ts'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' }
  }
};
