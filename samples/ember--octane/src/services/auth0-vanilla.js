import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import auth0 from 'auth0-js';

const domain = 'nullvoxpopuli-emberconf-2019-demo.auth0.com';
const clientId = 'FLmP8UOGI2gyfjgVIayIWc6jB0pLN5AP';
const callbackUrl = 'localhost:4200/auth';

export default class Auth0Service extends Service {
  @tracked auth0;
  @tracked user;
  @tracked isAuthenticated = false;

  constructor(...args) {
    super(...args);

    this.auth0 = new auth0.WebAuth({
      domain, // domain from auth0
      clientID: clientId, // clientId from auth0
      redirectUri: callbackUrl,
      audience: `https://${domain}/userinfo`,
      responseType: 'token',
      scope: 'openid profile'
    });
  }

  @action login() {
    this.auth0.authorize();
  }

  @action logout() {
    this.isAuthenticated = false;

    this.auth0.logout({
      clientID: clientId,
      returnTo: 'http://localhost:4200/auth'
    });
  }


  /* private methods */

  handleAuthentication() {
    return new Promise((resolve) => {
      this.get('auth0').parseHash((err, authResult) => {
        if (err) return false;

        if (authResult && authResult.accessToken) {
          this.setUser(authResult.accessToken);
        }

        this.isAuthenticated = true;
        return resolve();
      });
    });
  }

  setUser(token) {
    this.auth0.client.userInfo(token, (err, profile) => {
      this.user = profile
    });
  }

  checkLogin() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (err) return err;
      this.setUser(authResult.accessToken);
    });
  }
}
