// // AuthService.js

// const API_URL = 'http://localhost:3500'; // Adjust the URL based on your JSON server setup

// const AuthService = {
//   login: async (username, password) => {
//     try {
//       const response = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
//       const userData = await response.json();

//       if (userData.length === 1) {
//         // User found, store the role in localStorage
//         localStorage.setItem('role', userData[0].role);
//         localStorage.setItem('username',userData[0].username);
//         localStorage.setItem('name',userData[0].name)
//         localStorage.setItem('empId',userData[0].empId);
//         return true;
//       } else {
//         throw new Error('Login failed');
//       }
//     } catch (error) {
//       throw new Error('Login failed');
//     }
//   },

//   logout: () => {
//     // Clear the authentication token or user data
//     localStorage.removeItem('role');
//     localStorage.removeItem('username');
//     localStorage.removeItem('empId');
//     localStorage.removeItem('name');
//   },

//   isAuthenticated: () => {
//     // Check if the user is authenticated based on the presence of the role
//     return !!localStorage.getItem('role');
//   },

//   getRole: () => {
//     // Retrieve the user's role from storage
//     return localStorage.getItem('role');
//   },
//   getUsername: () => {
//     // Retrieve the user's role from storage
//     return localStorage.getItem('username');
//   },
// };

// export default AuthService;



import axios from 'axios';
import Cookies from 'js-cookie';
 
class AuthService {
  static async signIn(email, password) {
    try {
      const response = await axios.post('https://rewardsystembackend.onrender.com/auth/signin', { email, password });
      const { token, empId,role} = response.data;
      console.log(response.data);
 
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('empId', empId);
      localStorage.setItem('role', role[0].authority);
      console.log(role[0].authority);
    } catch (error) {
      console.error('Error during authentication:', error);
      throw new Error('Authentication failed');
    }
  }
 
  static getRole() {
    return localStorage.getItem('role');
  }
  static logout() {
        // Clear the authentication token or user data
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('empId');
        localStorage.removeItem('name');
        Cookies.remove('token');
        Cookies.remove('empId');
        Cookies.remove('role');
        Cookies.remove('name');
      }
 
 
}
 
export default AuthService;