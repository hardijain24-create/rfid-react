import ApiClient from '../api/apiClient';
import { Teacher } from '../models/Teacher';

class TeacherService {
  static async fetchTeachers() {
    try {
      const response = await ApiClient.get('/teachers/');
      
      if (response.status === 200) {
        return response.data.map(item => Teacher.fromJson(item));
      }
      throw new Error('Failed to load teachers');
    } catch (error) {
      throw new Error('Failed to load teachers');
    }
  }

  static async addTeacher(teacherData) {
    try {
      // teacherData expects: email, password, name
      const response = await ApiClient.post('/teachers/register', teacherData);

      if (response.status === 200 || response.status === 201) {
        return { success: true, data: response.data };
      }
      
      return { success: false, error: 'Failed to add teacher' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.response?.data?.message || 'Failed to add teacher' 
      };
    }
  }

  static async deleteTeacher(id) {
    try {
      const response = await ApiClient.delete(`/teachers/${id}`);
      if (response.status === 200) {
        return { success: true };
      }
      return { success: false, error: 'Failed to delete teacher' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete teacher' 
      };
    }
  }
}

export default TeacherService;
