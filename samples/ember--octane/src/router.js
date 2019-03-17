import EmberRouter from "@ember/routing/router";
import config from "../config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('component-demo');
  this.route('concurrency-demo');
  this.route('todo-mvc');
  this.route('auth', function() {
    this.route('protected');
  });
  this.route('auth-with-esa');
});

export default Router;
