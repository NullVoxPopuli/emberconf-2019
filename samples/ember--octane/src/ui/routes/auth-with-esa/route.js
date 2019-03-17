import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthWithEsaRoute extends Route {
  @service session;
  @service toast;

  beforeModel() {
    if (this.session.isAuthenticated) {
      this.toast.success('You are logged in!');
    }
  }
}
