import ApiClient from '../api/apiClient';
import { Attendance } from '../models/Attendance';

class AttendanceService {

  // Currently backend doesn't seem to have a GET route for attendance based on openapi.json.
  // Leaving this as a placeholder, might need adjustment based on actual backend implementation
  static async fetchAttendance() {
    try {
      const response = await ApiClient.get('/attendance');
      
      if (response.status !== 200) {
        throw new Error('Failed to fetch attendance');
      }

      const data = response.data;
      return data.map(item => Attendance.fromJson(item));
    } catch (error) {
      throw new Error('Failed to fetch attendance');
    }
  }

  // Updated to match POST /attendance/attendance/event
  static async recordAttendanceEvent(deviceId, uid, status) {
    try {
      const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp
      
      // Device ID is sent in header as per OpenAPI Spec
      const response = await ApiClient.post('/attendance/attendance/event', {
        uid,
        status,
        device_id: deviceId,
        timestamp
      }, {
         'Device-ID': deviceId
      });

      if (response.status === 200 || response.status === 201) {
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Failed to record attendance' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to record attendance' 
      };
    }
  }
}

export default AttendanceService;
