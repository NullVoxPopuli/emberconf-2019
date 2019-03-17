import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthProtectedRoute extends Route {
  @service auth0;
  @service toast;

  beforeModel() {
    if (!this.auth0.isAuthenticated) {
      this.toast.error('not authenticated');
      this.transitionTo('auth');
    }
  }
}
