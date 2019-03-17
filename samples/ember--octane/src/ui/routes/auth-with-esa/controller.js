import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

const lockOptions = {
  allowedConnections: ['email'],
  passwordlessMethod: 'link',
  authParams: {
    scope: 'openid user_metadata'
  }
};

export default class AuthWithEsaController extends Controller {
  @service session;

  @action login() {
    this.session.authenticate(
      'authenticator:auth0-lock-passwordless',
      lockOptions
    );
  }

  @action logout() {
    this.session.invalidate();
  }
}
