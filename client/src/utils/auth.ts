import apiService from '../ApiService';

class Auth {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(cb: () => void): void {
    this.authenticated = true;
    cb();
  }

  logout(cb: () => void): void {
    this.authenticated = false;
    cb();
  }

  async isAuthenticated(): Promise<any> {
    const me = await apiService.profile();
    this.authenticated = true;
    return me;
  }
}

export default new Auth();
