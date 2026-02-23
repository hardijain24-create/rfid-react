import ApiClient from '../api/apiClient';
import { Attendance } from '../models/Attendance';

class AttendanceService {
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

  static async markAttendance(studentId, status) {
    try {
      const response = await ApiClient.post('/attendance', {
        studentId,
        status,
      });

      if (response.status === 201) {
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Failed to mark attendance' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to mark attendance' 
      };
    }
  }
}

export default AttendanceService;
