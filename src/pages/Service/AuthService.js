import axios from 'axios';
const BASE_URL=localStorage.getItem('BASE_URL')
 
class AuthService {
  static async signIn(email, password) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
      const { token, empId,role} = response.data;
      console.log(response.data);
      localStorage.setItem('email',email);
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
        localStorage.removeItem('email');
        localStorage.removeItem('totalPoints');
        localStorage.removeItem('empName');
        
      }
 
 
}
 
export default AuthService;