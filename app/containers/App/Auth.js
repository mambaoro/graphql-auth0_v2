import auth0 from 'auth0-js';
import history from './history';

class Auth {
  accessToken;

  idToken;

  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,
    audience: process.env.AUDIENCE,
    responseType: process.env.RESPONSE_TYPE,
    scope: process.env.SCOPE,
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    localStorage.setItem('isLoggedIn', 'true');
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    history.replace('/');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
      }
    });
  }

  logout() {
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    localStorage.removeItem('isLoggedIn');
    this.auth0.logout({
      returnTo: process.env.RETURN_TO,
      clientId: process.env.CLIENT_ID,
    });
  }

  isAuthenticated() {
    // eslint-disable-next-line prefer-destructuring
    const expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  login() {
    this.auth0.authorize();
  }
}

export default new Auth();
