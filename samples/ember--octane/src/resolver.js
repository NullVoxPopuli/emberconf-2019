import Resolver from 'ember-resolver/resolvers/fallback';
import buildResolverConfig from 'ember-resolver/ember-config';
import config from '../config/environment';

let moduleConfig = buildResolverConfig(config.modulePrefix);
/*
 * If your application has custom types and collections, modify moduleConfig here
 * to add support for them.
 */


 moduleConfig.types = Object.assign(moduleConfig.types, {
  'session': { definitiveCollection: 'session' },
  'session-store': { definitiveCollection: 'session-store' },
  'authenticator': { definitiveCollection: 'authenticator' },

 });

 moduleConfig.collections = Object.assign(moduleConfig.collections, {
  authenticators: {
    types: ['authenticator'],
    defaultType: 'authenticator'
  }
});

export default Resolver.extend({
  config: moduleConfig
});
