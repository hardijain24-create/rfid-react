import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiClient {
  static async getAuthHeaders(customHeaders = {}) {
    const headers = { ...customHeaders };
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {}
    return headers;
  }

  static async get(endpoint, headers = {}) {
    try {
      const authHeaders = await this.getAuthHeaders(headers);
      const response = await axios.get(`${API_CONFIG.baseUrl}${endpoint}`, {
        headers: authHeaders,
        timeout: API_CONFIG.timeout,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async post(endpoint, body = {}, headers = {}) {
    try {
      const authHeaders = await this.getAuthHeaders({
        'Content-Type': 'application/json',
        ...headers,
      });
      const response = await axios.post(`${API_CONFIG.baseUrl}${endpoint}`, body, {
        headers: authHeaders,
        timeout: API_CONFIG.timeout,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async patch(endpoint, body = {}, headers = {}) {
    try {
      const authHeaders = await this.getAuthHeaders({
        'Content-Type': 'application/json',
        ...headers,
      });
      const response = await axios.patch(`${API_CONFIG.baseUrl}${endpoint}`, body, {
        headers: authHeaders,
        timeout: API_CONFIG.timeout,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async delete(endpoint, headers = {}) {
    try {
      const authHeaders = await this.getAuthHeaders(headers);
      const response = await axios.delete(`${API_CONFIG.baseUrl}${endpoint}`, {
        headers: authHeaders,
        timeout: API_CONFIG.timeout,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiClient;
