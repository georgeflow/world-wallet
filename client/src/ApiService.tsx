const BASE_URL = 'http://localhost:8080';

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: User | null; // Consider replacing 'any' with a more specific type if possible
}

const apiService = {
  register: async (user: User): Promise<ApiResponse> => {
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false, message: 'An error occurred', data: null };
    }
  },

  login: async (user: User): Promise<ApiResponse> => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false, message: 'An error occurred', data: null };
    }
  },

  profile: async (): Promise<ApiResponse> => {
    try {
      const res = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        return await res.json();
      } else {
        return { success: false, message: 'not authenticated', data: null };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: 'An error occurred', data: null };
    }
  },

  logout: async (): Promise<ApiResponse> => {
    try {
      const res = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false, message: 'An error occurred', data: null };
    }
  },
};

export default apiService;

