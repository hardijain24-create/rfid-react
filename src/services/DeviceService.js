import ApiClient from '../api/apiClient';

class DeviceService {
  static async pingDevice(deviceId) {
    try {
      // The backend 'GET /devices/config' expects Device-ID in header
      const response = await ApiClient.get('/devices/config', {
        'Device-ID': deviceId
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  static async updateWifi(deviceId, ssid, password) {
    try {
      // Backend route is PUT /devices/{device_id}/config
      const response = await ApiClient.put(`/devices/${deviceId}/config`, {
        wifi_ssid: ssid,
        wifi_password: password,
        is_active: true
      });

      if (response.status === 200) {
        return { success: true };
      }
      
      return { success: false, error: 'Failed to update device config' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update device config' 
      };
    }
  }

  static async registerDevice(deviceData) {
     try {
        // Backend route is POST /devices/
        const response = await ApiClient.post('/devices/', deviceData);
        if (response.status === 201 || response.status === 200) {
            return { success: true };
        }
        return { success: false, error: 'Failed to register device' };
     } catch (error) {
        return {
           success: false,
           error: error.response?.data?.message || 'Failed to register device'
        }
     }
  }
}

export default DeviceService;
