import ApiClient from '../api/apiClient';
import { Student } from '../models/Student';

class StudentService {
  static async fetchStudents() {
    try {
      const response = await ApiClient.get('/students');
      
      if (response.status !== 200) {
        throw new Error('Failed to load students');
      }

      const data = response.data;
      return data.map(item => Student.fromJson(item));
    } catch (error) {
      throw new Error('Failed to load students');
    }
  }

  static async addStudent(name) {
    try {
      const response = await ApiClient.post('/students', {
        name,
      });

      if (response.status === 201 || response.status === 200) {
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Failed to add student' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add student' 
      };
    }
  }

  static async deleteStudent(id) {
    try {
      const response = await ApiClient.delete(`/students/${id}`);
      
      if (response.status === 200) {
        return { success: true };
      }
      
      return { success: false, error: 'Failed to delete student' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete student' 
      };
    }
  }

  static async assignRfid(studentId, uid) {
    try {
      const response = await ApiClient.patch(`/students/${studentId}/rfid`, {
        uid,
      });

      if (response.status === 200) {
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Failed to assign RFID' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to assign RFID' 
      };
    }
  }
}

export default StudentService;
