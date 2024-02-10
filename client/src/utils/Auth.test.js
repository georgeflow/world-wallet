import Auth from './Auth';
import apiService from '../ApiService';

jest.mock('../ApiService', () => ({
  profile: jest.fn(),
}));

describe('Auth Class Tests', () => {
  it('sets authenticated to true on login', () => {
    const callback = jest.fn();
    Auth.login(callback);

    expect(Auth.authenticated).toBe(true);
    expect(callback).toHaveBeenCalled();
  });

  it('sets authenticated to false on logout', () => {
    const callback = jest.fn();
    Auth.logout(callback);

    expect(Auth.authenticated).toBe(false);
    expect(callback).toHaveBeenCalled();
  });

  it('checks authentication status and returns user data', async () => {
    const mockProfile = { id: 1, name: 'John Doe' };
    apiService.profile.mockResolvedValue(mockProfile);

    const userData = await Auth.isAuthenticated();

    expect(Auth.authenticated).toBe(true);
    expect(userData).toEqual(mockProfile);
  });
});
