// AuthService.js

const API_URL = 'http://localhost:3500'; // Adjust the URL based on your JSON server setup

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
      const userData = await response.json();

      if (userData.length === 1) {
        // User found, store the role in localStorage
        localStorage.setItem('role', userData[0].role);
        localStorage.setItem('username',userData[0].username);
        localStorage.setItem('name',userData[0].name)
        localStorage.setItem('empId',userData[0].empId);
        return true;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  logout: () => {
    // Clear the authentication token or user data
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('empId');
    localStorage.removeItem('name');
  },

  isAuthenticated: () => {
    // Check if the user is authenticated based on the presence of the role
    return !!localStorage.getItem('role');
  },

  getRole: () => {
    // Retrieve the user's role from storage
    return localStorage.getItem('role');
  },
  getUsername: () => {
    // Retrieve the user's role from storage
    return localStorage.getItem('username');
  },
};

export default AuthService;
