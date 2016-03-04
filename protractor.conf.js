'use strict';

exports.config = {
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:' + (process.env.PORT || '8080'),

  // If true, only chromedriver will be started, not a standalone selenium.
  // Tests for browsers other than chrome will not run.
  chromeOnly: true,

  // list of files / patterns to load in the browser
  specs: [
    'app.spec.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      binary: '/Applications/Google/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary',
      args: [],
      extensions: [],
      }
  },

  framework: 'jasmine',
};
