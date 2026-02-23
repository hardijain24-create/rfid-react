import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

class ApiClient {
  static async get(endpoint, headers = {}) {
    try {
      const response = await axios.get(`${API_CONFIG.baseUrl}${endpoint}`, {
        headers,
        timeout: API_CONFIG.timeout,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async post(endpoint, body = {}, headers = {}) {
    try {
      const response = await axios.post(`${API_CONFIG.baseUrl}${endpoint}`, body, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        timeout: API_CONFIG.timeout,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async patch(endpoint, body = {}, headers = {}) {
    try {
      const response = await axios.patch(`${API_CONFIG.baseUrl}${endpoint}`, body, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        timeout: API_CONFIG.timeout,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiClient;
