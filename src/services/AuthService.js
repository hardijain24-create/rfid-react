import ApiClient from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  static async login(email, password) {
    try {
      const response = await ApiClient.post('/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        
        return { success: true, user };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  }

  static async logout() {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  }

  static async getUserData() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  static async getToken() {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      return null;
    }
  }

  static async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  }
}

export default AuthService;
