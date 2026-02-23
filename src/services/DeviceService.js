import ApiClient from '../api/apiClient';

class DeviceService {
  static async pingDevice(deviceId) {
    try {
      const response = await ApiClient.get(`/devices/ping/${deviceId}`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  static async updateWifi(deviceId, ssid, password) {
    try {
      const response = await ApiClient.post(`/devices/${deviceId}/wifi`, {
        wifi_ssid: ssid,
        wifi_password: password,
      });

      if (response.status === 200) {
        return { success: true };
      }
      
      return { success: false, error: 'Failed to update Wi-Fi' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update Wi-Fi' 
      };
    }
  }
}

export default DeviceService;
