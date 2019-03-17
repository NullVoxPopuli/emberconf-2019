'use strict';

const domain = 'nullvoxpopuli-emberconf-2019-demo.auth0.com';
const clientId = 'FLmP8UOGI2gyfjgVIayIWc6jB0pLN5AP';
const callbackUrl = 'localhost:4200/auth';

module.exports = function(environment) {
  let ENV = {
    'ember-resolver': {
      features: {
        EMBER_RESOLVER_MODULE_UNIFICATION: true
      }
    },
    modulePrefix: 'component-comparison--ember--octane',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
        EMBER_MODULE_UNIFICATION: true,
        EMBER_NATIVE_DECORATOR_SUPPORT: true,
        EMBER_METAL_TRACKED_PROPERTIES: true,
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-cli-notifications': {
      includeFontAwesome: true
    },
    'ember-simple-auth': {
      authenticationRoute: 'auth-with-esa/login',
      auth0: {
        clientID: clientId,
        domain: domain,
        logoutReturnToURL: '/auth-with-esa',
        enableImpersonation: false
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {

  }

  return ENV;
};
